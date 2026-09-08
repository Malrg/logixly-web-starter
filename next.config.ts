import type { NextConfig } from "next";

// Hardening HTTP básico y de bajo riesgo (auditoría de seguridad, fase A):
// solo cabeceras de defensa en profundidad que no cambian ningún
// comportamiento visible de la web ni requieren tocar la lógica de la app.
// Deliberadamente NO se incluye aquí (a la espera de una fase posterior,
// planificada y probada por separado):
// - Content-Security-Policy (requiere el patrón de nonce vía middleware
//   de Next.js para no romper los scripts inline de hidratación; se hará
//   primero en modo Report-Only).
// - Strict-Transport-Security adicional / includeSubDomains / preload:
//   ya existe en producción (max-age=63072000, confirmado por curl), y
//   ampliarlo es una decisión aparte, no reversible sin fricción.
// - Ninguna cabecera CORS (Access-Control-Allow-Origin, etc.): el
//   "Access-Control-Allow-Origin: *" visible en producción no lo añade
//   este proyecto (no hay ninguna configuración de CORS en next.config.ts,
//   vercel.json ni en el código) — ver el informe de auditoría para el
//   análisis de su origen probable.
const securityHeaders = [
  // Evita que el navegador intente adivinar el tipo de un recurso a partir
  // de su contenido en vez de respetar el Content-Type declarado.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No envía la URL completa de origen a otros orígenes; solo el origen
  // (esquema+dominio) en peticiones cross-origin, y la URL completa en
  // peticiones same-origin. Buen equilibrio entre analítica de referrer y
  // privacidad, y el valor recomendado por defecto en OWASP/MDN.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // La web no usa cámara, micrófono ni geolocalización desde ningún
  // componente: se deniegan explícitamente para todos los orígenes.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Protección contra clickjacking: impide que cualquier sitio embeba
  // esta web en un <iframe>. Es el equivalente clásico (mejor soportado
  // en navegadores antiguos) de "frame-ancestors 'none'", que se añadirá
  // también a la futura CSP sin necesidad de retirar esta cabecera.
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  // Deja de anunciar "X-Powered-By: Next.js" (activado por defecto por
  // Next.js): es información gratuita para un atacante sobre el stack
  // tecnológico exacto, sin ningún beneficio funcional.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
