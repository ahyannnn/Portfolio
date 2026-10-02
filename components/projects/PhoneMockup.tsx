"use client";

import { cn } from "@/lib/utils";
import { ProjectScreenshot } from "./ProjectScreenshot";
import type { MockupShot } from "./DesktopMockup";

interface PhoneMockupProps {
  shot: MockupShot;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Portrait phone frame for mobile screenshots.
 * 9:19 cavity, no-crop via ProjectScreenshot (object-contain),
 * fallback to placeholder diagram when src is missing.
 */
export function PhoneMockup({
  shot,
  priority = false,
  sizes = "(max-width: 768px) 70vw, 320px",
  className,
}: PhoneMockupProps) {
  return (
    <figure className={cn("mx-auto w-full max-w-[300px]", className)}>
      <div className="relative rounded-[2rem] border border-black/70 bg-[#1c1813] p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-1 w-16 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/20"
        />
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.4rem] bg-[#0c0a07]">
          <ProjectScreenshot
            src={shot.src}
            fallback={shot.fallback}
            alt={shot.alt}
            sizes={sizes}
            priority={priority}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/[0.05] to-transparent"
          />
        </div>
      </div>
    </figure>
  );
}
