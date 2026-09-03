import Link from "next/link";
import { Check } from "lucide-react";
import { pricing } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section className="section-space" id="precios">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Inversión"
            title="Un punto de partida para cada etapa"
            description="Precios orientativos. Activa, edita u oculta esta sección según el proyecto."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricing.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-1",
                  plan.featured ? "border-primary shadow-2xl shadow-primary/10" : "border-border hover:border-primary/30",
                )}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-7 border-transparent bg-brand font-bold text-brand-foreground">
                    Más elegido
                  </Badge>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <p className="mt-7 text-3xl font-semibold tracking-tight">{plan.price}</p>
                <ul className="my-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.featured ? "default" : "outline"}>
                  <Link href="/contacto">Solicitar propuesta</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
