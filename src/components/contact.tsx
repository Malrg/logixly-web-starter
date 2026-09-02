import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export function Contact() {
  return (
    <section className="section-space" id="contacto">
      <div className="container-shell grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-[.9fr_1.1fr]">
        <div className="bg-secondary p-8 text-white sm:p-12">
          <SectionHeading eyebrow="Contacto" title="Construyamos algo que haga avanzar tu negocio" description="Cuéntanos qué necesitas. Te responderemos con próximos pasos claros y una propuesta adaptada." />
          <div className="mt-10 space-y-5 text-sm text-white/70">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="size-5 text-primary" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-white"><Phone className="size-5 text-primary" />{siteConfig.phone}</a>
            <p className="flex items-center gap-3"><MapPin className="size-5 text-primary" />{siteConfig.address}</p>
          </div>
        </div>
        <form className="grid gap-5 p-8 sm:grid-cols-2 sm:p-12" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
          <label className="grid gap-2 text-sm font-medium">Nombre<Input name="nombre" placeholder="Tu nombre" required /></label>
          <label className="grid gap-2 text-sm font-medium">Email<Input name="email" type="email" placeholder="tu@email.com" required /></label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">Empresa<Input name="empresa" placeholder="Nombre de tu negocio (opcional)" /></label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">¿Qué necesitas?<Textarea name="mensaje" placeholder="Háblanos de tu proyecto, objetivos y plazos..." required /></label>
          <div className="sm:col-span-2"><Button type="submit" size="lg"><MessageCircle className="size-4" /> Enviar consulta</Button><p className="mt-3 text-xs text-muted-foreground">Starter demostrativo: conecta este formulario con Resend, Formspree o tu CRM antes de producción.</p></div>
        </form>
      </div>
    </section>
  );
}
