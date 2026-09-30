"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ProjectScreenshot } from "./ProjectScreenshot";

export interface MockupShot {
  src: string;
  fallback: string;
  alt: string;
}

export interface SwipeBinding {
  /** Key for the slide — changing it swaps the screenshot. */
  index: number;
  /** +1 advancing, -1 going back — drives slide direction. */
  direction: number;
  onNext: () => void;
  onPrev: () => void;
}

const SWIPE_MIN_PX = 60;
const SWIPE_MIN_VELOCITY = 350;
const SLIDE_PX = 120;
const ease = [0.22, 1, 0.36, 1] as const;

interface DesktopMockupProps {
  shot: MockupShot;
  priority?: boolean;
  sizes?: string;
  /** Subtle 3D stance. Reset to straight-on below 768px via CSS. */
  tilt?: "front" | "left" | "right" | "none";
  /** Bare = bezel + screen only (for layered fan backs — no floating stands). */
  bare?: boolean;
  /** Decorative instances (fan backs) hide from assistive tech; the hero + captions carry meaning. */
  decorative?: boolean;
  /**
   * Opt-in swipe carousel. When omitted the monitor is fully static.
   * The screenshot still renders whole via `object-contain` — swipe
   * moves the entire bitmap, never crops it.
   */
  swipe?: SwipeBinding;
  className?: string;
}

const tiltClass = {
  front: "tilt-front",
  left: "tilt-l",
  right: "tilt-r",
  none: "tilt-none",
} as const;

/**
 * Premium desktop monitor presenting a REAL project screenshot.
 *
 * Thin ink bezel, camera dot, 16:9 screen cavity, chin with logo tick,
 * stand neck + base, soft floor shadow. The screenshot inside always
 * renders whole via `object-contain` — the mockup presents it, never crops it.
 */
export function DesktopMockup({
  shot,
  priority = false,
  sizes,
  tilt = "none",
  bare = false,
  decorative = false,
  swipe,
  className,
}: DesktopMockupProps) {
  const reduce = useReducedMotion();

  // Declarative slide: enter/exit offset by swipe direction, settle with a
  // spring. No animation controls — AnimatePresence drives enter → center →
  // exit purely from `key` + `custom`, so dot clicks and drags share one path.
  const variants = {
    enter: (d: number) => ({
      x: reduce || d === 0 ? 0 : d > 0 ? SLIDE_PX : -SLIDE_PX,
      opacity: 0,
      scale: reduce ? 1 : 0.97,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: reduce || d === 0 ? 0 : d > 0 ? -SLIDE_PX : SLIDE_PX,
      opacity: 0,
      scale: reduce ? 1 : 0.97,
    }),
  };

  return (
    <figure
      className={cn("mockup-hover relative", className)}
      {...(decorative ? { "aria-hidden": true } : {})}
    >
      <div className={cn("mockup-3d relative", tiltClass[tilt])}>
        {/* Screen assembly */}
        <div className="relative rounded-xl border border-black/70 bg-[#1c1813] p-2 pb-0 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-2.5 sm:pb-0">
          {/* top highlight — machined edge, not a glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 top-0 h-px bg-white/15"
          />
          {/* camera */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/20"
          />
          {/* screen cavity — fixed 16:9, near-black letterbox */}
          <div className="screen-cavity relative aspect-video w-full overflow-hidden rounded-[5px]">
            {swipe && !decorative ? (
              <AnimatePresence
                initial={false}
                custom={swipe.direction}
                mode="sync"
              >
                <motion.div
                  key={swipe.index}
                  custom={swipe.direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          x: { type: "spring", stiffness: 380, damping: 38 },
                          opacity: { duration: 0.22 },
                          scale: { duration: 0.3, ease },
                        }
                  }
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    const { offset, velocity } = info;
                    if (
                      offset.x <= -SWIPE_MIN_PX ||
                      velocity.x <= -SWIPE_MIN_VELOCITY
                    )
                      swipe.onNext();
                    else if (
                      offset.x >= SWIPE_MIN_PX ||
                      velocity.x >= SWIPE_MIN_VELOCITY
                    )
                      swipe.onPrev();
                  }}
                  className="swipe-surface absolute inset-0 h-full w-full cursor-grab select-none active:cursor-grabbing"
                >
                  <ProjectScreenshot
                    src={shot.src}
                    fallback={shot.fallback}
                    alt={shot.alt}
                    sizes={sizes}
                    priority={priority}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <ProjectScreenshot
                src={shot.src}
                fallback={shot.fallback}
                alt={decorative ? "" : shot.alt}
                sizes={sizes}
                priority={priority}
              />
            )}
            {/* faint screen reflection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/[0.05] to-transparent"
            />
          </div>
          {/* chin */}
          <div className="flex h-6 items-center justify-center sm:h-7">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-white/25"
            />
          </div>
        </div>

        {/* stand — omitted on bare (layered) units */}
        {bare ? null : (
          <div aria-hidden="true">
            <div className="mx-auto h-5 w-16 bg-[#1c1813] [clip-path:polygon(14%_0,86%_0,100%_100%,0_100%)] sm:h-6 sm:w-20" />
            <div className="mx-auto h-[7px] w-44 rounded-[50%] bg-[#1c1813] sm:w-56" />
          </div>
        )}
      </div>

      {/* floor shadow */}
      {bare ? null : (
        <div
          aria-hidden="true"
          className="device-shadow pointer-events-none mx-auto -mt-1 h-6 w-[86%]"
        />
      )}
    </figure>
  );
}
