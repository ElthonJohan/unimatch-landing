"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cssVars } from "@/lib/css-vars";

/** Nodos alrededor de "Tú": círculo + etiqueta. */
const NODES = [
  { i: 1, cx: 80, cy: 90, fill: "#4E8A7E", label: "Otra sede" },
  { i: 2, cx: 400, cy: 80, fill: "#3D6FB4", label: "Otra universidad" },
  { i: 3, cx: 60, cy: 300, fill: "#3D6FB4", label: "Otra universidad" },
  { i: 4, cx: 410, cy: 330, fill: "#4E8A7E", label: "Otra sede" },
  { i: 5, cx: 230, cy: 400, fill: "#3D6FB4", label: "Otra universidad" },
];

const FAINT_LINES = ["M80 90L400 80", "M60 300L80 90", "M410 330L400 80", "M60 300L230 400L410 330"];
const CORE_LINES = ["M240 220L80 90", "M240 220L400 80", "M240 220L60 300", "M240 220L410 330", "M240 220L230 400"];

export function Premium() {
  const [inView, setInView] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec premium" id="premium" aria-labelledby="prem-title">
      <div className="wrap premium-grid">
        <div>
          <h2 id="prem-title">Haz match más allá de tu sede</h2>
          <p className="lead">
            Con UniMatch Premium conectas con estudiantes de otras sedes y de otras universidades. Tu próximo equipo puede estar en otra ciudad.
          </p>
          <a className="btn btn-light" href="#descargar">
            Crear cuenta
          </a>
        </div>
        <svg
          className={`net${inView ? " in" : ""}`}
          id="net"
          ref={svgRef}
          viewBox="0 0 480 440"
          role="img"
          aria-label="Tu sede conectada con otras sedes y otras universidades"
        >
          {FAINT_LINES.map((d, i) => (
            <path key={`f${i}`} className="ln f" pathLength={1} style={cssVars({ "--i": i })} d={d} />
          ))}
          {CORE_LINES.map((d, i) => (
            <path key={`c${i}`} className="ln" pathLength={1} style={cssVars({ "--i": i })} d={d} />
          ))}
          <circle className="halo" cx="240" cy="220" r="34" />
          <g className="nd" style={cssVars({ "--i": 0 })}>
            <circle cx="240" cy="220" r="34" fill="#C77B3B" />
            <text className="core" x="240" y="226">Tú</text>
          </g>
          {NODES.map((n) => (
            <Fragment key={n.i}>
              <g className="nd" style={cssVars({ "--i": n.i })}>
                <circle cx={n.cx} cy={n.cy} r="12" fill={n.fill} />
              </g>
              <text className="lb" style={cssVars({ "--i": n.i })} x={n.cx} y={n.cy + 32}>
                {n.label}
              </text>
            </Fragment>
          ))}
        </svg>
      </div>
    </section>
  );
}
