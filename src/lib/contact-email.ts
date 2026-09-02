import type { ContactFormValues } from "@/lib/contact-schema";
import { services } from "@/config/services";

export interface ContactEmailMeta {
  /** Fecha/hora de envío, ya formateada para mostrar (zona horaria de Madrid). */
  sentAt: string;
  /** URL de origen del formulario (la página de contacto), para contexto. */
  sourceUrl: string;
}

/** Título legible del servicio seleccionado, o el slug si no hay match (p. ej. "otro"). */
function serviceLabel(slug: string): string {
  if (slug === "otro") return "Otro / no lo sabe todavía";
  return services.find((service) => service.slug === slug)?.title ?? slug;
}

/**
 * Escapa HTML básico para evitar que un dato introducido por el visitante
 * (nombre, mensaje, etc.) rompa la maquetación del email o inyecte marcado
 * en el cuerpo del correo que recibimos en llogixlystudio@gmail.com.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Convierte saltos de línea del mensaje en <br> tras escapar el HTML. */
function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

type Row = { label: string; value: string };

function buildRows(data: ContactFormValues): Row[] {
  const rows: Row[] = [
    { label: "Nombre", value: data.nombre },
    { label: "Empresa", value: data.empresa?.trim() || "—" },
    { label: "Email", value: data.email },
    { label: "Teléfono", value: data.telefono?.trim() || "—" },
    { label: "Servicio", value: serviceLabel(data.servicio) },
    { label: "Presupuesto", value: data.presupuesto?.trim() || "—" },
  ];
  return rows;
}

export function buildContactEmailSubject(data: ContactFormValues): string {
  return `Nuevo contacto desde Logixly Studio — ${data.nombre}`;
}

export function buildContactEmailHtml(data: ContactFormValues, meta: ContactEmailMeta): string {
  const rows = buildRows(data);
  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #2a2a33;color:#a1a1aa;font-size:13px;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #2a2a33;color:#f4f4f5;font-size:14px;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:32px 16px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#0d0d12;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:28px 24px;background:linear-gradient(135deg,#ff6b2c,#ff8a4c);">
          <p style="margin:0;color:#17100a;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Logixly Studio</p>
          <h1 style="margin:6px 0 0;color:#17100a;font-size:20px;font-weight:700;">Nuevo contacto — Logixly Studio</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rowsHtml}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 8px;color:#a1a1aa;font-size:13px;font-weight:600;">Mensaje</p>
          <p style="margin:0;color:#f4f4f5;font-size:14px;line-height:1.6;white-space:pre-line;">${escapeHtmlMultiline(data.mensaje)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #2a2a33;">
          <p style="margin:0;color:#71717a;font-size:12px;line-height:1.6;">
            Enviado el ${escapeHtml(meta.sentAt)} desde ${escapeHtml(meta.sourceUrl)}.<br />
            Puedes responder directamente a este email: se enviará a ${escapeHtml(data.email)}.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildContactEmailText(data: ContactFormValues, meta: ContactEmailMeta): string {
  const rows = buildRows(data);
  const lines = [
    "NUEVO CONTACTO — LOGIXLY STUDIO",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Mensaje:",
    data.mensaje,
    "",
    `Enviado el ${meta.sentAt} desde ${meta.sourceUrl}.`,
    `Responder a: ${data.email}`,
  ];
  return lines.join("\n");
}
