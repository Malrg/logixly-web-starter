/**
 * Fuente única de verdad para los datos corporativos de Logixly Studio.
 *
 * Cambia el email, el teléfono, el número de WhatsApp o el dominio SOLO
 * aquí: el resto de la web (Contacto, Footer, metadata, datos
 * estructurados, mailto, botón de WhatsApp, páginas legales...) lee estos
 * valores desde este archivo, así que un único cambio se propaga a toda
 * la aplicación sin tocar componentes.
 *
 * - `phone` y `whatsappNumber` se dejan vacíos a propósito: no hay un
 *   teléfono ni un WhatsApp real todavía. Mientras estén vacíos, la web
 *   no muestra ni el teléfono ni el botón flotante de WhatsApp. En cuanto
 *   haya un número real, basta con rellenarlos aquí.
 * - `websiteUrl` es el dominio definitivo y canónico del sitio. Un cambio
 *   aquí se propaga automáticamente a metadata/canonical/Open Graph/
 *   sitemap/robots/JSON-LD sin tocar ningún otro archivo.
 * - `email` usa hoy la cuenta de Gmail indicada. El día que exista un
 *   correo con dominio propio (p. ej. hola@logixlystudio.com) también
 *   basta con cambiarlo aquí.
 * - `socials.*` se dejan vacíos a propósito: hasta no tener las cuentas
 *   reales de Instagram, LinkedIn y GitHub de Logixly Studio, no se
 *   publican enlaces genéricos ni de ejemplo. Mientras estén vacíos, el
 *   Footer no renderiza el icono correspondiente. Rellena solo la cuenta
 *   que exista realmente.
 */
export interface CompanySocials {
  instagram: string;
  linkedin: string;
  github: string;
}

export interface Company {
  companyName: string;
  email: string;
  location: string;
  /** Vacío = sin teléfono real todavía; oculta el teléfono en toda la web. */
  phone: string;
  /** Vacío = sin WhatsApp real todavía; oculta el botón flotante. */
  whatsappNumber: string;
  websiteUrl: string;
  /** Vacías = sin cuenta real todavía; oculta el icono correspondiente. */
  socials: CompanySocials;
}

// Nota: se tipa explícitamente como `Company` (en vez de `as const`) para que
// `phone` y `whatsappNumber` sean `string` y no el tipo literal `""`, que
// haría que TypeScript estrechara a `never` cualquier rama truthy como
// `{siteConfig.phone && (...)}` en los componentes que los consumen.
export const company: Company = {
  companyName: "Logixly Studio",
  email: "llogixlystudio@gmail.com",
  location: "Madrid, España",
  phone: "",
  whatsappNumber: "",
  websiteUrl: "https://logixlystudio.com",
  socials: {
    instagram: "",
    linkedin: "",
    github: "",
  },
};
