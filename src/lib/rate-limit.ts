/**
 * Rate limiting muy básico, en memoria, para el endpoint de contacto.
 *
 * Limitación conocida: este contador vive en la memoria de la instancia de
 * la función serverless. En Vercel eso significa que es "best effort": se
 * reinicia en cada cold start y no se comparte entre instancias/regiones
 * concurrentes. Es suficiente para frenar el caso típico de un bot o un
 * usuario haciendo doble/triple clic, pero NO es un límite estricto ni
 * distribuido. Si en el futuro se necesita un límite real y consistente,
 * la vía recomendada es un almacén compartido (p. ej. Vercel KV / Upstash
 * Redis) en vez de este Map en memoria.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return { allowed: false };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Evita que el Map crezca sin límite en una instancia de larga duración.
  if (hits.size > 500) {
    const cutoff = now - WINDOW_MS;
    for (const [k, v] of hits) {
      if (v.every((t) => t < cutoff)) hits.delete(k);
    }
  }

  return { allowed: true };
}

/** Extrae una clave razonable de identificación del cliente a partir de los headers. */
export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
