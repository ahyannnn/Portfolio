import { experience } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Badge } from "./ui/badge";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div id="experience-heading">
        <SectionHeading
          eyebrow="Experience"
          title="Timeline"
          description="Internships, school projects, freelance, organizations, and relevant activities."
        />
      </div>
      <ol className="relative ml-2 space-y-8 border-l border-border pl-6">
        {experience.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <li className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
              />
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{item.kind}</Badge>
                <span className="text-xs text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <h3 className="mt-2 font-semibold tracking-tight">
                {item.role}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.organization}
                {item.location ? ` · ${item.location}` : null}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-accent">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul
                aria-label={`Technologies for ${item.role}`}
                className="mt-3 flex flex-wrap gap-2"
              >
                {item.tags.map((t) => (
                  <li key={t}>
                    <Badge>{t}</Badge>
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
