"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const trustPoints = [
  "Entregas en semanas, no meses",
  "SEO técnico incluido",
  "Seguridad desde el diseño",
];

const stackChips = [
  { label: "Desarrollo web", icon: Sparkles },
  { label: "Automatización IA", icon: Bot },
  { label: "Ciberseguridad", icon: Lock },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const up = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Technical backdrop: grid + glow orbs + drifting lines */}
      <div className="bg-grid mask-fade-radial pointer-events-none absolute inset-0 -z-20 opacity-[0.55]" />
      <div className="glow-orb pointer-events-none absolute -left-32 top-10 -z-10 size-96 bg-brand/20" />
      <div className="glow-orb animate-pulse-slow pointer-events-none absolute right-0 top-40 -z-10 size-80 bg-brand/10" />
      <svg
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full opacity-40 lg:block"
        aria-hidden="true"
      >
        <line x1="62%" y1="0" x2="98%" y2="55%" stroke="var(--border)" strokeWidth="1" />
        <line x1="80%" y1="0" x2="45%" y2="100%" stroke="var(--border)" strokeWidth="1" />
      </svg>

      <div className="container-shell grid min-h-[82vh] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
        <div>
          <motion.div {...up(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" /> Diseño, tecnología y crecimiento
          </motion.div>

          <motion.h1
            {...up(0.08)}
            className="max-w-4xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]"
          >
            Transformamos negocios con{" "}
            <span className="text-gradient">tecnología</span> que se nota desde el primer clic.
          </motion.h1>

          <motion.p {...up(0.16)} className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Unimos diseño, desarrollo, automatización e inteligencia artificial para ayudarte a
            vender más, trabajar mejor y crecer con una base tecnológica segura.
          </motion.p>

          <motion.div {...up(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contacto">
                Solicitar presupuesto <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/proyectos">Ver proyectos</Link>
            </Button>
          </motion.div>

          <motion.div {...up(0.32)} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {trustPoints.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...up(0.2)}
          className="relative mx-auto w-full max-w-xl"
          style={reduceMotion ? undefined : undefined}
        >
          <div className="glow-orb absolute -inset-8 -z-10 bg-brand/15" />
          <div className="animate-float rounded-[2rem] border border-white/40 bg-card/80 p-3 shadow-2xl shadow-black/10 backdrop-blur dark:border-white/10">
            <div className="bg-grid-ink relative overflow-hidden rounded-[1.45rem] border border-ink-border bg-ink p-6 text-ink-foreground">
              <div className="mb-10 flex items-center justify-between gap-2">
                <div className="flex shrink-0 gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-xs">
                  Tu negocio · online
                </span>
              </div>
              <p className="text-sm text-ink-muted">Tu proyecto con Logixly Studio</p>
              <p className="mt-2 max-w-sm text-3xl font-semibold tracking-tight">
                Tecnología que trabaja para tu negocio.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-2.5">
                {stackChips.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/[.06] p-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/20 text-brand">
                      <Icon className="size-4" />
                    </span>
                    <p className="text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>

              {/* Estado de confianza: vive dentro del flujo normal del panel, no
                  como insignia flotante con offsets negativos. Así se mueve con
                  el panel en la animación float sin ningún cálculo extra (es
                  literalmente parte del mismo elemento transformado), nunca se
                  recorta ni se sale del contenedor, y no compite en jerarquía con
                  los chips de arriba: el Separator marca que es una categoría de
                  información distinta (estado/confianza, no una feature). */}
              <Separator className="mt-6 bg-ink-border" />
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.06] p-3.5 shadow-[0_8px_24px_-16px_rgba(52,211,153,0.45)]">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-400">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-ink-muted">Base profesional</p>
                  <p className="text-sm font-semibold text-ink-foreground">Rápida y segura</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
