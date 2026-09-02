export type ServiceIcon = "LayoutTemplate" | "ShoppingBag" | "Workflow" | "ShieldCheck";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  cta: string;
  href: string;
  highlights: readonly string[];
};

export const services: readonly Service[] = [
  {
    title: "Webs corporativas",
    description: "Una presencia digital sólida, rápida y diseñada para generar confianza desde el primer vistazo.",
    icon: "LayoutTemplate",
    cta: "Ver solución",
    href: "/contacto?servicio=web-corporativa",
    highlights: ["Diseño responsive", "SEO técnico", "Edición sencilla"],
  },
  {
    title: "E-commerce",
    description: "Tiendas online claras y fluidas que convierten el catálogo de tu negocio en una experiencia de compra.",
    icon: "ShoppingBag",
    cta: "Vender online",
    href: "/contacto?servicio=ecommerce",
    highlights: ["Catálogo escalable", "Pagos seguros", "Analítica"],
  },
  {
    title: "Automatización",
    description: "Conectamos formularios, procesos e IA para que tu equipo dedique tiempo a lo que realmente importa.",
    icon: "Workflow",
    cta: "Automatizar procesos",
    href: "/contacto?servicio=automatizacion",
    highlights: ["Integraciones", "Agentes de IA", "Menos tareas manuales"],
  },
  {
    title: "Ciberseguridad",
    description: "Buenas prácticas de seguridad integradas desde la arquitectura hasta la puesta en producción.",
    icon: "ShieldCheck",
    cta: "Proteger mi proyecto",
    href: "/contacto?servicio=ciberseguridad",
    highlights: ["Hardening", "Privacidad", "Despliegue seguro"],
  },
] as const;
