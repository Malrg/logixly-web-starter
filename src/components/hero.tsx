import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="hero-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute -left-40 top-20 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="container-shell grid min-h-[78vh] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-sm font-medium text-primary"><Sparkles className="size-4" /> Diseño, tecnología y crecimiento</div>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Webs que convierten una buena idea en un <span className="text-gradient">negocio visible.</span></h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">Creamos experiencias digitales modernas, rápidas y preparadas para captar clientes. Una base profesional que se adapta a cualquier sector.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/contacto">Cuéntanos tu proyecto <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/proyectos">Ver proyectos</Link></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {['Responsive desde el inicio', 'SEO técnico incluido', 'Listo para Vercel'].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" />{item}</span>)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
          <div className="rounded-[2rem] border border-white/40 bg-card/80 p-3 shadow-2xl shadow-secondary/15 backdrop-blur dark:border-white/10">
            <div className="rounded-[1.45rem] border border-border bg-secondary p-5 text-white">
              <div className="mb-12 flex items-center justify-between"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">Tu negocio · online</span></div>
              <p className="text-sm text-white/55">Experiencia digital</p>
              <p className="mt-2 max-w-sm text-3xl font-semibold tracking-tight">Una web premium, sin empezar de cero.</p>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {['Estrategia', 'Diseño', 'Impacto'].map((item, index) => <div key={item} className="rounded-2xl bg-white/[.07] p-3"><span className="text-xs text-white/45">0{index + 1}</span><p className="mt-5 text-sm font-medium">{item}</p></div>)}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-xl sm:-left-10"><span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600"><ShieldCheck /></span><div><p className="text-xs text-muted-foreground">Base profesional</p><p className="text-sm font-semibold">Rápida y segura</p></div></div>
        </div>
      </div>
    </section>
  );
}
