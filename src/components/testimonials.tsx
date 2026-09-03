import { Quote } from "lucide-react";
import { testimonials } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  return (
    <section className="section-space bg-muted/50">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Confianza"
            title="Buenas experiencias, mejores relaciones"
            description="Así describen nuestros clientes el trabajo conjunto: claridad desde el primer contacto y un resultado a la altura del negocio que representan."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-dashed border-border bg-background p-7">
                {testimonial.placeholder && (
                  <Badge variant="outline" className="absolute right-5 top-5">
                    Reseña ilustrativa
                  </Badge>
                )}
                <Quote className="size-8 text-primary/40" />
                <blockquote className="mt-8 flex-1 text-lg leading-8 text-muted-foreground italic">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
                  {testimonial.placeholder && (
                    <p className="mt-2 text-xs text-muted-foreground/70">Cliente ficticio · ejemplo ilustrativo</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          Testimonios de ejemplo usados con fines ilustrativos hasta incorporar reseñas reales de clientes.
        </p>
      </div>
    </section>
  );
}
