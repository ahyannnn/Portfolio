import { experience, education } from "@/data/experience";
import { SectionIndex } from "@/components/editorial/SectionIndex";
import { Reveal } from "@/components/Reveal";

/** Editorial timeline — period left, role middle, no card grid. */
export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="experience-heading">
          <SectionIndex
            index="05"
            eyebrow="Experience · Education"
            title={<>Path <em className="text-accent">so far.</em></>}
            description="Capstone, coursework, and academic background. No invented roles — only real work."
          />
        </div>
        <ol className="border-t border-border">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.04}>
              <li className="grid gap-3 border-b border-border py-7 sm:grid-cols-[160px_1fr_auto] sm:gap-8">
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground sm:pt-1">
                  {item.period}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{item.kind}</p>
                  <h3 className="font-display mt-1.5 text-2xl leading-tight">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.organization}{item.location ? ` · ${item.location}` : null}
                  </p>
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">{item.summary}</p>
                  <ul className="mt-3 max-w-2xl space-y-1.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <ul aria-label={`Stack for ${item.role}`} className="flex flex-wrap content-start gap-x-3 gap-y-1 sm:max-w-[180px] sm:justify-end">
                  {item.tags.map((t) => (
                    <li key={t} className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {education.map((edu) => (
            <Reveal key={edu.school} className="lg:col-span-7">
              <div className="border border-border bg-card p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Education</p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl">{edu.degree}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {edu.school}{edu.location ? ` · ${edu.location}` : null} — <span className="font-mono text-xs">{edu.period}</span>
                </p>
                <ul className="mt-4 space-y-1.5">
                  {edu.details.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between border border-border p-6 sm:p-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Currently</p>
                <p className="font-display mt-2 text-2xl italic leading-snug">
                  Heads down on SOLARIS — backend APIs, billing flows, project records.
                </p>
              </div>
              <a href="/projects/solaris" className="u-link mt-6 inline-flex w-fit items-center gap-1 text-sm font-medium">
                Read the case study →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
