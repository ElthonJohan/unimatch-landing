"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "¿UniMatch es una app de citas?",
    a: "No. UniMatch está hecha para formar comunidad universitaria: estudiar juntos, crear proyectos, practicar deportes, asistir a eventos y hacer networking. Insistir en contactar a alguien que no quiere comunicarse va contra nuestras reglas.",
  },
  {
    q: "¿Quién puede usar UniMatch?",
    a: "Estudiantes universitarios. Te registras con tu correo universitario y completas un perfil con tu nombre, sede, carrera y año académico.",
  },
  {
    q: "¿Cómo funcionan los matches?",
    a: "Eliges un modo (Estudio, Actividades o Networking) y ves personas con intereses, habilidades y horarios en común. Puedes enviar solicitudes de conexión, que la otra persona acepta o rechaza. Cuando conectan, pueden chatear y proponer un plan.",
  },
  {
    q: "¿Qué incluye Premium?",
    a: "UniMatch Premium amplía tu alcance: te permite hacer match con estudiantes de otras sedes y de otras universidades.",
  },
  {
    q: "¿Es seguro reunirme con alguien que conocí aquí?",
    a: "UniMatch no organiza ni supervisa los encuentros, así que te recomendamos reunirte en lugares públicos y concurridos del campus, avisar a alguien de confianza y retirarte si algo te incomoda. Puedes reportar cualquier conducta indebida desde la app.",
  },
  {
    q: "¿Puedo eliminar mi cuenta?",
    a: (
      <>
        Sí, en cualquier momento desde Ajustes. Mira los detalles en nuestros{" "}
        <Link
          href="/terminos"
          style={{
            color: "var(--amber-text)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          términos y condiciones
        </Link>
        .
      </>
    ),
  },
];

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  return (
    <section className="sec" id="preguntas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div>
          <h2 id="faq-title">Preguntas frecuentes</h2>
          <p className="lead" style={{ marginTop: "20px" }}>
            Lo que más nos preguntan antes de crear una cuenta.
          </p>
        </div>
        <div className="faq">
          {FAQS.map((f, k) => {
            const n = k + 1;
            const isOpen = openFaq === k;
            return (
              <div key={n} className={`faq-i${isOpen ? " open" : ""}`}>
                <h3>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`f${n}`}
                    id={`fq${n}`}
                    type="button"
                    onClick={() => toggleFaq(k)}
                  >
                    {f.q}
                    <span className="pm" aria-hidden="true"></span>
                  </button>
                </h3>
                <div
                  className="faq-a"
                  id={`f${n}`}
                  role="region"
                  aria-labelledby={`fq${n}`}
                >
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
