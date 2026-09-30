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
}

/** Closing — oversized type + direct channels, restrained form. */
export function ContactSection() {
  const [form, setForm] = React.useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Partial<FormState>>({});
  const [sent, setSent] = React.useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSent(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors: Partial<FormState> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      nextErrors.email = "Please enter a valid email.";
    if (form.message.trim().length < 10)
      nextErrors.message = "Please write at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="contact-heading">
          <SectionIndex
            index="06"
            eyebrow="Contact"
            title={<>Let&apos;s build something <em className="text-accent">reliable.</em></>}
            description="Open to internships, collaborations, and feedback. The form opens your email client — nothing stored."
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
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Name</label>
                  <Input id="contact-name" name="name" autoComplete="name" placeholder="Jane Doe"
                    value={form.name} onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                  {errors.name ? <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</label>
                  <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com"
                    value={form.email} onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                  {errors.email ? <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email}</p> : null}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Message</label>
                <Textarea id="contact-message" name="message" placeholder="Hi — I'd like to talk about…"
                  value={form.message} onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
                {errors.message ? <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.message}</p> : null}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-transform active:scale-[0.98]">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send via email
                </button>
                {sent ? (
                  <p role="status" className="text-sm text-muted-foreground">Opening your email client…</p>
                ) : (
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">No backend — mailto handoff</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
