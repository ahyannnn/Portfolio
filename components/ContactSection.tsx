"use client";

import * as React from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormState {
  name: string;
  email: string;
  message: string;
}

/**
 * v1 contact form — no backend. Validates input and opens the visitor's
 * email client via mailto:. Ready to swap for Resend/Formspree later
 * by replacing handleSubmit with a server action call.
 */
export function ContactSection() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
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
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div id="contact-heading">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect"
          description="Open to internships, collaborations, and feedback on my work. The form opens your email client — no data is stored."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="h-full">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <h3 className="font-semibold tracking-tight">Direct channels</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              </ul>
              <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
                Prefer email? Include the project name, timeline, and what
                you&apos;d like help with.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                    />
                    {errors.name ? (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                    />
                    {errors.email ? (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Hi — I'd like to talk about…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send via email
                  </button>
                  {sent ? (
                    <p role="status" className="text-sm text-muted-foreground">
                      Opening your email client…
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No backend yet — integrates with Resend/Formspree later.
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
