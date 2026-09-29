import type { Project } from "@/types";

/**
 * Add new projects here — they automatically appear in the grid
 * and get a detail page at /projects/[slug].
 */
export const projects: Project[] = [
  {
    slug: "solaris",
    name: "SOLARIS",
    tagline: "Booking and billing system for solar projects.",
    description:
      "Team capstone project for booking and billing solar projects, with a companion mobile app. I work on the backend — APIs and data handling for bookings, billing, and project records.",
    details: [
      "SOLARIS is a booking and billing system for solar projects, built as a team capstone.",
      "Web client built with the MERN stack (MongoDB, Express.js, React, Node.js) exposing REST APIs.",
      "Companion mobile app built with Flutter.",
      "My role: backend developer — API endpoints and data handling for bookings, billing, and project records.",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Flutter",
      "REST APIs",
    ],
    type: "Capstone",
    featured: true,
    githubUrl: "https://github.com/ahyannnn/Solaris",
    liveUrl: "https://solarisiot.com",
    // TODO: Add a screenshot to /public/projects/solaris.png and uncomment:
    // image: "/projects/solaris.png",
    // imageAlt: "SOLARIS booking and billing dashboard",
    role: "Backend Developer",
    status: "In Progress",
  },
  {
    slug: "rentahanan",
    name: "Rentahanan",
    tagline: "Apartment application and billing system.",
    description:
      "Third-year school project — a web system for apartment applications and billing, covering tenant applications and billing records.",
    details: [
      "School project built in third year for apartment applications and billing.",
      "Handles tenant applications and billing records for apartment management.",
      "TODO: Add the real stack and your specific contributions once confirmed.",
    ],
    technologies: ["REST APIs"],
    type: "Coursework",
    githubUrl: "https://github.com/ahyannnn/Rentahanan",
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
    githubUrl: "https://github.com/ahyannnn",
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
