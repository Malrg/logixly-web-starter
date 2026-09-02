import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookies", description: "Información sobre el uso de cookies en esta web." };

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de cookies"
      description="Qué cookies se utilizan en esta web y cómo puedes gestionarlas."
      sections={[
        {
          heading: "Qué son las cookies",
          body: "Explica brevemente qué son las cookies y tecnologías similares, y con qué finalidad se utilizan en el sitio.",
        },
        {
          heading: "Cookies utilizadas",
          body: "Enumera las cookies propias y de terceros realmente instaladas (preferencia de tema claro/oscuro, analítica, marketing, etc.) junto con su finalidad y duración.",
        },
        {
          heading: "Gestión de preferencias",
          body: "Indica cómo la persona usuaria puede aceptar, rechazar o configurar las cookies, y cómo eliminarlas desde su navegador.",
        },
      ]}
    />
  );
}
