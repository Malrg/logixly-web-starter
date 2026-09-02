import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Aviso legal", description: "Información legal sobre el titular del sitio y las condiciones de uso." };

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Aviso legal"
      description="Información sobre el titular de esta web y las condiciones generales de uso."
      sections={[
        {
          heading: "Titular del sitio",
          body: `${siteConfig.commercialName} — ${siteConfig.address}. Contacto: ${siteConfig.email}. Sustituye este apartado por la razón social, NIF/CIF y datos registrales reales del titular.`,
        },
        {
          heading: "Condiciones de uso",
          body: "Añade aquí las condiciones que regulan el acceso y uso del sitio web, incluyendo responsabilidades, propiedad intelectual y limitaciones de garantía.",
        },
        {
          heading: "Propiedad intelectual",
          body: "Especifica la titularidad de los contenidos, marcas, logotipos y código publicados en el sitio, y las condiciones bajo las que pueden reutilizarse.",
        },
        {
          heading: "Legislación aplicable",
          body: "Indica la legislación y jurisdicción aplicables en caso de controversia, conforme a la normativa vigente en tu país.",
        },
      ]}
    />
  );
}
