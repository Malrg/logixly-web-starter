import Link from "next/link";
import { ArrowUpRight, LayoutTemplate, ShieldCheck, ShoppingBag, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/config/services";

const icons = { LayoutTemplate, ShoppingBag, Workflow, ShieldCheck };

export function Services() {
  return (
    <section className="section-space" id="servicios">
      <div className="container-shell">
        <SectionHeading eyebrow="Servicios" title="Una base flexible para cada tipo de negocio" description="Cambia el contenido y la identidad visual; conserva una arquitectura que ya resuelve lo esencial." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => { const Icon = icons[service.icon]; return (
            <Card key={service.title} className="group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
              <CardHeader><span className="mb-5 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" /></span><CardTitle>{service.title}</CardTitle></CardHeader>
              <CardContent className="flex flex-1 flex-col"><p className="flex-1 text-sm leading-6 text-muted-foreground">{service.description}</p><Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">{service.cta}<ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></CardContent>
            </Card>
          ); })}
        </div>
      </div>
    </section>
  );
}
