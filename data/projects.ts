import type { Project } from "@/types";

/**
 * Add new projects here — they automatically appear in the work index
 * and get a detail page at /projects/[slug].
 *
 * Images: drop real files into public/images/ (see README there).
 * Until then the showcase falls back to the *-placeholder.svg diagrams.
 */
export const projects: Project[] = [
  {
    slug: "solaris",
    name: "SOLARIS",
    tagline: "Booking and billing system for solar projects.",
    description:
      "Team capstone for booking and billing solar projects, with a companion mobile app. I designed the backend architecture and database structure — server-side logic, REST APIs, and data flow across web, database, and the Flutter app.",
    details: [
      "SOLARIS is a booking and billing system for solar projects, built as a team capstone.",
      "Designed and implemented the backend architecture and database structure, including server-side logic, API endpoints, and data processing.",
      "Established the system infrastructure and communication between the web application, backend services, database, and Flutter companion application.",
      "Handled system-level testing, debugging, integration, and technical implementation of core functionality.",
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
    image: "/images/solaris1.jpg",
    imageAlt: "SOLARIS administrative dashboard with stats and charts",
    fallbackImage: "/images/solaris-dashboard-placeholder.svg",
    gallery: [
      {
        src: "/images/solaris1.jpg",
        alt: "SOLARIS administrative dashboard with stats and charts",
      },
      {
        src: "/images/solaris3.jpg",
        alt: "SOLARIS projects table with client records and billing status",
      },
      {
        src: "/images/solaris2.jpg",
        alt: "SOLARIS reports view with client quotations",
      },
    ],
    role: "Backend Developer & System Architect",
    status: "In Progress",
    year: "2025 — 2026",
  },
  {
    slug: "rentahanan",
    name: "Rentahanan",
    tagline: "Apartment application and billing system.",
    description:
      "Third-year school project — a web system for apartment applications and billing. I designed the Flask backend architecture and MySQL database, from server logic to frontend integration.",
    details: [
      "School project built in third year for apartment applications and billing.",
      "Designed and implemented the backend architecture using Flask and MySQL, including server-side logic, database structure, and API endpoints.",
      "Handled data processing, frontend-backend integration, and the overall technical infrastructure of the system.",
      "Covered backend testing, debugging, and system-level integration.",
    ],
    technologies: ["React", "Flask", "MySQL", "REST APIs"],
    type: "Coursework",
    githubUrl: "https://github.com/ahyannnn/Rentahanan",
    image: "/images/rentahanan1.png",
    imageAlt: "RenTahanan landing page — Discover Your New Home",
    fallbackImage: "/images/project-rentahanan-placeholder.svg",
    gallery: [
      {
        src: "/images/rentahanan1.png",
        alt: "RenTahanan landing page — Discover Your New Home",
      },
      {
        src: "/images/rentahanan2.png",
        alt: "RenTahanan password reset screen",
      },
      {
        src: "/images/rentahanan3.png",
        alt: "RenTahanan registration form with personal information fields",
      },
    ],
    year: "2025",
    role: "Developer",
    status: "Completed",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured) ?? projects[0];
}
