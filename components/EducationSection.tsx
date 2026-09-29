import { education } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Card, CardContent } from "./ui/card";

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div id="education-heading">
        <SectionHeading eyebrow="Education" title="Academic background" />
      </div>
      <div className="grid gap-4">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.05}>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold tracking-tight">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {edu.school}
                  {edu.location ? ` · ${edu.location}` : null}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-accent">
                  {edu.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
