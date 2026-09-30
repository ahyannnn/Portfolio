"use client";

import * as React from "react";

export interface Carousel {
  index: number;
  /** +1 when advancing, -1 when going back — drives slide direction. */
  direction: number;
  count: number;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
}

/** Wrap-around gallery state. Shared by the fan hero, split main, and dots. */
export function useCarousel(count: number): Carousel {
  const [state, setState] = React.useState({ index: 0, direction: 0 });
  const goTo = React.useCallback(
    (i: number) => {
      setState((s) => {
        const next = ((i % count) + count) % count;
        if (next === s.index || count <= 1) return { index: next, direction: 0 };
        // Shortest-path direction so dot jumps slide the short way around.
        const fwd = (next - s.index + count) % count;
        const bwd = (s.index - next + count) % count;
        return { index: next, direction: fwd <= bwd ? 1 : -1 };
      });
    },
    [count]
  );
  const next = React.useCallback(() => {
    setState((s) => ({ index: (s.index + 1) % count, direction: 1 }));
  }, [count]);
  const prev = React.useCallback(() => {
    setState((s) => ({ index: (s.index - 1 + count) % count, direction: -1 }));
  }, [count]);
  return { index: state.index, direction: state.direction, count, next, prev, goTo };
}
