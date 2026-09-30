"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Portrait } from "@/components/media/Portrait";
import { GithubIcon, LinkedinIcon } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

function Rise({
  delay,
  children,
  className,
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Masked line reveal for display type — lines slide up from behind a mask. */
function MaskedLine({ delay, children }: { delay: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="block">{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Editorial hero — asymmetric type + portrait composition.
 * Answers WHO / WHAT / WHY without template greeting.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-14 pt-10 sm:px-8 sm:pt-16 lg:pb-20">
        {/* top meta strip */}
        <Rise delay={0}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span><strong className="font-semibold text-accent">Folio</strong> — 2026</span>
            <span className="hidden sm:inline">{site.location}</span>
            <span className="hidden md:inline">{site.role}</span>
            <span className="ml-auto inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Open to internships
            </span>
          </div>
        </Rise>

        <div className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* Type block — spans 7 */}
          <div className="lg:col-span-7">
            <Rise delay={0.06}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Ian George Sanico — IT student, backend-leaning
              </p>
              <h1
                id="hero-heading"
                className="font-display mt-5 max-w-[13ch] text-balance text-[clamp(2.9rem,7.2vw,5.6rem)] font-medium leading-[0.98]"
              >
                <MaskedLine delay={0.12}>Booking systems,</MaskedLine>
                <MaskedLine delay={0.21}>
                  <em className="text-accent">built backend-first.</em>
                </MaskedLine>
              </h1>
            </Rise>

            <Rise delay={0.14}>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-muted-foreground sm:text-[17px]">
                I&apos;m Ian — I design APIs, data models, and clean interfaces.
                Right now I&apos;m building{" "}
                <Link href="/projects/solaris" className="u-link font-medium text-foreground">
                  SOLARIS
                </Link>
                , a booking &amp; billing system for solar projects (MERN web +
                Flutter mobile), where I own backend development.
              </p>
            </Rise>

            <Rise delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/#work"
                  className="group inline-flex h-12 items-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-transform active:scale-[0.98]"
                >
                  View selected work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/projects/solaris"
                  className="inline-flex h-12 items-center gap-2 border border-border bg-card px-6 text-sm font-medium transition-colors hover:border-foreground"
                >
                  SOLARIS case study
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={site.resumeHref}
                  className="u-link inline-flex h-12 items-center gap-2 px-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Resume
                </a>
              </div>
            </Rise>

            <Rise delay={0.26}>
              <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-border border-y border-border">
                {[
                  ["Focus", "APIs · DB"],
                  ["Stack", "MERN · Flutter"],
                  ["Now", "SOLARIS · 2026"],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3.5 first:pl-0 sm:px-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm font-medium tracking-tight">{v}</dd>
                  </div>
                ))}
              </dl>
            </Rise>

            <Rise delay={0.3}>
              <ul aria-label="Profiles" className="mt-6 flex flex-wrap items-center gap-2">
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                    className="inline-flex h-10 items-center gap-2 border border-border px-3.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="font-mono text-xs">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                    className="inline-flex h-10 items-center gap-2 border border-border px-3.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                    <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="font-mono text-xs">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="u-link ml-2 hidden font-mono text-xs text-muted-foreground hover:text-foreground sm:inline">
                    {site.email}
                  </a>
                </li>
              </ul>
            </Rise>
          </div>

          {/* Portrait block — spans 5, asymmetric offset */}
          <div className="relative lg:col-span-5">
            <div className="lg:pl-6 lg:pt-2">
              <Portrait
                src={images.profile.src}
                fallback={images.profile.fallback}
                alt={images.profile.alt}
                caption="Ian George Sanico"
                meta="Marilao · PH"
                className="mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0"
              />
              {/* overlapping index tag — desktop only */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-2 top-6 hidden select-none lg:block">
                <span className="font-display text-[7rem] italic leading-none text-foreground/10">01</span>
              </div>
            </div>
            <Rise delay={0.32} className="mx-auto mt-5 max-w-[420px] lg:ml-auto lg:mr-0 lg:pl-6">
              <div className="flex items-start justify-between gap-4 border-l-2 border-accent pl-4">
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Fourth-year {site.degree} at {site.university}. I like
                  straightforward tools that survive handover — typed APIs,
                  sane schemas, honest UI.
                </p>
              </div>
            </Rise>
          </div>
        </div>

        {/* bottom strip — scroll cue + stack */}
        <Rise delay={0.36}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Scroll — selected work ↓</span>
            <span className="hidden sm:inline">Node · Express · MongoDB · REST · Flutter</span>
          </div>
        </Rise>
      </div>
    </section>
  );
}
