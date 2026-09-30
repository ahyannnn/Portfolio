import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { DesktopMockup } from "@/components/projects/DesktopMockup";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description: project.description,
      type: "article",
    },
  };
}

function MetaTable({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const rows: [string, string][] = [
    ["Role", project.role ?? "—"],
    ["Type", project.type],
    ["Year", project.year ?? "—"],
    ["Status", project.status ?? "—"],
    ["Stack", project.technologies.slice(0, 4).join(" · ")],
  ];
  return (
    <dl className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-5">
      {rows.map(([k, v]) => (
        <div key={k} className="bg-card px-4 py-3.5">
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
          <dd className="mt-1 text-[13px] font-medium leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SolarisCaseStudy({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  return (
    <>
      {/* Interface — dashboard hero on its own monitor */}
      <Reveal>
        <DesktopMockup
          shot={{
            src: project.image ?? images.solarisDashboard.src,
            fallback: project.fallbackImage ?? images.solarisDashboard.fallback,
            alt: project.imageAlt ?? images.solarisDashboard.alt,
          }}
          priority
          tilt="none"
          sizes="(max-width: 768px) 100vw, 1100px"
          className="mx-auto max-w-5xl"
        />
        <p className="mx-auto mt-3 flex max-w-5xl justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Fig. 01 — Administrative dashboard</span>
          <span className="hidden sm:inline">MERN web client</span>
        </p>
      </Reveal>

      {/* Overview / Problem / Solution — 3 short columns */}
      <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-3">
        {[
          ["Overview", "SOLARIS coordinates solar-project bookings, project records, and billing in one place — web dashboard for staff, Flutter app as companion."],
          ["Problem", "Bookings, site visits, and invoices lived in separate threads and sheets. Status was word-of-mouth; billing lagged behind field work."],
          ["Solution", "One data model for bookings → projects → billing, exposed through typed REST APIs so web and mobile stay consistent."],
        ].map(([h, p], i) => (
          <Reveal key={h} delay={i * 0.05}>
            <div className="border-t-2 border-foreground pt-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{h}</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Features — image-anchored, not text wall */}
      <Reveal className="mt-12 sm:mt-16">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">A</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="index-label">Features</span>
        </div>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
          {[
            ["Bookings", "Create, schedule, and track installation bookings with status flow.", "POST /api/bookings"],
            ["Billing", "Generate invoices from project records; mark billed / paid.", "POST /api/billing"],
            ["Project records", "Single record per site: survey, install, monitoring state.", "GET /api/projects/:id"],
            ["Mobile companion", "Flutter app reads the same APIs for field updates.", "Flutter · REST"],
          ].map(([t, d, code]) => (
            <div key={t} className="bg-card p-6">
              <h3 className="font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              <code className="mt-3 inline-block bg-muted px-2 py-1 font-mono text-[11px] text-foreground">{code}</code>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Interface band — project records + reports, tilted pair */}
      <div className="mt-12 grid items-start gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <DesktopMockup
            shot={{
              src: images.solarisProjects.src,
              fallback: images.solarisProjects.fallback,
              alt: images.solarisProjects.alt,
            }}
            tilt="left"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Fig. 02 — Project records &amp; billing status</p>
        </Reveal>
        <Reveal delay={0.06}>
          <DesktopMockup
            shot={{
              src: images.solarisReports.src,
              fallback: images.solarisReports.fallback,
              alt: images.solarisReports.alt,
            }}
            tilt="right"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Fig. 03 — Reports &amp; quotations</p>
        </Reveal>
      </div>

      {/* Technology + Development */}
      <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2">
        <Reveal>
          <div className="border border-border bg-card p-6 sm:p-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {project.technologies.map((t) => (
                <li key={t} className="border border-border bg-background px-3 py-1.5 font-mono text-[12px]">{t}</li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-4 font-mono text-[12px] leading-relaxed text-muted-foreground">
              <p>web ─ MERN + REST</p>
              <p>mobile ─ Flutter ─┐</p>
              <p className="text-foreground">shared API contracts ─┘</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex h-full flex-col border border-border bg-foreground p-6 text-background sm:p-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Development — my slice</h2>
            <pre className="mt-4 overflow-x-auto font-mono text-[12.5px] leading-relaxed">
              <code>{`// backend — bookings + billing
POST   /api/bookings      → create
GET    /api/bookings?status=
PATCH  /api/projects/:id  → survey/install
POST   /api/billing       → invoice
// validation + consistent error shape
// so web & mobile never drift`}</code>
            </pre>
            <p className="mt-4 text-[13px] leading-relaxed opacity-70">
              I designed the backend architecture and database structure —
              endpoints, validation, and data handling for bookings, billing,
              and project records — plus the integration layer keeping web,
              database, and the Flutter app in sync.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Results */}
      <Reveal className="mt-12 sm:mt-16">
        <div className="border-y border-border py-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Results / Next</h2>
          <p className="font-display mt-3 max-w-3xl text-balance text-2xl leading-snug sm:text-3xl">
            Capstone in progress — backend contracts stable, web and mobile
            building against the same APIs.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Next: billing edge cases, authZ review, and demo hardening before
            defense. Metrics (booking volume, invoice cycle time) will be added
            here once measured — nothing invented.
          </p>
        </div>
      </Reveal>
    </>
  );
}

function GenericDetail({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const slot = project.slug === "rentahanan" ? images.rentahanan : images.portfolio;
  const [lead, ...rest] = project.gallery ?? [];
  return (
    <>
      <Reveal>
        <DesktopMockup
          shot={{
            src: lead?.src ?? project.image ?? slot.src,
            fallback: project.fallbackImage ?? slot.fallback,
            alt: lead?.alt ?? project.imageAlt ?? slot.alt,
          }}
          priority
          tilt="none"
          sizes="(max-width: 768px) 100vw, 1100px"
          className="mx-auto max-w-5xl"
        />
        <p className="mx-auto mt-3 max-w-5xl font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Fig. 01 — {(lead?.alt ?? slot.alt).split("—")[0].trim()}
        </p>
      </Reveal>
      {rest.length > 0 && (
        <div className="mt-10 grid items-start gap-10 sm:grid-cols-2 lg:gap-8">
          {rest.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 0.06}>
              <DesktopMockup
                shot={{
                  src: shot.src,
                  fallback: project.fallbackImage ?? slot.fallback,
                  alt: shot.alt,
                }}
                tilt={i % 2 === 0 ? "left" : "right"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Fig. 0{i + 2} — {shot.alt.split("—")[0].trim()}
              </p>
            </Reveal>
          ))}
        </div>
      )}
      <Reveal delay={0.05}>
        <div className="mt-8 border border-border bg-card p-6 sm:p-8">
          <h2 className="font-semibold tracking-tight">About this project</h2>
          <ul className="mt-3 space-y-2.5">
            {project.details.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-accent" />
                {d}
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-semibold tracking-tight">Technologies</h2>
          <ul aria-label="Technologies used" className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t} className="border border-border bg-background px-3 py-1.5 font-mono text-[12px]">{t}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const isSolaris = project.slug === "solaris";
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Work index
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="bg-accent px-2.5 py-1 font-bold text-accent-foreground">{project.type}</span>
            {project.status && <span className="text-muted-foreground">{project.status}</span>}
            {project.year && <span className="text-muted-foreground">{project.year}</span>}
          </div>
          <h1 className="font-display mt-4 text-balance text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[0.98]">
            {project.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap content-end items-center gap-2 lg:col-span-4 lg:justify-end">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 bg-foreground px-5 text-sm font-medium text-background transition-transform active:scale-[0.98]">
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              View code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-foreground">
              Live demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <div className="mt-8">
        <MetaTable project={project} />
      </div>

      <div className="mt-8">
        {isSolaris ? <SolarisCaseStudy project={project} /> : <GenericDetail project={project} />}
      </div>

      <nav aria-label="More work" className="mt-14 border-t border-border pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next — more work</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/projects/${o.slug}`}
              className="group flex items-center justify-between border border-border bg-card px-5 py-4 transition-colors hover:border-foreground">
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{o.type}</span>
                <span className="font-display mt-1 block text-xl">{o.name}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
