import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div id="projects-heading">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Each card links to a detail page with context, stack, and links. SOLARIS is the featured capstone."
        />
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.06}>
            <li className="h-full">
              <ProjectCard project={project} />
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
