"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const budgetOptions = [
  "Menos de 800 €",
  "800 € – 1.500 €",
  "1.500 € – 3.000 €",
  "Más de 3.000 €",
  "Aún no lo sé",
];

type FormState = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  presupuesto: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  servicio: "",
  presupuesto: "",
  mensaje: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

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

  const mailtoHref = useMemo(() => {
    const body = [
      `Nombre: ${form.nombre}`,
      form.empresa && `Empresa: ${form.empresa}`,
      `Email: ${form.email}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.servicio && `Servicio: ${form.servicio}`,
      form.presupuesto && `Presupuesto: ${form.presupuesto}`,
      "",
      form.mensaje,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Nuevo proyecto: ${form.nombre || "Sin nombre"}`,
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!form.nombre.trim()) nextErrors.nombre = "Indica tu nombre.";
    if (!form.email.trim()) {
      nextErrors.email = "Indica un email de contacto.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = "Revisa el formato del email.";
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
      nextErrors.mensaje = "Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    // TODO(integración): sustituir por una llamada real, por ejemplo:
    // await fetch("/api/contacto", { method: "POST", body: JSON.stringify(form) });
    // Mientras no exista backend, abrimos el cliente de correo con los datos ya
    // formateados para no perder ninguna solicitud.
    window.location.href = mailtoHref;
    setStatus("success");
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
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
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="size-5 text-brand" />
                  {siteConfig.phone}
                </a>
                <p className="flex items-center gap-3">
                  <MapPin className="size-5 text-brand" />
                  {siteConfig.address}
                </p>
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} className="grid gap-5 p-8 sm:grid-cols-2 sm:p-12">
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
                  placeholder="+34 600 000 000"
                  value={form.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                />
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="servicio">Servicio</Label>
                <Select
                  id="servicio"
                  name="servicio"
                  placeholder="Selecciona un servicio"
                  value={form.servicio}
                  onChange={(e) => update("servicio", e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                  <option value="otro">Otro / no lo sé todavía</option>
                </Select>
              </div>

              <div className="grid gap-2 text-sm font-medium sm:col-span-1">
                <Label htmlFor="presupuesto">Presupuesto aproximado</Label>
                <Select
                  id="presupuesto"
                  name="presupuesto"
                  placeholder="Selecciona un rango"
                  value={form.presupuesto}
                  onChange={(e) => update("presupuesto", e.target.value)}
                >
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
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
                <Button type="submit" size="lg">
                  <MessageCircle className="size-4" /> Cuéntanos tu proyecto
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Starter demostrativo: este formulario abre tu cliente de correo. Conéctalo con
                  Resend, Formspree o tu CRM y valida los datos en servidor antes de producción.
                </p>
                {status === "success" && (
                  <p role="status" className="mt-3 flex items-center gap-2 text-sm font-medium text-success">
                    <CheckCircle2 className="size-4" /> Hemos abierto tu cliente de correo con el mensaje listo para enviar.
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
