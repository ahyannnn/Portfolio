import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-mono text-sm font-bold tracking-tight">
            ian<span className="text-accent">.</span>sanico
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Backend-leaning developer building booking &amp; billing systems.
            Currently on SOLARIS capstone.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            © {year} {site.name} — {site.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Sitemap
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/#work" className="u-link text-muted-foreground hover:text-foreground">Work</a></li>
            <li><a href="/projects/solaris" className="u-link text-muted-foreground hover:text-foreground">SOLARIS case study</a></li>
            <li><a href="/#about" className="u-link text-muted-foreground hover:text-foreground">About</a></li>
            <li><a href="/#contact" className="u-link text-muted-foreground hover:text-foreground">Contact</a></li>
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="u-link text-muted-foreground hover:text-foreground">GitHub ↗</a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="u-link text-muted-foreground hover:text-foreground">LinkedIn ↗</a></li>
            <li><a href={`mailto:${site.email}`} className="u-link text-muted-foreground hover:text-foreground">{site.email}</a></li>
          </ul>
          <a href="#top" className="mt-6 inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
