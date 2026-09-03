import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export type LegalSection = {
  heading: string;
  body: string;
};

export function LegalPage({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="section-space">
        <div className="container-shell max-w-3xl">
          <div className="flex gap-3 rounded-2xl border border-accent bg-accent/60 p-5 text-sm leading-6 text-accent-foreground">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <p>
              Este contenido es un marcador de posición de la plantilla, no un texto legal
              válido. Sustitúyelo por una versión redactada o revisada por un profesional
              antes de publicar la web.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
