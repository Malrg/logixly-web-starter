/**
 * Fondo decorativo tipo "red neuronal / flujo tecnológico": nodos finos,
 * conexiones curvas y un par de pulsos de datos viajando muy despacio.
 *
 * Puramente declarativo: es un Server Component (sin "use client", sin
 * hooks, sin requestAnimationFrame). Todo el movimiento es CSS puro
 * (`@keyframes` definidos en globals.css), así que no se envía JavaScript
 * extra al cliente por este componente y la animación queda cubierta por
 * la regla global `prefers-reduced-motion` (más un refuerzo explícito,
 * ver globals.css) sin lógica adicional.
 *
 * Uso: posicionar el contenedor padre con "absolute inset-0 -z-10" (o
 * similar) y pointer-events-none; este componente solo dibuja el SVG que
 * rellena ese contenedor.
 */

import { cn } from "@/lib/utils";

type Node = {
  id: number;
  x: number;
  y: number;
  r: number;
  /** Nodo con brillo pulsante (glow). Se usan con moderación. */
  pulse?: boolean;
  /** Acento teal/emerald extremadamente puntual (como mucho un nodo). */
  teal?: boolean;
  /** Se dibuja también en intensidad "low" (subconjunto mínimo). */
  minIntensity?: "low";
};

type Edge = {
  id: string;
  from: number;
  to: number;
  d: string;
  /** Línea "de flujo": lleva un pulso de datos animado (solo en "medium"). */
  flow?: boolean;
  minIntensity?: "low";
};

// Distribución asimétrica y orgánica (no es una cuadrícula ni un patrón
// repetitivo): coordenadas elegidas a mano dentro de un lienzo 1200x800,
// con algo más de densidad hacia la derecha para poder "acompañar" un
// panel o CTA que suela vivir en esa zona (p. ej. el Hero).
const NODES: Node[] = [
  { id: 1, x: 90, y: 120, r: 2.2 },
  { id: 2, x: 180, y: 300, r: 2, minIntensity: "low" },
  { id: 3, x: 60, y: 480, r: 1.8 },
  { id: 4, x: 260, y: 180, r: 2.4 },
  { id: 5, x: 340, y: 420, r: 2.6, pulse: true, minIntensity: "low" },
  { id: 6, x: 230, y: 600, r: 1.8 },
  { id: 7, x: 460, y: 260, r: 2, minIntensity: "low" },
  { id: 8, x: 520, y: 480, r: 2.4, pulse: true, teal: true },
  { id: 9, x: 610, y: 120, r: 2 },
  { id: 10, x: 650, y: 360, r: 2.8, pulse: true, minIntensity: "low" },
  { id: 11, x: 760, y: 540, r: 2 },
  { id: 12, x: 820, y: 220, r: 2.2 },
  { id: 13, x: 900, y: 400, r: 2.6, pulse: true, minIntensity: "low" },
  { id: 14, x: 980, y: 150, r: 1.8 },
  { id: 15, x: 1040, y: 320, r: 2.4, minIntensity: "low" },
  { id: 16, x: 1100, y: 500, r: 2, pulse: true },
];

const EDGES: Edge[] = [
  { id: "1-2", from: 1, to: 2, d: "M90,120 Q130,230 180,300" },
  { id: "2-4", from: 2, to: 4, d: "M180,300 Q245,260 260,180" },
  { id: "2-3", from: 2, to: 3, d: "M180,300 Q100,390 60,480" },
  { id: "4-5", from: 4, to: 5, d: "M260,180 Q330,270 340,420" },
  { id: "5-7", from: 5, to: 7, d: "M340,420 Q420,320 460,260", minIntensity: "low" },
  { id: "5-6", from: 5, to: 6, d: "M340,420 Q280,520 230,600" },
  { id: "7-9", from: 7, to: 9, d: "M460,260 Q540,170 610,120" },
  { id: "7-8", from: 7, to: 8, d: "M460,260 Q510,380 520,480" },
  { id: "8-11", from: 8, to: 11, d: "M520,480 Q650,520 760,540" },
  { id: "9-10", from: 9, to: 10, d: "M610,120 Q660,230 650,360" },
  { id: "10-12", from: 10, to: 12, d: "M650,360 Q740,270 820,220" },
  { id: "10-13", from: 10, to: 13, d: "M650,360 Q780,370 900,400", flow: true, minIntensity: "low" },
  { id: "12-14", from: 12, to: 14, d: "M820,220 Q910,170 980,150" },
  { id: "13-15", from: 13, to: 15, d: "M900,400 Q980,350 1040,320", flow: true, minIntensity: "low" },
  { id: "13-16", from: 13, to: 16, d: "M900,400 Q1020,460 1100,500" },
  { id: "15-14", from: 15, to: 14, d: "M1040,320 Q1010,230 980,150" },
  { id: "11-16", from: 11, to: 16, d: "M760,540 Q940,530 1100,500" },
  { id: "9-12", from: 9, to: 12, d: "M610,120 Q740,150 820,220", flow: true },
];

const VARIANTS = {
  // Para secciones con el fondo de página normal (blanco en claro, oscuro
  // en oscuro): se apoya en --foreground para adaptarse solo al tema.
  surface: {
    line: "color-mix(in srgb, var(--foreground) 16%, transparent)",
    node: "color-mix(in srgb, var(--foreground) 38%, transparent)",
  },
  // Para paneles "--ink" (siempre oscuros, independientes del tema, igual
  // que ya hace la utilidad .bg-grid-ink existente): se apoya en blanco.
  ink: {
    line: "color-mix(in srgb, white 16%, transparent)",
    node: "color-mix(in srgb, white 34%, transparent)",
  },
} as const;

export function AmbientNetwork({
  id,
  variant = "surface",
  intensity = "medium",
  className,
  edgeFade,
}: {
  /** Prefijo único para los ids de <filter>; evita colisiones si hay más de una instancia en la página. */
  id: string;
  variant?: keyof typeof VARIANTS;
  /** "low" = detalle casi imperceptible y estático salvo 2 glows lentos. "medium" = intensidad completa. */
  intensity?: "low" | "medium";
  className?: string;
  /**
   * Atenúa el efecto hacia un borde (sin tocar nodos, animación ni el resto
   * de la máscara/opacidad que ya traiga `className`, p. ej. mask-fade-radial):
   * se aplica en un contenedor anidado aparte para que ambas máscaras se
   * combinen por superposición normal — cada `mask-image` multiplica su
   * propio alfa — en vez de pisarse entre sí o depender de mask-composite.
   * "left" = más tenue empezando por la izquierda, intensidad ya completa
   * desde aprox. el 60% del ancho hacia la derecha. Pensado para usarse
   * detrás de una columna de texto en el lado izquierdo.
   */
  edgeFade?: "left";
}) {
  const colors = VARIANTS[variant];
  const nodes = intensity === "low" ? NODES.filter((n) => n.minIntensity === "low") : NODES;
  const edges = intensity === "low" ? EDGES.filter((e) => e.minIntensity === "low") : EDGES;
  const filterId = `${id}-ambient-glow`;

  const svg = (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={edgeFade ? "h-full w-full" : className}
    >
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      <g fill="none" strokeLinecap="round">
        {edges.map((edge) => (
          <path
            key={edge.id}
            d={edge.d}
            stroke={edge.flow ? "var(--brand)" : colors.line}
            strokeOpacity={edge.flow ? 0.55 : 1}
            strokeWidth={edge.flow ? 1.1 : 1}
            className={edge.flow && intensity === "medium" ? "animate-network-flow" : undefined}
            strokeDasharray={edge.flow && intensity === "medium" ? "5 960" : undefined}
          />
        ))}
      </g>

      <g>
        {nodes.map((node) => {
          const fill = node.teal ? "var(--success)" : node.pulse ? "var(--brand)" : colors.node;
          if (!node.pulse) {
            return <circle key={node.id} cx={node.x} cy={node.y} r={node.r} fill={fill} fillOpacity={0.7} />;
          }
          return (
            <g
              key={node.id}
              className="svg-fill-box animate-node-glow"
              style={{ animationDelay: `${(node.id % 5) * 0.6}s` }}
            >
              <circle cx={node.x} cy={node.y} r={node.r + 4} fill={fill} fillOpacity={0.35} filter={`url(#${filterId})`} />
              <circle cx={node.x} cy={node.y} r={node.r} fill={fill} fillOpacity={0.85} />
            </g>
          );
        })}
      </g>
    </svg>
  );

  if (!edgeFade) return svg;

  return (
    <div className={className}>
      <div className={cn("h-full w-full", edgeFade === "left" && "mask-fade-left")}>{svg}</div>
    </div>
  );
}
