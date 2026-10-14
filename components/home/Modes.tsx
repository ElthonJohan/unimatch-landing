"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

type Mode = {
  id: string;
  title: string;
  text: string;
  pills: string[];
  example: { title: string; rows: { icon: IconName; text: string }[] };
};

const MODES: Mode[] = [
  {
    id: "m1",
    title: "Estudio",
    text: "Encuentra compañeros de tu carrera o de otras para repasar, resolver dudas y avanzar juntos en los cursos que más te cuestan.",
    pills: ["Compañeros de estudio", "Proyectos universitarios", "Investigación", "Tu misma carrera"],
    example: {
      title: "Grupo de estudio: Cálculo II",
      rows: [
        { icon: "cal", text: "mar, 22 set. a las 4:00 p. m." },
        { icon: "pin", text: "Biblioteca central" },
        { icon: "users", text: "4 de 6 cupos ocupados" },
      ],
    },
  },
  {
    id: "m2",
    title: "Actividades",
    text: "Sal del salón: suma gente para jugar, unirte a un club, ir a un evento o hacer voluntariado en tu universidad.",
    pills: ["Deportes", "Clubes", "Eventos", "Voluntariado"],
    example: {
      title: "Fútbol de los jueves",
      rows: [
        { icon: "cal", text: "jue, 24 set. a las 6:00 p. m." },
        { icon: "pin", text: "Cancha del campus" },
        { icon: "users", text: "Faltan 3 personas" },
      ],
    },
  },
  {
    id: "m3",
    title: "Networking",
    text: "Conoce a quienes quieren emprender, construir un proyecto o abrir puertas. Tus próximos socios pueden estar en el mismo campus.",
    pills: ["Emprendimiento", "Networking", "Startups", "Reuniones"],
    example: {
      title: "Networking IA y Startups",
      rows: [
        { icon: "spark", text: "3 personas con tus intereses" },
        { icon: "chat", text: "Escríbeles desde la app" },
        { icon: "users", text: "Marketing, Sistemas y Diseño" },
      ],
    },
  },
];

export function Modes() {
  const [openMode, setOpenMode] = useState<string>("m1");

  function toggleMode(id: string) {
    setOpenMode((prev) => (prev === id ? "" : id));
  }

  return (
    <section className="sec" id="modos" aria-labelledby="modes-title">
      <div className="wrap">
        <div className="modes-head">
          <h2 id="modes-title">Aquí no buscas pareja. Buscas equipo.</h2>
          <p className="lead">
            UniMatch es una red universitaria: te muestra personas con tus mismos intereses, habilidades y horarios. Elige qué buscas hoy.
          </p>
        </div>
        <div className="modes">
          {MODES.map((m) => {
            const isOpen = openMode === m.id;
            return (
              <div key={m.id} className={`mode${isOpen ? " open" : ""}`}>
                <h3>
                  <button
                    className="mode-b"
                    aria-expanded={isOpen}
                    aria-controls={m.id}
                    type="button"
                    onClick={() => toggleMode(m.id)}
                  >
                    {m.title}
                    <span className="pm" aria-hidden="true"></span>
                  </button>
                </h3>
                <div className="mode-p" id={m.id} role="region">
                  <div>
                    <div className="mode-in">
                      <div>
                        <p>{m.text}</p>
                        <div className="pills">
                          {m.pills.map((p) => (
                            <span key={p} className="pill">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ex">
                        <b>{m.example.title}</b>
                        {m.example.rows.map((r) => (
                          <div key={r.text} className="ex-r">
                            <Icon name={r.icon} />
                            {r.text}
                          </div>
                        ))}
                      </div>
                    </div>
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
