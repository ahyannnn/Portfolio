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
    src: "/images/solaris1.jpg",
    fallback: "/images/solaris-dashboard-placeholder.svg",
    alt: "SOLARIS administrative dashboard with stats and charts",
  },
  solarisReports: {
    src: "/images/solaris2.jpg",
    fallback: "/images/solaris-dashboard-placeholder.svg",
    alt: "SOLARIS reports view with client quotations",
  },
  solarisProjects: {
    src: "/images/solaris3.jpg",
    fallback: "/images/solaris-billing-placeholder.svg",
    alt: "SOLARIS projects table with client records and billing status",
  },
  solarisMobile: {
    src: "/images/solaris-mobile.png",
    fallback: "/images/solaris-mobile-placeholder.svg",
    alt: "SOLARIS companion mobile app",
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
