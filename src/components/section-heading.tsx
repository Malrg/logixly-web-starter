import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "inverted" is used on dark decorative panels (bg-ink) where the accessible
   * light-mode `--primary`/`--muted-foreground` tokens would fail contrast. */
  tone?: "default" | "inverted";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "mb-3 text-sm font-bold uppercase tracking-[0.18em]",
          tone === "inverted" ? "text-brand" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-7 sm:text-lg",
            tone === "inverted" ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
