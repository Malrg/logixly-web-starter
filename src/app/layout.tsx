import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";

// Fuentes autoalojadas vía @fontsource (archivos locales en node_modules, sin
// peticiones a servicios externos ni en build ni en runtime). Pesos acotados
// a los realmente usados en la interfaz para minimizar el bundle de fuentes.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: siteConfig.seo.title, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.commercialName }],
  creator: siteConfig.commercialName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.domain,
    siteName: siteConfig.commercialName,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.commercialName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // El teléfono solo se incluye en los datos estructurados cuando existe
  // uno real configurado en company.phone; nunca se publica un valor vacío
  // o de ejemplo como "telephone" en el JSON-LD.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.commercialName,
    url: siteConfig.domain,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    description: siteConfig.seo.description,
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    // Solo se publican redes sociales con URL real configurada; sin cuentas
    // reales todavía, "sameAs" queda vacío en vez de apuntar a URLs genéricas.
    ...(Object.values(siteConfig.socials).filter(Boolean).length
      ? { sameAs: Object.values(siteConfig.socials).filter(Boolean) }
      : {}),
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-ring"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
