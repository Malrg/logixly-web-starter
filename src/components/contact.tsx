"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { BUDGET_OPTIONS, contactSchema, flattenContactErrors, type ContactFormErrors } from "@/lib/contact-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type FormState = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  presupuesto: string;
  mensaje: string;
  // Honeypot anti-spam: campo oculto para personas, ver más abajo en el JSX.
  sitioWeb: string;
};

const initialState: FormState = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  servicio: "",
  presupuesto: "",
  mensaje: "",
  sitioWeb: "",
};

const GENERIC_ERROR_MESSAGE = "No hemos podido enviar el mensaje. Inténtalo de nuevo en unos minutos.";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR_MESSAGE);

  // Progressive enhancement: preselect el servicio si se llega desde
  // /contacto?servicio=web-corporativa (enlaces de la sección Servicios).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const servicio = params.get("servicio");
    if (servicio && services.some((service) => service.slug === servicio)) {
      // Sincroniza el estado del formulario con un sistema externo (la URL)
      // solo en el montaje inicial en cliente; evita el desajuste de
      // hidratación que produciría calcularlo durante el render con SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({ ...prev, servicio }));
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return; // evita doble envío (doble clic, doble Enter)

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setErrors(flattenContactErrors(result.error));
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload: unknown = await response.json().catch(() => null);
      const ok =
        response.ok &&
        typeof payload === "object" &&
        payload !== null &&
        (payload as { ok?: unknown }).ok === true;

      if (!ok) {
        const message =
          payload && typeof payload === "object" && typeof (payload as { message?: unknown }).message === "string"
            ? (payload as { message: string }).message
            : GENERIC_ERROR_MESSAGE;
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE);
      setStatus("error");
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    // Al volver a escribir, ocultamos el aviso de éxito/error anterior.
    if (status !== "loading" && status !== "idle") setStatus("idle");
  }

  return (
    <section className="section-space" id="contacto">
      <div className="container-shell">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-[.9fr_1.1fr]">
            <div className="bg-ink p-8 text-ink-foreground sm:p-12">
              <SectionHeading
                eyebrow="Contacto"
                title="Construyamos algo que haga avanzar tu negocio"
                description="Cuéntanos qué necesitas. Te responderemos con próximos pasos claros y una propuesta adaptada."
                tone="inverted"
              />
              <div className="mt-10 space-y-5 text-sm text-ink-muted">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition hover:text-white">
                  <Mail className="size-5 text-brand" />
                  {siteConfig.email}
                </a>
                {siteConfig.phone && (
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <Phone className="size-5 text-brand" />
                    {siteConfig.phone}
                  </a>
                )}
                <p className="flex items-center gap-3">
                  <MapPin className="size-5 text-brand" />
                  {siteConfig.address}
                </p>
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} className="grid gap-5 p-8 sm:grid-cols-2 sm:p-12">
              {/* Honeypot anti-spam: invisible y fuera del orden de tabulación para
                  personas (con lector de pantalla o sin él); los bots de spam más
                  básicos suelen rellenar cualquier campo que encuentren. Si llega
                  con contenido, el servidor descarta el envío silenciosamente. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="sitioWeb">Deja este campo vacío</label>
                <input
                  type="text"
                  id="sitioWeb"
                  name="sitioWeb"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.sitioWeb}
                  onChange={(e) => update("sitioWeb", e.target.value)}
                />
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={errors.nombre ? "nombre-error" : undefined}
                  required
                />
                {errors.nombre && <FieldError id="nombre-error">{errors.nombre}</FieldError>}
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  name="empresa"
                  placeholder="Nombre de tu negocio (opcional)"
                  value={form.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                />
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="telefono">Teléfono (opcional)</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+34 600 123 456"
                  value={form.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                  aria-invalid={Boolean(errors.telefono)}
                  aria-describedby={errors.telefono ? "telefono-error" : undefined}
                />
                {errors.telefono && <FieldError id="telefono-error">{errors.telefono}</FieldError>}
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="servicio">Servicio</Label>
                <Select
                  id="servicio"
                  name="servicio"
                  placeholder="Selecciona un servicio"
                  value={form.servicio}
                  onChange={(e) => update("servicio", e.target.value)}
                  aria-invalid={Boolean(errors.servicio)}
                  aria-describedby={errors.servicio ? "servicio-error" : undefined}
                  required
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                  <option value="otro">Otro / no lo sé todavía</option>
                </Select>
                {errors.servicio && <FieldError id="servicio-error">{errors.servicio}</FieldError>}
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="presupuesto">Presupuesto aproximado</Label>
                <Select
                  id="presupuesto"
                  name="presupuesto"
                  placeholder="Selecciona un rango"
                  value={form.presupuesto}
                  onChange={(e) => update("presupuesto", e.target.value)}
                  aria-invalid={Boolean(errors.presupuesto)}
                  aria-describedby={errors.presupuesto ? "presupuesto-error" : undefined}
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {errors.presupuesto && <FieldError id="presupuesto-error">{errors.presupuesto}</FieldError>}
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-2">
                <Label htmlFor="mensaje">¿Qué necesitas?</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Háblanos de tu proyecto, objetivos y plazos..."
                  value={form.mensaje}
                  onChange={(e) => update("mensaje", e.target.value)}
                  aria-invalid={Boolean(errors.mensaje)}
                  aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                  required
                />
                {errors.mensaje && <FieldError id="mensaje-error">{errors.mensaje}</FieldError>}
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="size-4" /> Cuéntanos tu proyecto
                    </>
                  )}
                </Button>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Al enviar este formulario aceptas que utilicemos tus datos únicamente para responder a tu
                  solicitud. Consulta nuestra{" "}
                  <Link href="/privacidad" className="underline underline-offset-2 hover:text-foreground">
                    política de privacidad
                  </Link>
                  .
                </p>

                {status === "success" && (
                  <p role="status" className="mt-3 flex items-center gap-2 text-sm font-medium text-success">
                    <CheckCircle2 className="size-4" /> ¡Mensaje enviado! Hemos recibido tu solicitud. Te
                    contactaremos lo antes posible.
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium text-danger">
                    <AlertCircle className="size-4" /> {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className={cn("flex items-center gap-1.5 text-xs font-medium text-danger")}>
      <AlertCircle className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}
