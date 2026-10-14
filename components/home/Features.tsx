"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cssVars } from "@/lib/css-vars";

const FEAT_TITLE_STYLE: CSSProperties = {
  fontSize: "clamp(1.6rem,3vw,2.2rem)",
  lineHeight: 1.1,
  letterSpacing: "-.035em",
};

function FeatureText({
  title,
  text,
  hintIcon,
  hint,
}: {
  title: string;
  text: string;
  hintIcon: IconName;
  hint: string;
}) {
  return (
    <div className="feat-txt">
      <h3 style={FEAT_TITLE_STYLE}>{title}</h3>
      <p>{text}</p>
      <div className="hint">
        <Icon name={hintIcon} />
        {hint}
      </div>
    </div>
  );
}

function Feature({ flip, children }: { flip?: boolean; children: ReactNode }) {
  return <div className={flip ? "feat flip" : "feat"}>{children}</div>;
}

/* ==================== DEMO 1: HORARIOS EN COMÚN ==================== */
const DAYS = ["L", "M", "M", "J", "V"];
const DAY_NAMES = ["lunes", "martes", "miércoles", "jueves", "viernes"];
const ROW_NAMES = ["Mañana", "Tarde", "Noche"];
const ROW_DESCS = ["por la mañana", "por la tarde", "por la noche"];
const ME_SCHEDULE = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1],
];

const PEOPLE = [
  {
    name: "Camila",
    schedule: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1],
    ],
  },
  {
    name: "Rodrigo",
    schedule: [
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 1, 1, 0, 1],
    ],
  },
  {
    name: "María",
    schedule: [
      [1, 1, 0, 1, 0],
      [1, 0, 1, 1, 1],
      [0, 0, 0, 1, 1],
    ],
  },
];

function HeatDemo() {
  const [personIndex, setPersonIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const currentPerson = PEOPLE[personIndex];

  // Calcular coincidencias
  let commonCount = 0;
  let firstMatch: string | null = null;

  for (let c = 0; c < 5; c++) {
    for (let r = 0; r < 3; r++) {
      const isMe = ME_SCHEDULE[r][c] === 1;
      const isThey = currentPerson.schedule[r][c] === 1;
      if (isMe && isThey) {
        commonCount++;
        if (!firstMatch) {
          firstMatch = `${DAY_NAMES[c]} ${ROW_DESCS[r]}`;
        }
      }
    }
  }

  const demoClasses = `demo${isInView ? " in ready" : ""}`;

  return (
    <div className={demoClasses} id="demo-heat" ref={containerRef}>
      <div className="demo-top">
        <span className="demo-lbl">Comparar con</span>
        <div className="seg" role="group" aria-label="Elegir persona">
          {PEOPLE.map((p, idx) => {
            const isSelected = idx === personIndex;
            return (
              <button
                key={p.name}
                type="button"
                className={isSelected ? "on" : undefined}
                aria-pressed={isSelected}
                onClick={() => setPersonIndex(idx)}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="heat" role="img" aria-label="Disponibilidad semanal comparada">
        {/* Esquina superior izquierda vacía */}
        <span></span>
        {/* Cabeceras de días */}
        {DAYS.map((d, i) => (
          <span key={i} className="hh" aria-hidden="true">
            {d}
          </span>
        ))}

        {/* Filas con franja horaria */}
        {ROW_NAMES.map((rowName, rIdx) => (
          <div key={rowName} style={{ display: "contents" }}>
            <span className="hr">{rowName}</span>
            {DAYS.map((_, cIdx) => {
              const isMe = ME_SCHEDULE[rIdx][cIdx] === 1;
              const isThey = currentPerson.schedule[rIdx][cIdx] === 1;
              let cellClass = "hc";
              if (isMe && isThey) cellClass += " both";
              else if (isMe) cellClass += " me";
              else if (isThey) cellClass += " they";

              return (
                <div
                  key={cIdx}
                  className={cellClass}
                  style={cssVars({ "--r": rIdx, "--c": cIdx })}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="heat-legend">
        <span>
          <i style={{ background: "var(--text)", opacity: 0.88 }}></i>Solo tú
        </span>
        <span>
          <i style={{ background: "var(--teal)" }}></i>Solo {currentPerson.name}
        </span>
        <span>
          <i style={{ background: "var(--amber)" }}></i>En común
        </span>
      </div>

      <p className="heat-out" aria-live="polite">
        <strong>{commonCount} franjas en común.</strong> Primera coincidencia:{" "}
        {firstMatch || "ninguna"}.
      </p>
    </div>
  );
}

/* ==================== DEMO 2: PROPUESTA DE PLAN ==================== */
function PlanDemo() {
  const [planState, setPlanState] = useState<"idle" | "ok" | "no">("idle");
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  function handleAction(action: "ok" | "no") {
    setPlanState(action);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setPlanState("idle");
    }, 6500);
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <div className="demo" id="demo-plan" data-state={planState}>
      <div className="cd-head">
        <span className="av">CR</span>
        <div>
          <b>Camila Rojas</b>
          <small>En línea</small>
        </div>
      </div>
      <div className="cd-body">
        <div className="bub in">¿Te animas a armar el proyecto de investigación?</div>
        <div className="bub out">¡Claro! ¿Dónde nos vemos?</div>
        <div className="plan">
          <div className="plan-h">
            <Icon name="cal" />
            Propuesta de plan
          </div>
          <div className="plan-r">
            <Icon name="pin" />
            Biblioteca central
          </div>
          <div className="plan-r">
            <Icon name="clock" />
            Mañana, 3:00 p. m.
          </div>
          <div className="plan-act">
            <div>
              <button
                className="ok"
                type="button"
                onClick={() => handleAction("ok")}
              >
                Aceptar
              </button>
              <button
                className="no"
                type="button"
                onClick={() => handleAction("no")}
              >
                Rechazar
              </button>
            </div>
          </div>
          <div className="plan-st" aria-live="polite">
            <div>
              <span className="y">
                <Icon name="check" />
                Plan confirmado
              </span>
              <span className="n">
                <Icon name="x" />
                Plan rechazado
              </span>
            </div>
          </div>
        </div>

        <div className={`reply ok${planState === "ok" ? " show" : ""}`}>
          <div>
            <div className="bub out">Confirmado, nos vemos ahí.</div>
          </div>
        </div>
        <div className={`reply no${planState === "no" ? " show" : ""}`}>
          <div>
            <div className="bub out">A esa hora no puedo, ¿probamos otro día?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== DEMO 3: SESIÓN CON CUPO ==================== */
const BASE_ATTENDEES = [
  { initials: "MF", bg: "#23262B" },
  { initials: "RS", bg: "#C77B3B" },
  { initials: "JP", bg: "#3A3F47" },
  { initials: "CR", bg: "#5B7A6B" },
];
const MAX_SEATS = 6;

function SessionDemo() {
  const [joined, setJoined] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCount = BASE_ATTENDEES.length + (joined ? 1 : 0);
  const progressPercent = (currentCount / MAX_SEATS) * 100;

  return (
    <div
      className={`demo${isInView ? " in" : ""}`}
      id="demo-sess"
      ref={containerRef}
    >
      <div className="s-top">
        <div className="s-ic">
          <Icon name="book" />
        </div>
        <div>
          <b>Grupo de estudio: Cálculo II</b>
          <small>Matemática</small>
        </div>
      </div>
      <div className="s-rows">
        <div>
          <Icon name="cal" />
          mar, 22 set. a las 4:00 p. m.
        </div>
        <div>
          <Icon name="pin" />
          Biblioteca central
        </div>
      </div>
      <div className="s-bar">
        <i style={{ width: `${progressPercent}%` }}></i>
      </div>
      <div className="s-foot">
        <div className="s-av">
          <div className="s-av-list" style={{ display: "flex" }}>
            {BASE_ATTENDEES.map((a) => (
              <i key={a.initials} style={{ background: a.bg }}>
                {a.initials}
              </i>
            ))}
            {joined && (
              <i className="me" style={{ background: "var(--amber)", color: "#23262B" }}>
                Tú
              </i>
            )}
          </div>
          <span className="s-count">
            {currentCount} de {MAX_SEATS} cupos
          </span>
        </div>
        <button
          id="joinBtn"
          type="button"
          aria-pressed={joined}
          onClick={() => setJoined((prev) => !prev)}
        >
          {joined ? "Salir" : "Unirme"}
        </button>
      </div>
      <p className="s-msg" aria-live="polite">
        {joined
          ? "Ya estás en la sesión. Queda 1 cupo."
          : "Quedan 2 cupos disponibles."}
      </p>
    </div>
  );
}

/* ==================== FEATURES SECTION ==================== */
export function Features() {
  return (
    <section className="sec" id="funciones" aria-labelledby="feat-title">
      <div className="wrap">
        <div className="feat-head">
          <h2 id="feat-title">Menos chats perdidos, más reuniones que sí suceden</h2>
          <p className="lead" style={{ marginTop: "22px" }}>
            Prueba tres de las cosas que hacen que organizarte con otras personas sea simple.
          </p>
        </div>

        <Feature>
          <FeatureText
            title="Encuentra horarios en común"
            text="Compara tu disponibilidad semanal con la de otra persona y mira de inmediato cuándo pueden reunirse."
            hintIcon="users"
            hint="Cambia de persona y mira cómo se actualiza"
          />
          <HeatDemo />
        </Feature>

        <Feature flip>
          <FeatureText
            title="Propón el plan sin salir del chat"
            text="Elige lugar y hora, envíalo como propuesta y la otra persona responde con un toque. Nada de perderte entre mensajes."
            hintIcon="check"
            hint="Toca Aceptar o Rechazar en la propuesta"
          />
          <PlanDemo />
        </Feature>

        <Feature>
          <FeatureText
            title="Sesiones con cupo limitado"
            text="Crea una sesión de estudio o de actividad y mira quién se une. Los cupos se llenan a la vista de todos."
            hintIcon="plus"
            hint="Únete a la sesión de ejemplo"
          />
          <SessionDemo />
        </Feature>
      </div>
    </section>
  );
}
