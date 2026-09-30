import { skillCategories } from "@/data/skills";
import { SectionIndex } from "@/components/editorial/SectionIndex";
import { Reveal } from "@/components/Reveal";

/** Technical profile — quiet definition rows, not a badge wall. */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="skills-heading">
          <SectionIndex
            index="04"
            eyebrow="Technical profile"
            title={<>Stack I <em className="text-accent">actually use.</em></>}
            description="Only tools backed by coursework or project work. Grouped by how I use them."
          />
        </div>
        <Reveal>
          <dl className="border-t border-border">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className="group grid gap-2 border-b border-border py-5 transition-colors hover:bg-card/60 sm:grid-cols-[220px_1fr] sm:gap-8 sm:px-2"
              >
                <dt>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                    {cat.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                    {cat.description}
                  </span>
                </dt>
                <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 sm:pt-0.5">
                  {cat.skills.map((s, i) => (
                    <span key={s} className="text-[15px] tracking-tight">
                      <span className="transition-colors group-hover:text-foreground text-muted-foreground group-hover:[&:not(:hover)]:text-muted-foreground">
                        {s}
                      </span>
                      {i < cat.skills.length - 1 && (
                        <span aria-hidden="true" className="ml-3 text-accent">·</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Evidence: SOLARIS capstone · Rentahanan coursework · this portfolio
          </p>
        </Reveal>
      </div>
    </section>
  );
}
