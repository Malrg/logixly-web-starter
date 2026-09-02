import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export function Portfolio({ limit }: { limit?: number }) {
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <section className="section-space" id="proyectos">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Proyectos" title="Diseño pensado para resultados" description="Ejemplos conceptuales que muestran cómo una misma base puede adoptar identidades completamente distintas." />
          <Button asChild variant="outline"><Link href="/proyectos">Todos los proyectos <ArrowRight className="size-4" /></Link></Button>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <article key={project.title} className="group overflow-hidden rounded-3xl border border-border bg-card">
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-7 rounded-2xl border border-white/20 bg-secondary p-5 text-white shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                  <div className="flex items-center justify-between"><span className="text-xs text-white/50">0{index + 1}</span><ArrowUpRight className="size-5" /></div>
                  <div className="absolute bottom-5 left-5 right-5"><div className="mb-3 h-2 w-14 rounded-full bg-primary" /><div className="h-2 w-2/3 rounded-full bg-white/20" /><div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" /></div>
                </div>
              </div>
              <div className="p-6"><p className="text-sm text-muted-foreground">{project.category}</p><div className="mt-2 flex items-center justify-between gap-4"><h3 className="text-xl font-semibold">{project.title}</h3><span className="text-sm font-semibold text-primary">{project.result}</span></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
