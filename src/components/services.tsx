import Link from "next/link";
import { ArrowUpRight, LayoutTemplate, ShieldCheck, ShoppingBag, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { services } from "@/config/services";

const icons = { LayoutTemplate, ShoppingBag, Workflow, ShieldCheck };

export function Services() {
  return (
    <section className="section-space" id="servicios">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Soluciones digitales adaptadas a tu negocio"
            description="Diseñamos la tecnología alrededor de tus objetivos: desde tu presencia web hasta automatizaciones, integraciones y seguridad."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <Card className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
                  <CardHeader>
                    <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-brand/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-brand/15">
                      <Icon className="size-6" />
                    </span>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="flex-1 text-sm leading-6 text-muted-foreground">{service.description}</p>
                    <ul className="mt-5 space-y-2">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      {service.cta}
                      <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
