"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PhoneMockup } from "./PhoneMockup";

const STEPS = [
  {
    title: "Crea tu perfil en cinco pasos",
    text: "Cuéntanos tu nombre, sede y año académico. Después suma tus intereses, habilidades, asignaturas y los horarios en que puedes reunirte.",
    bullets: ["Hasta 6 fotos para mostrar quién eres", "Disponibilidad por mañana, tarde y noche"],
  },
  {
    title: "Descubre personas con intereses en común",
    text: "Elige Estudio, Actividades o Networking y revisa perfiles con lo que comparten contigo. Conecta con quien quieras y deja pasar al resto.",
    bullets: ["Ves cuántos intereses tienen en común", "Las solicitudes se aceptan o se rechazan"],
  },
  {
    title: "Chatea y propón un plan",
    text: "Cuando conectan, conversan dentro de la app y proponen un lugar y una hora sin salir del chat.",
    bullets: ["Cada conversación muestra por qué hicieron match", "La propuesta se confirma con un toque"],
  },
  {
    title: "Reúnanse en una sesión",
    text: "Crea o únete a sesiones de estudio y de actividades con cupo limitado. Ves quién va y llegas con tu grupo listo.",
    bullets: ["Fecha, lugar y cupos a la vista", "Sesiones de estudio o de actividad"],
  },
];

export function Story() {
  const [activeStep, setActiveStep] = useState(0);
  const userInteractedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Sincronizar scroll en pantallas de escritorio
  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const isDesktop = window.matchMedia("(min-width: 1021px)").matches;
      if (!isDesktop) return;

      const mid = window.innerHeight * 0.5;
      let matchedIdx = 0;

      stepsRef.current.forEach((el, idx) => {
        if (el && el.getBoundingClientRect().top < mid) {
          matchedIdx = idx;
        }
      });

      setActiveStep(matchedIdx);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avance automático en pantallas pequeñas solo si el usuario no ha interactuado
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1021px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isDesktop || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!userInteractedRef.current) {
        setActiveStep((prev) => (prev + 1) % STEPS.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function handleStepClick(index: number) {
    userInteractedRef.current = true;
    setActiveStep(index);
  }

  // Progreso de la línea vertical
  const progressPercent = (activeStep / (STEPS.length - 1));

  return (
    <section
      className="sec story"
      id="como-funciona"
      aria-labelledby="story-title"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="story-head">
          <h2 id="story-title">Del perfil al plan en cuatro pasos</h2>
        </div>
        <div className="story-grid">
          <div className="story-phone">
            <PhoneMockup activeStep={activeStep} onStepChange={handleStepClick} />
          </div>

          <ol className="steps" style={{ listStyle: "none" }}>
            <li className="steps-track" aria-hidden="true" role="presentation">
              <div
                className="steps-fill"
                style={{ transform: `scaleY(${progressPercent})` }}
              ></div>
            </li>
            {STEPS.map((s, k) => {
              const isActive = activeStep === k;
              return (
                <li
                  key={s.title}
                  className={`step${isActive ? " active" : ""}`}
                  ref={(el) => {
                    stepsRef.current[k] = el;
                  }}
                >
                  <span className="step-n" aria-hidden="true">
                    {k + 1}
                  </span>
                  <h3>
                    <button
                      className="step-btn"
                      aria-expanded={isActive}
                      type="button"
                      onClick={() => handleStepClick(k)}
                    >
                      {s.title}
                    </button>
                  </h3>
                  <div className="step-body">
                    <div>
                      <p>{s.text}</p>
                      <ul>
                        {s.bullets.map((b) => (
                          <li key={b}>
                            <Icon name="check" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
