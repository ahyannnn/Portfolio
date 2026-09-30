"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectScreenshotProps {
  src: string;
  fallback: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * NO-CROP screenshot primitive.
 *
 * The parent (screen cavity) owns a fixed 16:9 slot; the image uses
 * `fill` + `object-contain`, so the ENTIRE bitmap always fits —
 * different-ratio shots letterbox on the near-black cavity instead
 * of losing edges. Never `cover`, never stretched, never zoomed.
 *
 * Keeps the existing fallback system: tries `src`, swaps to the
 * checked-in placeholder diagram when the real file is missing.
 */
export function ProjectScreenshot({
  src,
  fallback,
  alt,
  sizes = "(max-width: 768px) 100vw, 70vw",
  priority = false,
  className,
}: ProjectScreenshotProps) {
  const [current, setCurrent] = React.useState(src);
  React.useEffect(() => setCurrent(src), [src]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={current}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => {
          if (current !== fallback) setCurrent(fallback);
        }}
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}
