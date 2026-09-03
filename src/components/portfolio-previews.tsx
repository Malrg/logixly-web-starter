import { ArrowRight, CalendarCheck, Clock3, Gauge, HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";

/**
 * Mini interfaces ficticias para las tarjetas de "Proyectos" (Portfolio).
 * Son solo HTML/CSS (sin imágenes ni capturas reales): representan de forma
 * abstracta el tipo de producto de cada caso de ejemplo para que la tarjeta
 * no se vea vacía, sin simular una web o app real de ningún cliente.
 */

const dotStyles = "size-3.5 shrink-0";

function ClinicPreview() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-md bg-brand/20 text-brand">
              <HeartPulse className="size-3" />
            </span>
            <span className="truncate text-[10px] font-semibold">Nova Salud Clínica</span>
          </div>
          <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-ink-muted">Hero</span>
        </div>

        <div className="mt-4 h-2 w-3/4 rounded-full bg-white/25" />
        <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/10" />

        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[Stethoscope, CalendarCheck, ShieldCheck].map((Icon, i) => (
            <div key={i} className="rounded-lg bg-white/[.06] p-2">
              <Icon className={`${dotStyles} text-brand`} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[10px] font-semibold text-brand-foreground">
        Reservar cita <ArrowRight className="size-2.5" />
      </div>
    </div>
  );
}

function RestaurantPreview() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="h-1/2 min-h-14 rounded-xl bg-gradient-to-br from-amber-500/40 via-orange-500/25 to-transparent" />

      <div className="flex-1">
        <div className="h-2 w-2/3 rounded-full bg-white/25" />
        <div className="mt-2 h-1.5 w-2/5 rounded-full bg-white/10" />

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/[.08] px-2 py-1 text-[9px] text-ink-muted">
            <Clock3 className="size-3" /> Hoy · 20:30
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/[.08] px-2 py-1 text-[9px] text-ink-muted">
            <Users className="size-3" /> 2 personas
          </span>
        </div>
      </div>

      <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[10px] font-semibold text-brand-foreground">
        Reservar mesa <ArrowRight className="size-2.5" />
      </div>
    </div>
  );
}

function SaasPreview() {
  const metrics = [
    { label: "Disponibilidad", value: "99.9%" },
    { label: "Incidentes", value: "0" },
    { label: "Sesiones activas", value: "128" },
    { label: "Seguridad", value: "A+" },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold">SecureOps Panel</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Seguro
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-white/[.06] px-2 py-1.5">
              <p className="text-[11px] font-semibold leading-tight">{metric.value}</p>
              <p className="truncate text-[8px] text-ink-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/[.06] px-2.5 py-2">
        <Gauge className="size-3.5 shrink-0 text-brand" />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

const previews = {
  clinic: ClinicPreview,
  restaurant: RestaurantPreview,
  saas: SaasPreview,
} as const;

export type ProjectPreviewVariant = keyof typeof previews;

export function ProjectPreview({ variant }: { variant: ProjectPreviewVariant }) {
  const Preview = previews[variant];
  return <Preview />;
}
