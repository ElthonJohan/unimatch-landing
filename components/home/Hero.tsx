"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cssVars } from "@/lib/css-vars";

const TITLE_LINES = ["Conecta con", "estudiantes que", "comparten tus", "intereses"];

/** Líneas base punteadas y líneas ámbar animadas entre las tarjetas. */
const PATHS = ["M120 100L400 190", "M400 190L380 450", "M380 450L110 350", "M110 350L120 100"];

const PEOPLE = [
  { n: 0, left: 120, top: 100, i: 0, initials: "JC", bg: "#23262B", career: "Ing. de Sistemas", interests: "Programación, IA" },
  { n: 1, left: 400, top: 190, i: 1, initials: "MF", bg: "#5B7A6B", career: "Marketing", interests: "Diseño, Startups" },
  { n: 2, left: 110, top: 350, i: 3, initials: "DL", bg: "#C77B3B", color: "#23262B", career: "Arquitectura", interests: "Diseño, Música" },
  { n: 3, left: 380, top: 450, i: 2, initials: "SA", bg: "#3A3F47", career: "Derecho", interests: "Idiomas, Fútbol" },
];

const CHIPS = [
  { c: "IA", left: 290, top: 40 },
  { c: "Programación", left: 62, top: 176 },
  { c: "Diseño", left: 250, top: 256 },
  { c: "Emprendimiento", left: 430, top: 272 },
  { c: "Investigación", left: 440, top: 372 },
  { c: "Fútbol", left: 56, top: 470 },
  { c: "Música", left: 200, top: 492 },
  { c: "Idiomas", left: 350, top: 528 },
];

const MATCH_LABELS: { icon: IconName; text: string; left: number; top: number }[] = [
  { icon: "spark", text: "3 intereses en común", left: 260, top: 145 },
  { icon: "book", text: "Proyecto universitario", left: 390, top: 320 },
  { icon: "cal", text: "Evento este viernes", left: 245, top: 400 },
  { icon: "users", text: "Grupo de estudio", left: 115, top: 225 },
];

const PAIRS = [
  { a: 0, b: 1, chips: ["IA", "Programación", "Diseño"] },
  { a: 1, b: 3, chips: ["Emprendimiento", "Investigación"] },
  { a: 3, b: 2, chips: ["Idiomas", "Música"] },
  { a: 2, b: 0, chips: ["Fútbol", "Diseño"] },
];

export function Hero() {
  const [activePair, setActivePair] = useState<number | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Escalar el stage si la pantalla es estrecha (< 520px)
  useEffect(() => {
    function handleResize() {
      if (wrapRef.current && stageRef.current) {
        const avail = wrapRef.current.clientWidth;
        const scale = Math.min(1, avail / 520);
        stageRef.current.style.zoom = String(scale);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bucle de conexiones animadas
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setActivePair(0);
        setShowLabel(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let current = 0;
    let labelTimeout: NodeJS.Timeout;
    let switchTimeout: NodeJS.Timeout;

    function step() {
      setActivePair(current);
      setShowLabel(false);

      labelTimeout = setTimeout(() => {
        setShowLabel(true);
      }, 700);

      switchTimeout = setTimeout(() => {
        setActivePair(null);
        setShowLabel(false);
        setTimeout(() => {
          current = (current + 1) % PAIRS.length;
          step();
        }, 450);
      }, 3500);
    }

    const startTimer = setTimeout(step, 2000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(labelTimeout);
      clearTimeout(switchTimeout);
    };
  }, []);

  const activePairData = activePair !== null ? PAIRS[activePair] : null;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <h1 id="hero-title">
            {TITLE_LINES.map((line, i) => (
              <span key={line} className="ln">
                <span style={cssVars({ "--i": i })}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="lead fade" style={cssVars({ "--i": 0 })}>
            Encuentra personas para estudiar, crear proyectos, asistir a eventos, practicar deportes y vivir mejor tu experiencia universitaria.
          </p>
          <div className="hero-cta fade" style={cssVars({ "--i": 1 })}>
            <a className="btn btn-primary" href="#descargar">
              Crear cuenta
            </a>
            <a className="btn btn-ghost" href="#como-funciona">
              Ver cómo funciona
            </a>
          </div>
          <p className="hero-note fade" style={cssVars({ "--i": 2 })}>
            <Icon name="shield" />
            Solo para estudiantes universitarios. Te registras con tu correo universitario.
          </p>
        </div>

        <div className="stage-wrap" ref={wrapRef}>
          <div
            className="stage"
            data-fit="520"
            id="stage"
            ref={stageRef}
            role="img"
            aria-label="Cuatro estudiantes de distintas carreras conectándose por intereses en común"
          >
            <svg className="lines" viewBox="0 0 520 560" aria-hidden="true">
              {PATHS.map((d, i) => (
                <path key={`b${i}`} className="base-l" style={cssVars({ "--i": i })} d={d} />
              ))}
              {PATHS.map((d, i) => {
                const isDrawn = activePair === i;
                return (
                  <path
                    key={`a${i}`}
                    className={`al${isDrawn ? " draw" : ""}`}
                    pathLength={1}
                    d={d}
                  />
                );
              })}
            </svg>

            {PEOPLE.map((p) => {
              const isOn = activePairData ? activePairData.a === p.n || activePairData.b === p.n : false;
              return (
                <div
                  key={p.n}
                  className={`pn${isOn ? " on" : ""}`}
                  data-n={p.n}
                  style={cssVars({ left: `${p.left}px`, top: `${p.top}px`, "--i": p.i })}
                >
                  <div className="pcard">
                    <div className="pav" style={p.color ? { background: p.bg, color: p.color } : { background: p.bg }}>
                      {p.initials}
                    </div>
                    <div>
                      <div className="pt">{p.career}</div>
                      <div className="ps">{p.interests}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {CHIPS.map((chip, i) => {
              const isOn = activePairData ? activePairData.chips.includes(chip.c) : false;
              return (
                <div
                  key={chip.c}
                  className={`chip-f${isOn ? " on" : ""}`}
                  data-c={chip.c}
                  style={cssVars({ left: `${chip.left}px`, top: `${chip.top}px`, "--i": i })}
                >
                  <span>{chip.c}</span>
                </div>
              );
            })}

            {MATCH_LABELS.map((l, i) => {
              const isOn = activePair === i && showLabel;
              return (
                <div
                  key={l.text}
                  className={`mlabel${isOn ? " on" : ""}`}
                  style={{ left: `${l.left}px`, top: `${l.top}px` }}
                >
                  <Icon name={l.icon} />
                  {l.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
