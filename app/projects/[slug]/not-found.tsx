import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        404 — Index
      </p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">Project not found.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This project does not exist or was removed.
      </p>
      <Link
        href="/#work"
        className="mt-8 inline-flex h-11 items-center bg-foreground px-6 text-sm font-medium text-background"
      >
        Back to work index
      </Link>
    </div>
  );
}
