import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Contact } from "@/components/contact";
import { PageHero } from "@/components/page-hero";
import { Process } from "@/components/process";
export const metadata: Metadata = { title: "Nosotros", description: "Conoce el enfoque de Logixly Studio para crear productos digitales útiles y duraderos." };
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Tecnología con criterio de negocio"
        description="Combinamos estrategia, diseño y desarrollo para crear webs que se entienden, funcionan y pueden evolucionar."
      />
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] bg-ink p-8 text-ink-foreground sm:p-12">
            <p className="text-6xl font-semibold text-brand">01</p>
            <p className="mt-20 text-3xl font-semibold tracking-tight">
              Una sola base.
              <br />
              Infinitas identidades.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Nuestro método reduce trabajo repetitivo sin convertir cada web en una copia.
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              El sistema separa la identidad, el contenido y los datos del negocio de los
              componentes visuales. Esto permite avanzar rápido y mantener espacio para decisiones
              únicas.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Estrategia antes que decoración",
                "Accesibilidad y rendimiento",
                "Código claro y documentado",
                "Componentes que pueden evolucionar",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Process />
      <Contact />
    </>
  );
}
