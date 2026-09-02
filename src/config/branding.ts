export const branding = {
  companyName: "Logixly Studio",
  logo: {
    src: "/logos/logo.svg",
    alt: "Logixly Studio",
    width: 160,
    height: 40,
  },
  colors: {
    brand: "#ff6b2c",
    primary: "#c2410c",
    primaryForeground: "#ffffff",
    secondary: "#0b0b10",
    secondaryForeground: "#ffffff",
    accent: "#fff1eb",
  },
  typography: {
    sans: "Inter",
    display: "Manrope",
  },
  visualStyle: {
    radius: "1rem",
    density: "comfortable",
    tone: "premium, tecnológico y cercano",
  },
} as const;

export type Branding = typeof branding;
