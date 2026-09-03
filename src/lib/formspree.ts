import { services } from "@/config/services";
import type { ContactFormValues } from "@/lib/contact-schema";

/**
 * Nota de arquitectura: el formulario de contacto envía directamente desde
 * el navegador al endpoint público de Formspree, sin pasar por un endpoint
 * propio en servidor (no existe `/api/contact` en este proyecto).
 *
 * Esto es seguro porque el "Form ID" de Formspree no es un secreto: es el
 * mismo identificador que usaríais en el atributo `action` de un
 * `<form>` HTML plano sin JavaScript (así es como funciona Formspree por
 * diseño). No hay ninguna API key ni credencial que proteger en este envío,
 * así que un endpoint propio en servidor no añadiría seguridad — solo
 * latencia y complejidad extra. Formspree valida la petición en su lado
 * (comprueba que el Form ID exista y aplica sus propias reglas de spam),
 * así que la superficie de ataque es la misma que la de cualquier
 * formulario público de contacto.
 */

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

/** Título legible del servicio seleccionado, o el slug si no hay match (p. ej. "otro"). */
function serviceLabel(slug: string): string {
  if (slug === "otro") return "Otro / no lo sé todavía";
  return services.find((service) => service.slug === slug)?.title ?? slug;
}

export interface FormspreeResult {
  ok: boolean;
  message?: string;
}

const GENERIC_ERROR_MESSAGE = "No hemos podido enviar el mensaje. Inténtalo de nuevo en unos minutos.";
const MISSING_CONFIG_MESSAGE =
  "El formulario no está configurado todavía. Escríbenos directamente por email mientras lo solucionamos.";

/** Construye el payload que recibe Formspree, con nombres de campo claros. */
function buildPayload(data: ContactFormValues, pageUrl: string) {
  return {
    name: data.nombre,
    company: data.empresa?.trim() || undefined,
    email: data.email,
    phone: data.telefono?.trim() || undefined,
    service: serviceLabel(data.servicio),
    budget: data.presupuesto?.trim() || undefined,
    message: data.mensaje,
    source: "Logixly Studio Website",
    page_url: pageUrl,
    // Campos reservados de Formspree: _replyto activa "Responder" hacia el
    // email del visitante; _subject fija el asunto del email que llega a
    // llogixlystudio@gmail.com; _gotcha es el honeypot (ver contact-schema.ts).
    _replyto: data.email,
    _subject: `Nuevo contacto desde Logixly Studio — ${data.nombre}`,
    _gotcha: data._gotcha || undefined,
  };
}

/** Envía el formulario a Formspree. Nunca lanza: siempre resuelve con {ok, message?}. */
export async function submitToFormspree(data: ContactFormValues, pageUrl: string): Promise<FormspreeResult> {
  if (!FORM_ID) {
    console.error(
      "[formspree] Falta NEXT_PUBLIC_FORMSPREE_FORM_ID. Configúrala en .env.local / Vercel (ver .env.example).",
    );
    return { ok: false, message: MISSING_CONFIG_MESSAGE };
  }

  try {
    const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildPayload(data, pageUrl)),
    });

    if (response.ok) {
      return { ok: true };
    }

    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  } catch {
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}
