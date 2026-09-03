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
// quitar ese flag hasta sustituir el caso por uno real. `preview` selecciona
// la mini-interfaz ficticia (solo HTML/CSS, sin imágenes) que ilustra la
// tarjeta — ver src/components/portfolio-previews.tsx.
export const projects = [
  {
    title: "Web corporativa para clínica de salud",
    category: "Salud · Web corporativa",
    objective: "Más solicitudes de cita online",
    tech: ["Next.js", "Tailwind CSS", "Formulario de contacto"],
    gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
    preview: "clinic",
    placeholder: true,
  },
  {
    title: "Sistema de reservas para restaurante",
    category: "Restauración · Reservas",
    objective: "Aumentar reservas desde la web",
    tech: ["Next.js", "Integración de reservas", "SEO local"],
    gradient: "from-orange-500/30 via-amber-500/10 to-transparent",
    preview: "restaurant",
    placeholder: true,
  },
  {
    title: "Lanzamiento seguro de SaaS de ciberseguridad",
    category: "Ciberseguridad · SaaS",
    objective: "Lanzamiento rápido y seguro",
    tech: ["Next.js", "TypeScript", "Hardening"],
    gradient: "from-violet-500/25 via-indigo-500/10 to-transparent",
    preview: "saas",
    placeholder: true,
  },
] as const;

// Testimonios ilustrativos (no son reseñas reales de clientes). `placeholder:
// true` hace que la UI (Testimonials) siempre muestre la etiqueta "Reseña
// ilustrativa" y la nota de aviso — no quitar ese flag hasta sustituir cada
// caso por una reseña real.
export const testimonials = [
  {
    quote:
      "Necesitábamos una web profesional que transmitiera confianza desde el primer momento. El resultado fue claro, moderno y muy fácil de presentar a nuestros clientes.",
    name: "Laura Martínez",
    role: "Directora · Clínica Nova Salud",
    placeholder: true,
  },
  {
    quote:
      "La nueva experiencia de reservas nos ayudó a ordenar mejor la atención y a dar una imagen mucho más profesional del restaurante. El proceso fue claro y ágil.",
    name: "Carlos Romero",
    role: "Gerente · Restaurante Brasa 21",
    placeholder: true,
  },
  {
    quote:
      "Buscábamos una base sólida para lanzar un producto digital con una imagen más técnica y segura. La propuesta consiguió equilibrio entre diseño, claridad y credibilidad.",
    name: "Andrea Gil",
    role: "Co-founder · SecureOps Cloud",
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
