import { faqs } from "@/config/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="section-space bg-muted/50" id="faq">
      <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" description="Respuestas claras antes de empezar." />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="rounded-3xl border border-border bg-background px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
