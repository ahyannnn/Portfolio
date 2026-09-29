"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { GithubIcon } from "./icons";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";

export function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-muted-foreground/40">
        {project.image ? (
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.name} details`}
            className="block overflow-hidden border-b border-border"
          >
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.name} screenshot`}
              width={800}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="aspect-video w-full object-cover"
            />
          </Link>
        ) : null}
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{project.type}</Badge>
            {project.featured ? (
              <Badge variant="outline">
                <Star className="mr-1 h-3 w-3" aria-hidden="true" />
                Featured
              </Badge>
            ) : null}
            {project.status ? (
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {project.status}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {project.tagline}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ul
            aria-label={`Technologies for ${project.name}`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-wrap">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Details
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Code
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Live demo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
