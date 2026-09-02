import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: siteConfig.seo.title, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.commercialName }],
  creator: siteConfig.commercialName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: siteConfig.seo.locale, url: siteConfig.domain, siteName: siteConfig.commercialName, title: siteConfig.seo.title, description: siteConfig.seo.description, images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.commercialName }] },
  twitter: { card: "summary_large_image", title: siteConfig.seo.title, description: siteConfig.seo.description, images: [siteConfig.seo.ogImage] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#09090b" }] };

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.commercialName, url: siteConfig.domain, email: siteConfig.email, telephone: siteConfig.phone, address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" } };
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2">Saltar al contenido</a>
          <Navbar /><main id="contenido">{children}</main><Footer /><WhatsAppButton />
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
