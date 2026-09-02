export const branding = {
  companyName: "Logixly Studio",
  logo: {
    src: "/logos/logo.svg",
    alt: "Logixly Studio",
    width: 160,
    height: 40,
  },
  colors: {
    primary: "#ff6b2c",
    primaryForeground: "#ffffff",
    secondary: "#111827",
    secondaryForeground: "#ffffff",
    accent: "#fff1eb",
  },
  typography: {
    sans: "Geist",
    display: "Manrope",
  },
  visualStyle: {
    radius: "1rem",
    density: "comfortable",
    tone: "premium, tecnológico y cercano",
  },
} as const;

export type Branding = typeof branding;
