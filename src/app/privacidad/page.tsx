import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacidad", description: "Política de privacidad y tratamiento de datos personales." };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      description="Cómo se recogen, usan y protegen los datos personales enviados a través de esta web."
      sections={[
        {
          heading: "Responsable del tratamiento",
          body: `${siteConfig.commercialName} — ${siteConfig.email}. Añade aquí la identidad completa y los datos de contacto del responsable, conforme al RGPD u otra normativa aplicable.`,
        },
        {
          heading: "Datos que se recogen",
          body: "Detalla qué datos se recogen a través del formulario de contacto (nombre, email, teléfono, empresa, mensaje) y con qué finalidad se tratan.",
        },
        {
          heading: "Base legal y conservación",
          body: "Especifica la base legal del tratamiento (consentimiento, interés legítimo) y el periodo durante el que se conservarán los datos.",
        },
        {
          heading: "Derechos de la persona usuaria",
          body: "Explica cómo ejercer los derechos de acceso, rectificación, supresión, oposición y portabilidad sobre los datos personales.",
        },
      ]}
    />
  );
}
