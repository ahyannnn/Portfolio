import { SectionIndex } from "@/components/editorial/SectionIndex";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/projects";

/**
 * Visual case-study index — rhythm over repetition:
 * 01 SOLARIS    full-bleed ink stage, layered 3-device fan (loud)
 * 02 RenTahanan alternating split, tilted monitor + peeking shot (medium)
 * 03 Portfolio  full-width straight monitor, quiet text row (quiet)
 */
export function ProjectGrid() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div id="work-heading">
          <SectionIndex
            index="02"
            eyebrow="Selected work"
            title={<>Work, shown — <em className="text-accent">not just listed.</em></>}
            description="SOLARIS leads as the capstone case study. Everything links to a detail page with context, stack, and links."
          />
        </div>
      </div>

      {featured ? (
        <ProjectShowcase project={featured} index="01" variant="fan" />
      ) : null}

      <div className="space-y-16 py-16 sm:space-y-24 sm:py-24">
        {rest.map((p, i) => (
          <ProjectShowcase
            key={p.slug}
            project={p}
            index={`0${i + 2}`}
            // Last entry goes full-width only when the index has 3+ projects;
            // with two projects the rhythm stays fan → split.
            variant={i === rest.length - 1 && rest.length > 1 ? "full" : "split"}
            flip={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
