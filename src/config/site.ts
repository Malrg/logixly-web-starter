export const siteConfig = {
  name: "Logixly Web Starter",
  commercialName: "Logixly Studio",
  description:
    "Diseñamos experiencias web rápidas, elegantes y orientadas a convertir visitas en clientes.",
  phone: "+34 600 000 000",
  whatsapp: "+34 600 000 000",
  whatsappMessage: "Hola, quiero información sobre una página web.",
  email: "hola@logixlystudio.com",
  address: "Madrid, España",
  domain: "https://example.com",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/Malrg",
  },
  seo: {
    title: "Logixly Studio | Diseño web y tecnología",
    titleTemplate: "%s | Logixly Studio",
    description:
      "Webs profesionales, rápidas y preparadas para hacer crecer tu negocio.",
    keywords: [
      "diseño web",
      "desarrollo web",
      "Next.js",
      "páginas web profesionales",
      "Madrid",
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
