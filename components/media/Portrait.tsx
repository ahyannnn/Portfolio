"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface PortraitProps {
  src: string;
  fallback: string;
  alt: string;
  caption?: string;
  meta?: string;
  className?: string;
}

/** Editorial portrait — 4:5, hairline frame, caption rule, subtle reveal. */
export function Portrait({
  src,
  fallback,
  alt,
  caption,
  meta,
  className,
}: PortraitProps) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = React.useState(src);
  React.useEffect(() => setCurrent(src), [src]);

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 28, clipPath: "inset(8% 4% 8% 4%)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn("relative", className)}
    >
      <div className="img-frame relative aspect-[4/5] bg-card">
        <Image
          src={current}
          alt={alt}
          width={900}
          height={1125}
          sizes="(max-width: 768px) 100vw, 420px"
          priority
          onError={() => {
            if (current !== fallback) setCurrent(fallback);
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
        {/* corner ticks — technical, quiet */}
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-background/80" />
        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-background/80" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-background/80" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-background/80" />
      </div>
      {(caption || meta) && (
        <figcaption className="flex items-baseline justify-between gap-4 border-b border-border py-3">
          <span className="text-sm font-medium tracking-tight">{caption}</span>
          {meta && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {meta}
            </span>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}
