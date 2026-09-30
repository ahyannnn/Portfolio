"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface SectionIndexProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "wide";
}

/** Editorial section header — index + hairline, not a centered card title. */
export function SectionIndex({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionIndexProps) {
  const reduce = useReducedMotion();
  return (
    <Reveal className={cn("mb-10 sm:mb-14", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
          {index}
        </span>
        {reduce ? (
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        ) : (
          <motion.span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        <span className="index-label">{eyebrow}</span>
      </div>
      <h2
        className={cn(
          "font-display mt-6 max-w-3xl text-balance text-3xl leading-[1.05] sm:text-5xl",
          align === "wide" && "max-w-4xl"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
