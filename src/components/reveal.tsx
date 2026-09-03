"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Scroll-triggered fade/slide-in used across marketing sections.
 *
 * Progressive enhancement: el contenido se renderiza SIEMPRE estático y
 * visible primero (HTML del servidor y primera pintura en cliente), sin
 * ningún estado oculto que dependa de que React hidrate. Solo después de
 * montar comprobamos si el elemento ya está dentro del viewport:
 *  - si ya era visible al montar, se queda estático para siempre (no tiene
 *    sentido "revelar" algo que el usuario ya está viendo, y forzarlo
 *    causaría un parpadeo);
 *  - si todavía no era visible (está más abajo, fuera de pantalla), recién
 *    ahí se sustituye por la versión animada de Framer Motion de siempre.
 *    Como el elemento está fuera de pantalla en ese instante, pasar a
 *    opacity:0 no se nota, y la animación de scroll-reveal se preserva tal
 *    cual para cuando el usuario llegue hasta él.
 *
 * Resultado: la página es 100% legible sin JavaScript, y con JavaScript la
 * animación de siempre se mantiene para todo lo que estuviera fuera de
 * pantalla al cargar. `prefers-reduced-motion` se sigue respetando (queda
 * siempre en la versión estática).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  // null  = todavía no medido (SSR / primer render en cliente) -> estático
  // false = ya estaba visible al montar -> se queda estático
  // true  = estaba fuera de pantalla al montar -> se anima al llegar a él
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Solo medimos cuando sabemos con certeza que NO se prefiere movimiento
    // reducido (reduceMotion === false); mientras sea `null` (aún sin
    // resolver) o `true`, no tiene sentido animar nada.
    if (reduceMotion !== false) return;
    const el = as === "li" ? liRef.current : divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    setShouldAnimate(!alreadyVisible);
  }, [reduceMotion, as]);

  if (reduceMotion === false && shouldAnimate) {
    const Component = as === "li" ? motion.li : motion.div;
    return (
      <Component
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        custom={delay}
        variants={baseVariants}
      >
        {children}
      </Component>
    );
  }

  if (as === "li") {
    return (
      <li ref={liRef} className={className}>
        {children}
      </li>
    );
  }
  return (
    <div ref={divRef} className={className}>
      {children}
    </div>
  );
}
