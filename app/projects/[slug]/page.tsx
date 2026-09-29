import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.type}</Badge>
          {project.status ? (
            <Badge variant="outline">{project.status}</Badge>
          ) : null}
          {project.year ? (
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{project.tagline}</p>
        {project.role ? (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Role: {project.role}
          </p>
        ) : null}
      </header>

      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.name} screenshot`}
          width={1200}
          height={675}
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="mt-8 aspect-video w-full rounded-lg border border-border object-cover"
        />
      ) : null}

      <p className="mt-8 leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            View code
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            Live demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="font-semibold tracking-tight">About this project</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-accent">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2 className="mt-6 font-semibold tracking-tight">Technologies</h2>
          <ul aria-label="Technologies used" className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </article>
  );
}
