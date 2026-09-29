import type { Project } from "@/types";

/**
 * Add new projects here — they automatically appear in the grid
 * and get a detail page at /projects/[slug].
 *
 * TODO (owner): fill in SOLARIS details below. Do not invent specs —
 * leave a field empty / remove the link if it is not ready yet.
 */
export const projects: Project[] = [
  {
    slug: "solaris",
    name: "SOLARIS",
    tagline: "Solar energy monitoring / management information system.",
    description:
      "IT capstone project for monitoring and managing solar energy data. Built as a team project with a focus on clean data presentation and practical reporting.",
    details: [
      "SOLARIS is an IT capstone information system for solar energy monitoring and management.",
      "TODO: Add 1–2 sentences about the problem it solves and who it is for.",
      "TODO: Add your specific role and contributions (e.g. frontend, API integration, database design).",
      "TODO: List the real stack used (e.g. Next.js, REST API, MySQL/PostgreSQL) only once confirmed.",
    ],
    technologies: ["Next.js", "TypeScript", "REST APIs", "MySQL"],
    type: "Capstone",
    featured: true,
    // TODO: Replace with the real repository URL, or remove if private.
    githubUrl: "https://github.com/[YOUR GITHUB]/solaris",
    // TODO: Add live demo URL when available, otherwise omit.
    // liveUrl: "https://solaris.example.com",
    // TODO: Add a screenshot to /public/projects/solaris.png and uncomment:
    // image: "/projects/solaris.png",
    // imageAlt: "SOLARIS dashboard showing solar monitoring data",
    year: "[YEAR]",
    role: "[YOUR ROLE — e.g. Frontend Developer]",
    status: "In Progress",
  },
  {
    slug: "portfolio",
    name: "Developer Portfolio",
    tagline: "This site — minimal Next.js portfolio with dark mode.",
    description:
      "Responsive single-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Motion. Deployed on Cloudflare.",
    details: [
      "Single-page layout with anchor navigation plus reusable project detail pages.",
      "Intentional light/dark color system with system-preference default.",
      "Structured content in TypeScript data files for easy updates.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "Personal",
    githubUrl: "https://github.com/[YOUR GITHUB]",
    year: "2026",
    role: "Designer & Developer",
    status: "In Progress",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured) ?? projects[0];
}
