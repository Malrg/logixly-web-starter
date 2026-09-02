import { Blocks, Gauge, SearchCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { features } from "@/config/content";

const icons = { Blocks, Gauge, SearchCheck, Sparkles };

export function Features() {
  return (
    <section className="section-space bg-secondary text-secondary-foreground">
      <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <SectionHeading eyebrow="Por qué funciona" title="Bonita por fuera. Sólida por dentro." description="Cada decisión combina imagen, rendimiento y claridad para que la web sea una inversión útil." className="lg:sticky lg:top-28" />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {features.map((feature) => { const Icon = icons[feature.icon]; return <article key={feature.title} className="bg-secondary p-7 sm:p-9"><Icon className="size-7 text-primary" /><h3 className="mt-12 text-xl font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p></article>; })}
        </div>
      </div>
    </section>
  );
}
