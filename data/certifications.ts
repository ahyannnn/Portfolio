import type { Badge, Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner-essentials",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Skill Builder",
    date: "Nov 5, 2025",
    meta: "11 modules · 12h 45m",
    description:
      "In today’s digital-first world, understanding the cloud has become an essential skill for a wide range of careers. Whether you're stepping into cloud for the first time, leading IT teams, or expanding your technical expertise, knowledge of cloud is essential to innovate and scale. This course covers the fundamentals of AWS services, pricing, security, monitoring, and architecture.",
    pdfHref: "/certificates/aws-cloud-practitioner-essentials.pdf",
    previewSrc: "/certificates/aws-cloud-practitioner-essentials-preview.png",
    previewAlt: "AWS Cloud Practitioner Essentials certificate preview",
  },
];

export const badges: Badge[] = [
  {
    id: "intro-generative-ai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud Skills Boost",
  },
  {
    id: "intro-large-language-models",
    title: "Introduction to Large Language Models",
    issuer: "Google Cloud Skills Boost",
  },
  {
    id: "intro-responsible-ai",
    title: "Introduction to Responsible AI",
    issuer: "Google Cloud Skills Boost",
  },
  {
    id: "prompt-design-vertex-ai",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
  },
  {
    id: "applying-ai-principles-gc",
    title: "Applying AI Principles with Google Cloud",
    issuer: "Google Cloud Skills Boost",
  },
];
