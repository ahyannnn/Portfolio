/**
 * Central image manifest.
 * `src` is the real photo/screenshot in public/images/.
 * `fallback` is the checked-in diagram placeholder — shown automatically
 * when `src` is missing (see ProjectScreenshot onError handling).
 */
export const images = {
  profile: {
    src: "/images/profile.png",
    fallback: "/images/profile-placeholder.svg",
    alt: "Portrait of Ian George Sanico",
  },
  solarisDashboard: {
    src: "/images/solaris-hero.png",
    fallback: "/images/solaris-dashboard-placeholder.svg",
    alt: "SOLARIS homepage overview — live platform",
  },
  solarisAdmin: {
    src: "/images/solaris-admin.png",
    fallback: "/images/solaris-dashboard-placeholder.svg",
    alt: "SOLARIS admin dashboard",
  },
  solarisReports: {
    src: "/images/solaris-admin-schedule.png",
    fallback: "/images/solaris-dashboard-placeholder.svg",
    alt: "SOLARIS admin scheduling view",
  },
  solarisProjects: {
    src: "/images/solaris-admin-project.png",
    fallback: "/images/solaris-billing-placeholder.svg",
    alt: "SOLARIS admin project records with billing status",
  },
  solarisIot: {
    src: "/images/solaris-admin-iotdevice.png",
    fallback: "/images/solaris-billing-placeholder.svg",
    alt: "SOLARIS admin IoT devices view",
  },
  solarisMobile1: {
    src: "/images/solaris-mobile-1.jpg",
    fallback: "/images/solaris-mobile-placeholder.svg",
    alt: "SOLARIS mobile — companion app view 1",
  },
  solarisMobile2: {
    src: "/images/solaris-mobile-2.jpg",
    fallback: "/images/solaris-mobile-placeholder.svg",
    alt: "SOLARIS mobile — companion app view 2",
  },
  solarisMobile3: {
    src: "/images/solaris-mobile-3.jpg",
    fallback: "/images/solaris-mobile-placeholder.svg",
    alt: "SOLARIS mobile — companion app view 3",
  },
  solarisBilling: {
    src: "/images/solaris-billing.png",
    fallback: "/images/solaris-billing-placeholder.svg",
    alt: "SOLARIS billing record view",
  },
  rentahanan: {
    src: "/images/rentahanan1.png",
    fallback: "/images/project-rentahanan-placeholder.svg",
    alt: "RenTahanan landing page — Discover Your New Home",
  },
  rentahananAuth: {
    src: "/images/rentahanan2.png",
    fallback: "/images/project-rentahanan-placeholder.svg",
    alt: "RenTahanan password reset screen",
  },
  rentahananRegister: {
    src: "/images/rentahanan3.png",
    fallback: "/images/project-rentahanan-placeholder.svg",
    alt: "RenTahanan registration form with personal information fields",
  },
  portfolio: {
    src: "/images/project-portfolio.png",
    fallback: "/images/project-portfolio-placeholder.svg",
    alt: "Project screenshot",
  },
} as const;

export type ImageSlot = keyof typeof images;
