"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { DesktopMockup, type MockupShot } from "./DesktopMockup";
import type { Carousel } from "./useCarousel";

interface DeviceFanProps {
  /** Exactly [hero, backLeft, backRight] — hero carries meaning, backs are decorative. */
  shots: [MockupShot, MockupShot, MockupShot];
  priority?: boolean;
  className?: string;
  /**
   * Opt-in rotating trio: the front monitor swipes through all three
   * shots while the backs become "the other two". Omit for a static fan.
   */
  carousel?: Carousel;
}

const ease = [0.22, 1, 0.36, 1] as const;

function Enter({
  x,
  delay,
  className,
  children,
}: {
  x: number;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn("p3d", className)}>{children}</div>;
  return (
    <motion.div
      className={cn("p3d", className)}
      initial={{ opacity: 0, x, y: 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Layered 3-device composition (the reference's phone-trio idea,
 * translated to landscape desktop): hero monitor front-center on its
 * stand, two bare screens fanned behind at 3D angles.
 *
 * Layering: entrance motion lives on the wrappers; the CSS 3D tilt
 * lives on the inner mockup figure — the two never fight over
 * `transform`. `p3d` keeps one shared perspective context.
 */
export function DeviceFan({
  shots,
  priority = false,
  className,
  carousel,
}: DeviceFanProps) {
  const reduce = useReducedMotion();
  const sceneRef = React.useRef<HTMLDivElement>(null);
  // Gentle scroll drift for the backs (±14px opposing). Hooks always run;
  // the style is only attached when motion is allowed.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });
  const driftL = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const driftR = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const order = carousel
    ? [carousel.index, (carousel.index + 1) % 3, (carousel.index + 2) % 3]
    : [0, 1, 2];
  const hero = shots[order[0]];
  const backL = shots[order[1]];
  const backR = shots[order[2]];
  const swipe = carousel
    ? {
        index: carousel.index,
        direction: carousel.direction,
        onNext: carousel.next,
        onPrev: carousel.prev,
      }
    : undefined;

  // Backs crossfade when the trio rotates; plain fade keeps the 3D tilt untouched.
  const back = (shot: MockupShot, side: "l" | "r") => (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={shot.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
        style={reduce ? undefined : { y: side === "l" ? driftL : driftR }}
      >
        <DesktopMockup
          shot={shot}
          bare
          decorative
          sizes="(max-width: 768px) 55vw, 32vw"
          className={cn("fan-back", side === "l" ? "fan-back-l" : "fan-back-r")}
        />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div ref={sceneRef} className={cn("fan-scene relative", className)}>
      <Enter
        x={-48}
        delay={0.18}
        className="absolute left-0 top-1/2 z-0 w-[57%] -translate-y-1/2"
      >
        {back(backL, "l")}
      </Enter>
      <Enter
        x={48}
        delay={0.26}
        className="absolute right-0 top-1/2 z-0 w-[57%] -translate-y-1/2"
      >
        {back(backR, "r")}
      </Enter>
      <Enter x={0} delay={0.05} className="relative z-10 mx-auto w-[78%]">
        <DesktopMockup
          shot={hero}
          priority={priority}
          tilt="front"
          sizes="(max-width: 768px) 92vw, 58vw"
          swipe={swipe}
        />
      </Enter>
    </div>
  );
}
