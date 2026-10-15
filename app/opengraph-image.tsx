import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "UniMatch — Conecta con estudiantes que comparten tus intereses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir en redes; también la usa X/Twitter como respaldo. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: site.bg,
          color: "#23262B",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="132" height="132" viewBox="0 0 26 26">
            <path d="M8.3 17.2L17.4 9.8" stroke="#9AA5B8" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <circle cx="6" cy="19" r="3.4" fill="#182554" />
            <circle cx="20" cy="8" r="3.4" fill="#3D6FB4" />
            <circle cx="13" cy="20" r="2.6" fill="#4E8A7E" />
          </svg>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
            Uni<span style={{ color: "#C77B3B" }}>Match</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 48, fontWeight: 600, lineHeight: 1.2, maxWidth: 960 }}>
          Conecta con estudiantes que comparten tus intereses
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#66635C", maxWidth: 960 }}>
          Estudia, crea proyectos, haz deporte, asiste a eventos y haz networking.
        </div>
      </div>
    ),
    size,
  );
}
