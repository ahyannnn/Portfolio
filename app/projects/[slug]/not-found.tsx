import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        Project not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        This project does not exist or was removed.
      </p>
      <Link
        href="/#projects"
        className="mt-6 inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Back to projects
      </Link>
    </div>
  );
}
