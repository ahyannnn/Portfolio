import { skillCategories } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div id="skills-heading">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I actually use"
          description="Grouped by how I use them. Only listing tools backed by coursework or project work."
        />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.05}>
            <li>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold tracking-tight">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                  <ul
                    aria-label={`${cat.title} skills`}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {cat.skills.map((skill) => (
                      <li key={skill}>
                        <Badge>{skill}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
