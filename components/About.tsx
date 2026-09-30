import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { Portrait } from "@/components/media/Portrait";
import { SectionIndex } from "@/components/editorial/SectionIndex";
import { Reveal } from "@/components/Reveal";

const disciplines = [
  "Full-stack development",
  "System design",
  "UI implementation",
  "Software development",
];

/** About — short intro + portrait + facts, no giant paragraph. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="about-heading">
          <SectionIndex
            index="03"
            eyebrow="About"
            title={<>IT student, <em className="text-accent">practical builder.</em></>}
          />
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <Portrait
              src={images.profile.src}
              fallback={images.profile.fallback}
              alt={images.profile.alt}
              caption={site.name}
              meta={site.period}
              className="mx-auto w-full max-w-[340px] lg:mx-0"
            />
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display max-w-2xl text-balance text-2xl leading-snug sm:text-[2rem]">
                Studying {site.degree} at {site.university} — focused on
                backend work that ships: typed APIs, sane schemas, interfaces
                people can actually use.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <ul aria-label="Disciplines" className="mt-8 border-t border-border">
                {disciplines.map((d, i) => (
                  <li
                    key={d}
                    className="group flex items-baseline justify-between gap-4 border-b border-border py-3.5"
                  >
                    <span className="text-[15px] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {d}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
                {[
                  ["Education", `${site.degree}\n${site.university}`],
                  ["Focus", "Node · Express · MongoDB\nREST APIs · Flutter"],
                  ["Location", `${site.location}\nOpen to internships`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card px-5 py-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                    <dd className="mt-2 whitespace-pre-line text-sm leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
