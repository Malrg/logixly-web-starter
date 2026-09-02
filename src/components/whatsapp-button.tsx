import { MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * El botón flotante solo se muestra cuando hay un número real configurado
 * en `company.whatsappNumber` (src/config/company.ts). Mientras esté
 * vacío, no renderiza nada: nunca se ofrece un WhatsApp falso o de ejemplo.
 */
export function WhatsAppButton() {
  if (!company.whatsappNumber) return null;

  return (
    <a
      href={whatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-1 hover:bg-emerald-600"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
