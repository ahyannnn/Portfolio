"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Carousel } from "./useCarousel";

interface CarouselDotsProps {
  carousel: Carousel;
  /** Base label, e.g. "SOLARIS screenshots". Announced as "… 2 of 3". */
  label: string;
  onStage?: boolean;
}

/**
 * Shared carousel controls: generous touch targets with small visual dots,
 * arrow-key support, and a polite live region announcing the active shot.
 */
export function CarouselDots({ carousel, label, onStage = false }: CarouselDotsProps) {
  return (
    <div
      role="group"
      aria-label={`${label} — choose screenshot`}
      className="flex min-h-8 shrink-0 items-center gap-1"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") carousel.next();
        if (e.key === "ArrowLeft") carousel.prev();
      }}
    >
      {Array.from({ length: carousel.count }).map((_, i) => {
        const active = i === carousel.index;
        return (
          <button
            key={i}
            type="button"
            onClick={() => carousel.goTo(i)}
            aria-label={`Show screenshot ${i + 1} of ${carousel.count}`}
            aria-current={active ? "true" : undefined}
            className="flex h-8 w-8 items-center justify-center"
          >
            {active ? (
              <motion.span
                aria-hidden="true"
                layoutId={onStage ? `dots-pill-stage-${label}` : `dots-pill-${label}`}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="h-1.5 w-6 rounded-full bg-accent"
              />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                  onStage
                    ? "bg-[#ece5d3]/35 hover:bg-[#ece5d3]/70"
                    : "bg-foreground/25 hover:bg-foreground/60"
                )}
              />
            )}
          </button>
        );
      })}
      <span aria-live="polite" className="sr-only">
        {`${label} — screenshot ${carousel.index + 1} of ${carousel.count}`}
      </span>
    </div>
  );
}
