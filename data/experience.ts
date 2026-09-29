import type { EducationItem, ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "solaris-capstone",
    role: "[YOUR ROLE] — SOLARIS Capstone",
    organization: "[YOUR UNIVERSITY]",
    period: "[START] — Present",
    location: "[CITY]",
    summary:
      "Team capstone building a solar energy monitoring/management information system.",
    highlights: [
      "TODO: Add one concrete contribution (e.g. built dashboard UI, designed schema).",
      "TODO: Add one measurable outcome or demo milestone.",
    ],
    tags: ["Next.js", "TypeScript", "REST APIs"],
    kind: "Project",
  },
  {
    id: "placeholder-activity",
    role: "[ROLE / POSITION]",
    organization: "[ORGANIZATION / SCHOOL]",
    period: "[PERIOD]",
    summary: "TODO: Replace with internship, freelance, org, or coursework.",
    highlights: ["TODO: Add responsibility or achievement."],
    tags: ["TODO"],
    kind: "Activity",
  },
];

export const education: EducationItem[] = [
  {
    degree: "[YOUR DEGREE / PROGRAM]",
    school: "[YOUR UNIVERSITY]",
    period: "[START] — [END]",
    location: "[CITY, COUNTRY]",
    details: [
      "TODO: Add relevant coursework (e.g. Web Development, Databases, Capstone).",
      "TODO: Add honors, organizations, or certifications if applicable.",
    ],
  },
];
