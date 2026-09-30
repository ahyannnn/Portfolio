"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { GithubIcon } from "@/components/icons";
import { DesktopMockup } from "./DesktopMockup";
import { DeviceFan } from "./DeviceFan";
import { useCarousel } from "./useCarousel";
import { CarouselDots } from "./CarouselDots";
import type { Project } from "@/types";

export type ShowcaseVariant = "fan" | "split" | "full";

interface ProjectShowcaseProps {
  project: Project;
  index: string;
  variant: ShowcaseVariant;
  /** Split variant only: mirror the composition. */
  flip?: boolean;
}

function TechLine({ items, label }: { items: string[]; label: string }) {
  return (
    <p
      aria-label={label}
      className="font-mono text-[12px] leading-relaxed tracking-wide text-muted-foreground"
    >
      {items.join("  ·  ")}
    </p>
  );
}

function Dossier({
  project,
  index,
  onStage = false,
}: {
  project: Project;
  index: string;
  onStage?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="font-bold text-accent">{index}</span>
        <span className={onStage ? "muted-on-stage" : "text-muted-foreground"}>
          {project.type}
        </span>
        <span
          className={cn(
            "ml-auto",
            onStage ? "muted-on-stage" : "text-muted-foreground"
          )}
        >
          {project.year ?? project.status}
        </span>
      </div>
      <h3 className="font-display mt-4 text-4xl leading-[0.95] sm:text-5xl">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors hover:text-accent"
        >
          {project.name}
        </Link>
      </h3>
      <p
        className={cn(
          "mt-2 text-[15px] font-medium",
          onStage ? "muted-on-stage" : "text-muted-foreground"
        )}
      >
        {project.tagline}
      </p>
      <p
        className={cn(
          "mt-4 max-w-[48ch] text-[14px] leading-relaxed",
          onStage ? "muted-on-stage" : "text-muted-foreground"
        )}
      >
        {project.description}
      </p>
      <div className="mt-5">
        <TechLine
          items={project.technologies}
          label={`Technologies for ${project.name}`}
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex h-10 items-center gap-1.5 bg-accent px-4 text-sm font-medium text-accent-foreground transition-transform active:scale-[0.98]"
        >
          Case study
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-10 items-center gap-1.5 border px-4 text-sm transition-colors",
              onStage
                ? "rule-on-stage muted-on-stage hover:border-[#ece5d3] hover:text-[#ece5d3]"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            Code
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "u-link inline-flex h-10 items-center gap-1 px-2 text-sm",
              onStage ? "muted-on-stage" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Live ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}

function shotOf(project: Project, i: number) {
  const g = project.gallery?.[i];
  return {
    src: g?.src ?? project.image ?? "",
    fallback: project.fallbackImage ?? "",
    alt: g?.alt ?? project.imageAlt ?? project.name,
  };
}

/**
 * Visual case-study compositions — data-driven, never hardcoded per project.
 * - fan:   full-bleed ink stage, layered 3-device hero + dossier beside.
 * - split: single tilted monitor (+ secondary peeking behind) beside dossier.
 * - full:  large straight monitor, compact text row underneath.
 */
export function ProjectShowcase({
  project,
  index,
  variant,
  flip = false,
}: ProjectShowcaseProps) {
  if (variant === "fan") {
    const shots = [shotOf(project, 0), shotOf(project, 1), shotOf(project, 2)] as [
      { src: string; fallback: string; alt: string },
      { src: string; fallback: string; alt: string },
      { src: string; fallback: string; alt: string },
    ];
    return (
      <FanShowcase project={project} index={index} shots={shots} />
    );
  }

  if (variant === "full") {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.name} details`}
            className="block"
          >
            <DesktopMockup
              shot={{
                src: project.image ?? "",
                fallback: project.fallbackImage ?? "",
                alt: project.imageAlt ?? project.name,
              }}
              tilt="none"
              sizes="(max-width: 768px) 100vw, 1100px"
              className="mx-auto max-w-5xl"
            />
          </Link>
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="font-bold text-accent">{index}</span>
              <span className="text-muted-foreground">{project.type}</span>
              <span className="ml-auto text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="font-display mt-3 text-3xl leading-none sm:text-4xl">
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors hover:text-accent"
              >
                {project.name}
              </Link>
            </h3>
            <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-5">
            <div className="md:pt-8">
              <TechLine
                items={project.technologies}
                label={`Technologies for ${project.name}`}
              />
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="u-link inline-flex items-center gap-1 text-sm font-medium"
                >
                  Details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" /> Code
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // split (default) — tilted hero monitor, swipeable when a gallery exists
  return <SplitShowcase project={project} index={index} flip={flip} />;
}

/**
 * Fan branch owns the trio carousel: the front monitor swipes through
 * all three shots while the backs become "the other two".
 */
function FanShowcase({
  project,
  index,
  shots,
}: {
  project: Project;
  index: string;
  shots: [
    { src: string; fallback: string; alt: string },
    { src: string; fallback: string; alt: string },
    { src: string; fallback: string; alt: string },
  ];
}) {
  const carousel = useCarousel(3);
  return (
    <div className="stage-band">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Featured capstone
          </p>
          <div className="mt-4">
            <Dossier project={project} index={index} onStage />
          </div>
          {project.role ? (
            <dl className="mt-7 grid grid-cols-2 gap-px border rule-on-stage bg-[#2e2920]">
              {[
                ["Role", project.role],
                ["Status", project.status ?? "—"],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#14110b] px-4 py-3 dark:bg-[#191510]">
                  <dt className="muted-on-stage font-mono text-[10px] uppercase tracking-[0.2em]">
                    {k}
                  </dt>
                  <dd className="mt-1 text-[13px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Reveal>
        <div className="lg:col-span-7">
          <DeviceFan shots={shots} priority carousel={carousel} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="muted-on-stage font-mono text-[11px] uppercase tracking-[0.16em]">
              Dashboard · Records · Reports — live UI
            </p>
            <CarouselDots
              carousel={carousel}
              label={`${project.name} screenshots`}
              onStage
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Split branch owns its own carousel: the main monitor swipes through
 * the gallery while the peeking shot shows "next up".
 */
function SplitShowcase({
  project,
  index,
  flip = false,
}: {
  project: Project;
  index: string;
  flip?: boolean;
}) {
  const gallery = project.gallery ?? [];
  const count = gallery.length || 1;
  const carousel = useCarousel(count);
  const main =
    gallery.length > 0
      ? {
          src: gallery[carousel.index].src,
          fallback: project.fallbackImage ?? "",
          alt: gallery[carousel.index].alt,
        }
      : {
          src: project.image ?? "",
          fallback: project.fallbackImage ?? "",
          alt: project.imageAlt ?? project.name,
        };
  const peek =
    gallery.length > 1 ? gallery[(carousel.index + 1) % gallery.length] : null;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.name} details`}
            className="relative block"
          >
            {peek ? (
              <div
                aria-hidden="true"
                className="peek-tilt absolute -bottom-8 -right-2 z-0 w-[46%] sm:-right-4"
              >
                <DesktopMockup
                  shot={{
                    src: peek.src,
                    fallback: project.fallbackImage ?? "",
                    alt: "",
                  }}
                  bare
                  decorative
                  tilt="none"
                  sizes="(max-width: 768px) 44vw, 30vw"
                />
              </div>
            ) : null}
            <DesktopMockup
              shot={main}
              tilt={flip ? "right" : "left"}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="relative z-10"
              swipe={
                gallery.length > 1
                  ? {
                      index: carousel.index,
                      direction: carousel.direction,
                      onNext: carousel.next,
                      onPrev: carousel.prev,
                    }
                  : undefined
              }
            />
          </Link>
          {gallery.length > 1 ? (
            <div className="relative z-10 mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Swipe or drag to explore
              </p>
              <CarouselDots
                carousel={carousel}
                label={`${project.name} screenshots`}
              />
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <Dossier project={project} index={index} />
        </Reveal>
      </div>
    </div>
  );
}
