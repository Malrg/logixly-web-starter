import { Code2, Compass, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { process } from "@/config/content";

const icons = { Search, Compass, PenTool, Code2, Rocket, TrendingUp };

export function Process() {
  return (
    <section className="section-space" id="proceso">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Metodología"
            title="Cómo trabajamos"
            description="Un proceso claro, de principio a fin, para que siempre sepas en qué punto está tu proyecto."
            align="center"
          />
        </Reveal>

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-14 hidden h-px bg-border lg:block" aria-hidden="true" />
          {process.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.step} delay={index * 0.07} as="li" className="relative flex flex-col rounded-3xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-3xl font-semibold text-muted-foreground/40">{item.step}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
