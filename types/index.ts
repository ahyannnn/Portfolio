export type ProjectType =
  | "Capstone"
  | "Coursework"
  | "Personal"
  | "Freelance"
  | "Open Source";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Long-form detail shown on /projects/[slug]. Keep concise. */
  details: string[];
  technologies: string[];
  type: ProjectType;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  /** Path under /public, e.g. /projects/solaris.png */
  image?: string;
  imageAlt?: string;
  /** Checked-in placeholder diagram shown if a real shot is missing. */
  fallbackImage?: string;
  /** Additional screenshots rendered as a gallery on /projects/[slug]. */
  gallery?: { src: string; alt: string }[];
  year?: string;
  role?: string;
  status?: "Completed" | "In Progress" | "Archived";
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  kind: "Internship" | "Project" | "Freelance" | "Organization" | "Activity";
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  location?: string;
  details: string[];
}
