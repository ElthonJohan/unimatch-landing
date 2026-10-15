/**
 * Datos del sitio usados por metadatos, sitemap, robots y manifest.
 * La URL pública se define con NEXT_PUBLIC_SITE_URL (p. ej. https://unimatch.pe).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "UniMatch",
  url: resolveSiteUrl(),
  title: "UniMatch — Conecta con estudiantes que comparten tus intereses",
  description:
    "UniMatch conecta a estudiantes universitarios con intereses en común para estudiar, crear proyectos, practicar deportes, asistir a eventos y hacer networking.",
  locale: "es_ES",
  bg: "#F7F6F3",
  bgDark: "#15171A",
};
