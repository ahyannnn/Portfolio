"use client";

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
      className="flex items-center gap-1"
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
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active
                  ? "w-6 bg-accent"
                  : onStage
                    ? "w-1.5 bg-[#ece5d3]/35 hover:bg-[#ece5d3]/70"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/60"
              )}
            />
          </button>
        );
      })}
      <span aria-live="polite" className="sr-only">
        {`${label} — screenshot ${carousel.index + 1} of ${carousel.count}`}
      </span>
    </div>
  );
}
