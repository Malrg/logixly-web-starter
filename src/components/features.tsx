import { Bot, Cpu, Gauge, LifeBuoy, Puzzle, ShieldCheck } from "lucide-react";
import { AmbientNetwork } from "@/components/ambient-network";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { differentiators } from "@/config/content";

const icons = { Puzzle, Cpu, ShieldCheck, Bot, Gauge, LifeBuoy };

export function Features() {
  return (
    <section className="section-space relative isolate overflow-hidden bg-ink text-ink-foreground">
      {/* Antes llevaba .bg-grid-ink en toda la sección (cuadrícula dominante).
          Se sustituye por un fondo oscuro limpio + un detalle casi
          imperceptible de la misma red neuronal del Hero, para dar continuidad
          ambiental sin competir con la card de beneficios.

          "isolate" (isolation: isolate) es necesario aquí: sin él, esta
          sección no crea su propio stacking context (relative por sí solo no
          basta) y los hijos con z-index negativo (AmbientNetwork, glow-orb)
          se resuelven contra un ancestro mucho más arriba en el árbol,
          pintándose ANTES que el fondo bg-ink de esta misma sección — es
          decir, quedan tapados por su propio fondo opaco y se vuelven
          invisibles. Con "isolate", el fondo de la sección pinta primero y
          estos elementos quedan correctamente por encima de él y por debajo
          del contenido. (El Hero funciona sin esto por casualidad: no tiene
          fondo opaco propio que pueda taparlo.) */}
      <AmbientNetwork
        id="features"
        variant="ink"
        intensity="low"
        className="ambient-network mask-fade-radial pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
      />
      <div className="glow-orb pointer-events-none absolute -right-24 top-0 -z-0 size-96 bg-brand/10" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué funciona"
            title="Por qué trabajar con Logixly"
            description="Cada decisión combina imagen, rendimiento y claridad para que la web sea una inversión útil, no solo bonita."
            tone="inverted"
            className="lg:sticky lg:top-28"
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-border bg-white/10 sm:grid-cols-2">
          {differentiators.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 0.06} as="div" className="bg-ink p-7 sm:p-9">
                <Icon className="size-7 text-brand" />
                <h3 className="mt-10 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{feature.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
