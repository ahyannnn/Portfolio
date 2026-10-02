"use client";

import * as React from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { site } from "@/lib/site";
import { SectionIndex } from "@/components/editorial/SectionIndex";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormState {
  name: string;
  email: string;
  message: string;
  /** Honeypot — humans leave it empty. */
  company: string;
}

type Status = "idle" | "sending" | "sent" | "locked" | "error";

const SENT_FLAG = "contact:sentAt";
const LOCKED_MESSAGE = "You've already sent a message — one per visitor. For anything else, email me directly.";

/** Closing — oversized type + direct channels, one-message form via Resend. */
export function ContactSection() {
  const [form, setForm] = React.useState<FormState>({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = React.useState<Partial<FormState>>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  // If this browser already sent once, lock the form on mount.
  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(SENT_FLAG)) setStatus("locked");
    } catch {
      // storage unavailable — server cookie still enforces the limit
    }
  }, []);

  const locked = status === "sent" || status === "locked";
  const sending = status === "sending";

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setServerError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (locked || sending) return;
    const nextErrors: Partial<FormState> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      nextErrors.email = "Please enter a valid email.";
    if (form.message.trim().length < 10)
      nextErrors.message = "Please write at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          company: form.company,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        error?: string;
      } | null;

      if (res.ok && data?.ok) {
        try {
          window.localStorage.setItem(SENT_FLAG, new Date().toISOString());
        } catch {
          // ignore — server HttpOnly cookie is the real lock
        }
        setForm({ name: "", email: "", message: "", company: "" });
        setStatus("sent");
        return;
      }
      if (res.status === 403 && data?.code === "already-sent") {
        try {
          window.localStorage.setItem(SENT_FLAG, new Date().toISOString());
        } catch {
          // ignore
        }
        setStatus("locked");
        return;
      }
      setStatus("error");
      setServerError(
        data?.error ?? "Could not send right now — please try again later."
      );
    } catch {
      setStatus("error");
      setServerError("Network error — check your connection and try again.");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="contact-heading">
          <SectionIndex
            index="07"
            eyebrow="Contact"
            title={<>Let&apos;s build something <em className="text-accent">reliable.</em></>}
            description="Open to internships, collaborations, and feedback. One message per visitor — I reply within a couple of days."
          />
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                className="group block border-y border-border py-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <span className="font-display mt-2 block break-all text-2xl leading-tight transition-colors group-hover:text-accent sm:text-3xl">
                  {site.email}
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-2 divide-y divide-border">
                {[
                  { label: "GitHub", href: site.github, Icon: GithubIcon, external: true },
                  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon, external: true },
                  { label: "Resume (PDF)", href: site.resumeHref, Icon: ArrowUpRight, external: false },
                ].map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="flex items-center gap-3 text-[15px] font-medium">
                        <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
                        {label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 border-l-2 border-accent pl-4 text-[13px] leading-relaxed text-muted-foreground">
                Prefer email? Include the project name, timeline, and what
                you&apos;d like help with — I reply within a couple of days.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="border border-border bg-card p-6 sm:p-9">
              {/* Honeypot: hidden from humans, bots fill it and get a fake success. */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Name</label>
                  <Input id="contact-name" name="name" autoComplete="name" placeholder="Jane Doe"
                    value={form.name} onChange={(e) => update("name", e.target.value)} disabled={locked || sending}
                    aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                  {errors.name ? <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</label>
                  <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com"
                    value={form.email} onChange={(e) => update("email", e.target.value)} disabled={locked || sending}
                    aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                  {errors.email ? <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email}</p> : null}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Message</label>
                <Textarea id="contact-message" name="message" placeholder="Hi — I'd like to talk about…"
                  value={form.message} onChange={(e) => update("message", e.target.value)} disabled={locked || sending}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
                {errors.message ? <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.message}</p> : null}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={locked || sending}
                  className="inline-flex h-11 items-center justify-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {sending ? "Sending…" : locked ? "Message sent" : "Send message"}
                </button>
                {status === "sent" ? (
                  <p role="status" className="text-sm text-muted-foreground">Message sent — I&apos;ll reply within a couple of days.</p>
                ) : status === "locked" ? (
                  <p role="status" className="text-sm text-muted-foreground">{LOCKED_MESSAGE}</p>
                ) : status === "error" && serverError ? (
                  <p role="alert" className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
                ) : (
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">One message per visitor</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
