import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * POST /api/contact — single-message contact endpoint.
 *
 * Secrets (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM) are read ONLY here on
 * the server. Nothing under NEXT_PUBLIC_ — the client bundle never sees them.
 *
 * Env sources: `process.env` covers local dev (`.env.local`) and Node
 * runtimes; on Cloudflare Workers, secrets/vars live on the Worker's `env`
 * object, exposed via `getCloudflareContext().env` — so both are checked.
 * RESEND_API_KEY must be a Worker **Secret** (encrypted); CONTACT_TO/FROM
 * are plain `vars` committed in wrangler.json.
 *
 * Enforcement layers (per visitor = one successful send):
 *  1. HttpOnly `contact_sent` cookie — set on success, rejected on repeat.
 *  2. Per sender-address once-only (normalized lowercase).
 *  3. Per-IP sliding window (5 attempts / 10 min).
 *  4. Global safety valve (~20 sends / hour per isolate).
 *
 * NOTE: maps live in module scope, i.e. per Worker isolate. That stops
 * normal abuse cold; a distributed attacker rotating IPs + clearing cookies
 * would need Cloudflare KV / Workers Rate Limit API (see wrangler.json) for
 * a cross-isolate gate. Accepted tradeoff for portfolio volume.
 */

const SENT_COOKIE = "contact_sent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10; // ~10 years: one message, ever

const IP_WINDOW_MS = 10 * 60 * 1000;
const IP_MAX_ATTEMPTS = 5;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;
const GLOBAL_MAX_SENDS = 20;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-isolate stores (see note above).
const attemptsByIp = new Map<string, number[]>();
const sentAddresses = new Set<string>();
let globalSendAt: number[] = [];

function getIp(req: NextRequest): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function prune(list: number[], windowMs: number, now: number): number[] {
  const cutoff = now - windowMs;
  while (list.length > 0 && (list[0] ?? Infinity) <= cutoff) list.shift();
  return list;
}

function limitResponse(message: string, retryAfterSec?: number) {
  const res = NextResponse.json({ ok: false, error: message }, { status: 429 });
  if (retryAfterSec != null) res.headers.set("Retry-After", String(retryAfterSec));
  return res;
}

/**
 * Server-only env lookup. `process.env` first (local `.env.local` / Node),
 * then the Cloudflare Worker `env` (dashboard vars + secrets). Throws are
 * swallowed — outside the OpenNext runtime there is no Cloudflare context.
 */
function getServerEnv(name: string): string | undefined {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;
  try {
    const value = (
      getCloudflareContext().env as Record<string, unknown> | undefined
    )?.[name];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  const now = Date.now();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, message, company } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown;
  };

  // Honeypot: bots fill it; humans never see it. Fake success, no send,
  // and don't burn rate-limit budget on it.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // ---- Rate limit: per IP ----
  const ip = getIp(req);
  const attempts = prune(attemptsByIp.get(ip) ?? [], IP_WINDOW_MS, now);
  if (attempts.length >= IP_MAX_ATTEMPTS) {
    const oldest = attempts[0] ?? now;
    const retryAfter = Math.max(
      1,
      Math.ceil((oldest + IP_WINDOW_MS - now) / 1000)
    );
    return limitResponse(
      "Too many tries — please wait a few minutes and try again.",
      retryAfter
    );
  }
  attempts.push(now);
  attemptsByIp.set(ip, attempts);

  // ---- One-per-visitor: cookie gate (checked before any send) ----
  if (req.cookies.get(SENT_COOKIE)?.value === "1") {
    return NextResponse.json(
      {
        ok: false,
        code: "already-sent",
        error: "You've already sent a message — one per visitor.",
      },
      { status: 403 }
    );
  }

  // ---- Validation ----
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 }
    );
  }
  if (
    cleanEmail.length > 254 ||
    !EMAIL_RE.test(cleanEmail)
  ) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Please write a message between 10 and 2000 characters." },
      { status: 400 }
    );
  }

  // ---- One-per-visitor: address gate ----
  const normalizedEmail = cleanEmail.toLowerCase();
  if (sentAddresses.has(normalizedEmail)) {
    return NextResponse.json(
      {
        ok: false,
        code: "already-sent",
        error: "This email address has already sent a message.",
      },
      { status: 403 }
    );
  }

  // ---- Global safety valve ----
  globalSendAt = prune(globalSendAt, GLOBAL_WINDOW_MS, now);
  if (globalSendAt.length >= GLOBAL_MAX_SENDS) {
    return limitResponse("The inbox is busy — please try again later.", 3600);
  }

  // ---- Secrets stay server-side (process.env locally, Worker env in prod) ----
  const apiKey = getServerEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[contact] missing RESEND_API_KEY");
    return NextResponse.json(
      { ok: false, error: "Message service is not configured. Please email directly." },
      { status: 500 }
    );
  }
  const to = getServerEnv("CONTACT_TO") ?? site.email;
  const from = getServerEnv("CONTACT_FROM") ?? "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: cleanEmail,
      subject: `Portfolio contact from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    });
    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now — please try again later." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now — please try again later." },
      { status: 502 }
    );
  }

  // Success: record + lock the visitor with an HttpOnly cookie.
  sentAddresses.add(normalizedEmail);
  globalSendAt.push(now);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SENT_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
