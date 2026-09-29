"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            custom={0}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {site.role}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            >
              Hi, I&apos;m {site.name}
              <span className="text-accent">.</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            custom={1}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {site.tagline} I focus on backend development — APIs, databases,
            and clean interfaces — currently building SOLARIS, a booking and
            billing system for solar projects.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            custom={2}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.resumeHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              View resume
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            custom={3}
            aria-label="Profiles"
            className="mt-6 flex items-center gap-2"
          >
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li className="ml-2 font-mono text-xs text-muted-foreground">
              {site.location}
            </li>
          </motion.ul>
        </div>

        {/* Subtle developer visual — static terminal card, no heavy animation */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="hidden lg:block"
        >
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                ~/portfolio
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-muted-foreground">$ </span>
                <span className="text-foreground">whoami</span>
                {"\n"}
                <span className="text-accent">it-student & developer</span>
                {"\n\n"}
                <span className="text-muted-foreground">$ </span>
                <span className="text-foreground">cat focus.txt</span>
                {"\n"}
                <span className="text-muted-foreground">
                  node · express · mongodb
                  {"\n"}
                  rest apis · flutter · git
                </span>
                {"\n\n"}
                <span className="text-muted-foreground">$ </span>
                <span className="text-foreground">open ./solaris</span>
                {"\n"}
                <span className="text-accent">▸ capstone: in progress</span>
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
