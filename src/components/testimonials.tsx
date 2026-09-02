import { Quote } from "lucide-react";
import { testimonials } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";

export function Testimonials() {
  return (
    <section className="section-space bg-muted/50">
      <div className="container-shell">
        <SectionHeading eyebrow="Confianza" title="Buenas experiencias, mejores relaciones" align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => <figure key={testimonial.name} className="rounded-3xl border border-border bg-background p-7"><Quote className="size-8 text-primary/40" /><blockquote className="mt-8 text-lg leading-8">“{testimonial.quote}”</blockquote><figcaption className="mt-8 border-t border-border pt-5"><p className="font-semibold">{testimonial.name}</p><p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p></figcaption></figure>)}
        </div>
      </div>
    </section>
  );
}
