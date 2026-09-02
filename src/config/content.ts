export const features = [
  { title: "Diseño que convierte", description: "Jerarquía visual, mensajes claros y llamadas a la acción pensadas para negocio.", icon: "Sparkles" },
  { title: "Rendimiento real", description: "Carga rápida, imágenes optimizadas y una base técnica preparada para Core Web Vitals.", icon: "Gauge" },
  { title: "Escalable y mantenible", description: "Componentes reutilizables y configuración centralizada para crecer sin rehacerlo todo.", icon: "Blocks" },
  { title: "Preparado para SEO", description: "Metadata, sitemap, robots y marcado semántico incluidos desde el inicio.", icon: "SearchCheck" },
] as const;

export const projects = [
  { title: "Nexa Clinic", category: "Salud · Web corporativa", result: "+42% solicitudes", gradient: "from-cyan-500/25 via-blue-500/10 to-transparent" },
  { title: "Arda Kitchen", category: "Restauración · Reservas", result: "2,1× conversión", gradient: "from-orange-500/30 via-amber-500/10 to-transparent" },
  { title: "Sentinel Ops", category: "Ciberseguridad · SaaS", result: "Lanzamiento en 6 semanas", gradient: "from-violet-500/25 via-indigo-500/10 to-transparent" },
] as const;

export const testimonials = [
  { quote: "Pasamos de una web que solo informaba a una herramienta comercial que genera contactos cada semana.", name: "Laura Martín", role: "Directora, Nexa Clinic" },
  { quote: "El sistema es muy fácil de adaptar. Pudimos lanzar una nueva línea de servicio sin rediseñar toda la web.", name: "Diego Santos", role: "CEO, Sentinel Ops" },
  { quote: "Rápidos, ordenados y con una visión de negocio que se nota en cada decisión de diseño.", name: "Marta Ruiz", role: "Fundadora, Arda Kitchen" },
] as const;

export const pricing = [
  { name: "Esencial", description: "Para profesionales y negocios locales.", price: "Desde 790 €", featured: false, features: ["Hasta 5 secciones", "Diseño responsive", "SEO esencial", "Formulario de contacto"] },
  { name: "Crecimiento", description: "Para empresas que quieren captar clientes.", price: "Desde 1.490 €", featured: true, features: ["Páginas personalizadas", "CMS o integraciones", "SEO avanzado", "Analítica y conversión"] },
  { name: "A medida", description: "Para productos y procesos complejos.", price: "Presupuesto", featured: false, features: ["Arquitectura personalizada", "Automatizaciones", "Integraciones API", "Soporte evolutivo"] },
] as const;

export const faqs = [
  { question: "¿Cuánto tarda un proyecto web?", answer: "Una web corporativa suele estar lista entre 3 y 6 semanas. El plazo final depende del alcance, los contenidos y las integraciones." },
  { question: "¿Puedo cambiar textos, colores y servicios?", answer: "Sí. La plantilla centraliza marca, datos del negocio y servicios en pocos archivos para que la personalización sea rápida y segura." },
  { question: "¿La web incluye SEO?", answer: "Incluye una base SEO técnica completa: metadata, Open Graph, sitemap, robots, estructura semántica y buenas prácticas de rendimiento." },
  { question: "¿Está preparada para Vercel?", answer: "Sí. El proyecto puede conectarse a Vercel directamente desde GitHub y utiliza la configuración recomendada para Next.js." },
] as const;
