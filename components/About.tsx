import { GraduationCap, Target, Code2 } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Card, CardContent } from "./ui/card";

const interests = [
  {
    icon: Code2,
    title: "Technical interests",
    body: "Backend development with Node.js and REST APIs, database design, and practical web applications.",
  },
  {
    icon: GraduationCap,
    title: "Development interests",
    body: "Clean UI, accessible interfaces, and small maintainable codebases that are easy to hand over.",
  },
  {
    icon: Target,
    title: "Professional goals",
    body: "Grow into a reliable junior developer through internships, strong capstone delivery, and open collaboration.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-14 sm:py-20">
      <div id="about-heading">
        <SectionHeading
          eyebrow="About"
          title="IT student focused on practical web development"
          description={`Studying ${site.degree} at ${site.university}. I like building straightforward tools that solve real problems — currently my capstone SOLARIS.`}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {interests.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <Card className="h-full">
              <CardContent className="p-6">
                <item.icon
                  className="h-5 w-5 text-accent"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <strong className="font-medium text-foreground">Education: </strong>
          {site.degree}, {site.university} ({site.period}).
        </p>
      </Reveal>
    </section>
  );
}
