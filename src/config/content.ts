export const differentiators = [
  { title: "Soluciones a medida", description: "Cada proyecto parte de tu negocio real: tus objetivos, tu sector y tus clientes, no de un molde genérico.", icon: "Puzzle" },
  { title: "Tecnología moderna", description: "Next.js, React y TypeScript: la misma base que usan los productos digitales más rápidos.", icon: "Cpu" },
  { title: "Seguridad desde el diseño", description: "Buenas prácticas de hardening y privacidad integradas desde la arquitectura, no añadidas al final.", icon: "ShieldCheck" },
  { title: "Automatización inteligente", description: "Conectamos formularios, procesos e IA para reducir el trabajo manual de tu equipo.", icon: "Bot" },
  { title: "Optimización de procesos", description: "Analizamos cómo trabajas hoy y simplificamos lo que sobra antes de escribir código.", icon: "Gauge" },
  { title: "Acompañamiento técnico", description: "Seguimos disponibles después del lanzamiento para evolucionar la web contigo.", icon: "LifeBuoy" },
] as const;

// TODO(contenido real): sustituir estos 3 casos por proyectos reales de
// Logixly Studio en cuanto existan. Ningún dato de aquí abajo (título,
// sector, objetivo) corresponde a un cliente real: son casos conceptuales
// que ilustran el tipo de trabajo que hacemos. `placeholder: true` hace que
// la UI (Portfolio) siempre muestre la etiqueta "Proyecto de ejemplo" — no
// quitar ese flag hasta sustituir el caso por uno real.
export const projects = [
  {
    title: "Web corporativa para clínica de salud",
    category: "Salud · Web corporativa",
    objective: "Objetivo ilustrativo: más solicitudes de cita online",
    tech: ["Next.js", "Tailwind CSS", "Formulario de contacto"],
    gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
    placeholder: true,
  },
  {
    title: "Sistema de reservas para restaurante",
    category: "Restauración · Reservas",
    objective: "Objetivo ilustrativo: aumentar reservas desde la web",
    tech: ["Next.js", "Integración de reservas", "SEO local"],
    gradient: "from-orange-500/30 via-amber-500/10 to-transparent",
    placeholder: true,
  },
  {
    title: "Lanzamiento seguro de SaaS de ciberseguridad",
    category: "Ciberseguridad · SaaS",
    objective: "Objetivo ilustrativo: lanzamiento rápido y seguro",
    tech: ["Next.js", "TypeScript", "Hardening"],
    gradient: "from-violet-500/25 via-indigo-500/10 to-transparent",
    placeholder: true,
  },
] as const;

// Testimonios de ejemplo. Sustituye por reseñas reales de clientes: no
// publiques estos textos como si fueran opiniones verdaderas.
export const testimonials = [
  {
    quote: "Espacio reservado para una reseña real de un cliente de servicios profesionales.",
    name: "Nombre del cliente",
    role: "Cargo · Empresa (pendiente)",
    placeholder: true,
  },
  {
    quote: "Espacio reservado para una reseña real de un cliente de e-commerce.",
    name: "Nombre del cliente",
    role: "Cargo · Empresa (pendiente)",
    placeholder: true,
  },
  {
    quote: "Espacio reservado para una reseña real de un cliente de automatización o IA.",
    name: "Nombre del cliente",
    role: "Cargo · Empresa (pendiente)",
    placeholder: true,
  },
] as const;

export const pricing = [
  { name: "Esencial", description: "Para profesionales y negocios locales.", price: "Desde 790 €", featured: false, features: ["Hasta 5 secciones", "Diseño responsive", "SEO esencial", "Formulario de contacto"] },
  { name: "Crecimiento", description: "Para empresas que quieren captar clientes.", price: "Desde 1.490 €", featured: true, features: ["Páginas personalizadas", "CMS o integraciones", "SEO avanzado", "Analítica y conversión"] },
  { name: "A medida", description: "Para productos y procesos complejos.", price: "Presupuesto", featured: false, features: ["Arquitectura personalizada", "Automatizaciones", "Integraciones API", "Soporte evolutivo"] },
] as const;

export const process = [
  { step: "01", title: "Descubrimiento", description: "Entendemos tu negocio, tu público y lo que necesita tu web para vender.", icon: "Search" },
  { step: "02", title: "Estrategia", description: "Definimos alcance, contenidos y prioridades técnicas antes de diseñar nada.", icon: "Compass" },
  { step: "03", title: "Diseño", description: "Prototipamos la identidad visual y validamos la jerarquía de cada sección.", icon: "PenTool" },
  { step: "04", title: "Desarrollo", description: "Construimos con Next.js y componentes reutilizables, con revisiones continuas.", icon: "Code2" },
  { step: "05", title: "Lanzamiento", description: "Desplegamos en Vercel con SEO, analítica y checklist de calidad superados.", icon: "Rocket" },
  { step: "06", title: "Optimización", description: "Medimos, ajustamos y mejoramos la conversión con datos reales de uso.", icon: "TrendingUp" },
] as const;

export const faqs = [
  { question: "¿Cuánto tarda un proyecto web?", answer: "Una web corporativa suele estar lista entre 3 y 6 semanas. El plazo final depende del alcance, los contenidos y las integraciones." },
  { question: "¿Puedo pedir cambios después del lanzamiento?", answer: "Sí. Cada proyecto incluye una fase de ajustes tras el lanzamiento y, a partir de ahí, podemos seguir colaborando en actualizaciones de contenido, diseño o nuevas funcionalidades cuando las necesites." },
  { question: "¿La web incluye SEO?", answer: "Incluye una base SEO técnica completa: metadata, Open Graph, sitemap, robots, estructura semántica y buenas prácticas de rendimiento." },
  { question: "¿Dónde se aloja mi web?", answer: "Desplegamos sobre infraestructura moderna (Vercel), lo que da tiempos de carga rápidos y alta disponibilidad sin que tengas que gestionar servidores ni mantenimiento técnico." },
] as const;
