import { z } from "zod";
import { services } from "@/config/services";

/**
 * Fuente única de verdad para las reglas del formulario de contacto.
 * La usa el formulario en cliente (src/components/contact.tsx) para validar
 * antes de enviar el envío a Formspree (src/lib/formspree.ts). El envío en
 * sí ocurre directamente desde el navegador: no hay endpoint propio en
 * servidor para este formulario (ver la nota de arquitectura en
 * formspree.ts), así que esta es la única capa de validación que controla
 * este proyecto — Formspree aplica además sus propias validaciones de
 * servidor (campos requeridos y formato de email según la configuración
 * del formulario en su panel).
 */

// Valores válidos de "Servicio": los slugs reales de src/config/services.ts
// más la opción "otro" que ya existía en el select del formulario.
export const SERVICE_VALUES = [...services.map((service) => service.slug), "otro"] as const;

// Opciones de presupuesto aproximado. Vive aquí (en vez de duplicada dentro
// del componente) para que el servidor pueda validar contra la misma lista.
export const BUDGET_OPTIONS = [
  "Menos de 800 €",
  "800 € – 1.500 €",
  "1.500 € – 3.000 €",
  "Más de 3.000 €",
  "Aún no lo sé",
] as const;

// Teléfono: opcional, pero si se informa se sanea y se limita a caracteres
// propios de un número de teléfono (dígitos, espacios, +, guiones y
// paréntesis) para evitar inyecciones de texto libre en ese campo.
const PHONE_SAFE_REGEX = /^[0-9+()\-\s]{6,25}$/;

export const contactSchema = z.object({
  nombre: z
    .string({ error: "Indica tu nombre." })
    .trim()
    .min(2, "Indica tu nombre (mínimo 2 caracteres).")
    .max(100, "El nombre es demasiado largo (máximo 100 caracteres)."),
  empresa: z
    .string()
    .trim()
    .max(150, "El nombre de la empresa es demasiado largo (máximo 150 caracteres).")
    .optional()
    .or(z.literal("")),
  email: z
    .string({ error: "Indica un email de contacto." })
    .trim()
    .min(1, "Indica un email de contacto.")
    .max(200, "El email es demasiado largo.")
    .email("Revisa el formato del email."),
  telefono: z
    .string()
    .trim()
    .regex(PHONE_SAFE_REGEX, "Revisa el formato del teléfono.")
    .optional()
    .or(z.literal("")),
  servicio: z.enum(SERVICE_VALUES, {
    message: "Selecciona un servicio de la lista.",
  }),
  presupuesto: z
    .enum(BUDGET_OPTIONS, { message: "Selecciona un rango de presupuesto válido." })
    .optional()
    .or(z.literal("")),
  mensaje: z
    .string({ error: "Cuéntanos algo sobre tu proyecto." })
    .trim()
    .min(10, "Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).")
    .max(4000, "El mensaje es demasiado largo (máximo 4000 caracteres)."),
  // Honeypot: campo invisible para personas, que un bot de spam sí suele
  // rellenar. El nombre "_gotcha" no es arbitrario: es la convención que
  // reconoce Formspree para descartar el envío en su propio servidor sin
  // enviar el email (ver src/lib/formspree.ts). No se valida su formato,
  // solo se comprueba que llegue vacío antes de enviar.
  _gotcha: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/** Convierte los errores de Zod en un mapa {campo: primer mensaje} para la UI. */
export function flattenContactErrors(error: z.ZodError<ContactFormValues>): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactFormValues | undefined;
    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
