import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectPreview } from "@/components/portfolio-previews";

export function Portfolio({ limit }: { limit?: number }) {
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section className="section-space" id="proyectos">
      <div className="container-shell">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Proyectos"
            title="Diseño pensado para resultados"
            description="Estos casos son demostraciones conceptuales de la plantilla, marcadas como ejemplo. Se sustituirán por proyectos reales de clientes."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/proyectos">
              Todos los proyectos <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card">
                <div className={`relative aspect-4/3 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  {project.placeholder && (
                    <Badge variant="outline" className="absolute left-4 top-4 z-10 bg-background/90">
                      Proyecto de ejemplo
                    </Badge>
                  )}
                  <div className="absolute inset-7 overflow-hidden rounded-2xl border border-white/20 bg-ink p-4 text-ink-foreground shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                    <ProjectPreview variant={project.preview} />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-primary">{project.objective}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="mt-5 -ml-3 text-primary">
                    <Link href="/proyectos">
                      Ver proyecto <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
