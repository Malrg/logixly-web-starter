import { company } from "@/config/company";

// Metadata de sitio y SEO. Los datos de empresa (email, teléfono, WhatsApp,
// dominio) NO se definen aquí: se leen de `company` (src/config/company.ts),
// que es la única fuente de verdad para esos valores.
export const siteConfig = {
  name: company.companyName,
  commercialName: company.companyName,
  description:
    "Diseño web, automatización con IA y ciberseguridad para negocios que quieren vender más y trabajar mejor.",
  phone: company.phone,
  whatsapp: company.whatsappNumber,
  whatsappMessage: "Hola, quiero información sobre un proyecto con Logixly Studio.",
  email: company.email,
  address: company.location,
  domain: company.websiteUrl,
  socials: company.socials,
  seo: {
    title: "Logixly Studio | Estudio tecnológico en Madrid",
    titleTemplate: "%s | Logixly Studio",
    description:
      "Logixly Studio es un estudio tecnológico en Madrid especializado en desarrollo web, e-commerce, automatización con IA y ciberseguridad.",
    keywords: [
      "desarrollo web Madrid",
      "diseño web",
      "automatización con IA",
      "ciberseguridad",
      "e-commerce",
      "agencia tecnológica",
      "Next.js",
    ],
    locale: "es_ES",
    ogImage: "/opengraph-image",
  },
} as const;

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
] as const;

export type SiteConfig = typeof siteConfig;
