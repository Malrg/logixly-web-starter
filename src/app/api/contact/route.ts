import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/config/company";
import { siteConfig } from "@/config/site";
import { contactSchema, flattenContactErrors } from "@/lib/contact-schema";
import { buildContactEmailHtml, buildContactEmailSubject, buildContactEmailText } from "@/lib/contact-email";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

// Este endpoint envía el email real de contacto vía Resend. Solo corre en
// servidor: la API key nunca se expone al cliente (no usa el prefijo
// NEXT_PUBLIC_ y nunca se referencia desde código de cliente).
export const runtime = "nodejs";

// Mensajes genéricos que sí puede ver el visitante. Nunca se exponen aquí
// detalles internos (stack traces, mensajes de error de Resend, etc.).
const GENERIC_ERROR = {
  ok: false as const,
  message: "No hemos podido enviar el mensaje. Inténtalo de nuevo en unos minutos.",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Revisa los campos del formulario.", errors: flattenContactErrors(parsed.error) },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot: un visitante real nunca rellena este campo (está oculto e
  // inaccesible por teclado/lector de pantalla). Si llega con contenido,
  // respondemos "éxito" sin enviar nada, para no delatar el filtro al bot.
  if (data.sitioWeb) {
    return NextResponse.json({ ok: true });
  }

  const clientKey = getClientKey(request.headers);
  const { allowed } = checkRateLimit(clientKey);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Configuración incompleta en el servidor: no es un error del visitante.
    console.error("[api/contact] Falta la variable de entorno RESEND_API_KEY.");
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }

  const meta = {
    sentAt: new Intl.DateTimeFormat("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    }).format(new Date()),
    sourceUrl: `${siteConfig.domain}/contacto`,
  };

  // Remitente: mientras no haya un dominio propio verificado en Resend, se
  // usa el dominio de pruebas onboarding@resend.dev (ver RESEND_FROM_EMAIL
  // en .env.example para el detalle de esta limitación).
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "Logixly Studio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: company.email,
      replyTo: data.email,
      subject: buildContactEmailSubject(data),
      html: buildContactEmailHtml(data, meta),
      text: buildContactEmailText(data, meta),
    });

    if (error) {
      console.error("[api/contact] Error de Resend:", error.name, error.message);
      return NextResponse.json(GENERIC_ERROR, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Error inesperado enviando el email:", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}
