import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { badges, certifications } from "@/data/certifications";
import { SectionIndex } from "@/components/editorial/SectionIndex";
import { Reveal } from "@/components/Reveal";

/** Certifications + badges — featured certificate, editorial badge rows. */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-20 border-t border-border bg-card/40"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div id="certifications-heading">
          <SectionIndex
            index="05"
            eyebrow="Certifications · Badges"
            title={
              <>
                Credentials that <em className="text-accent">back the work.</em>
              </>
            }
            description="Course completion and skill badges across cloud and AI fundamentals."
          />
        </div>

        {certifications.map((cert) => (
          <Reveal key={cert.id}>
            <article className="border border-border bg-card p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    Certificate · {cert.issuer}
                  </p>
                  <h3 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {cert.date} · {cert.meta}
                  </p>
                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                    {cert.description}
                  </p>
                  {cert.pdfHref ? (
                    <a
                      href={cert.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-link mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium"
                    >
                      View certificate (PDF) →
                    </a>
                  ) : null}
                </div>
                {cert.previewSrc ? (
                  <div className="lg:col-span-5">
                    <a
                      href={cert.pdfHref ?? cert.previewSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${cert.title} PDF in a new tab`}
                      className="group block border border-border bg-background p-2 transition-colors hover:border-foreground"
                    >
                      <span className="relative block aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={cert.previewSrc}
                          alt={cert.previewAlt ?? `${cert.title} preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </span>
                    </a>
                    <p className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      <span>Preview — click to open PDF</span>
                      <span className="hidden sm:inline">PDF</span>
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.06}>
          <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Skill badges · Google Cloud Skills Boost
          </h3>
          <ul aria-label="Skill badges" className="mt-4 border-t border-border">
            {badges.map((badge, i) => (
              <li
                key={badge.id}
                className="group flex items-center justify-between gap-4 border-b border-border py-3.5"
              >
                <span className="flex items-center gap-3">
                  <BadgeCheck
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {badge.title}
                  </span>
                </span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="hidden sm:inline">{badge.issuer} · </span>
                  {`0${i + 1}`}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
