"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

/** Minimal sophisticated nav — quiet, 4 links, sliding active indicator. */
export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("/#top");
  const [scrolled, setScrolled] = React.useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = ["top", "work", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/#top"
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-2"
          aria-label="Back to top"
        >
          <span className="font-mono text-sm font-bold tracking-tight">
            ian<span className="text-accent">.</span>sanico
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Folio — 2026
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-0.5 py-1 font-mono text-[12px] uppercase tracking-[0.16em] transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && !reduce ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/projects/solaris"
              className="inline-flex items-center gap-1 border border-border bg-card px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors hover:border-foreground"
            >
              Solaris
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[11px] text-muted-foreground lg:inline">
            {site.location}
          </span>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* scroll progress hairline — suppressed under reduced motion */}
      {!reduce ? (
        <motion.span
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
        />
      ) : null}

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border bg-background md:hidden"
          >
            <ul className="mx-auto w-full max-w-[1280px] px-5 py-4">
              {navLinks.map((link, i) => (
                <li key={link.href} className="border-b border-border last:border-0">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-accent">
                        0{i + 1}
                      </span>
                      <span className="font-display text-2xl italic">
                        {link.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/projects/solaris"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-foreground py-3.5 text-sm font-medium text-background"
                >
                  View SOLARIS case study
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
