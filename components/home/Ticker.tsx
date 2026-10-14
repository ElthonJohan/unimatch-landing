const CAREERS = [
  "Ingeniería de Sistemas", "Marketing", "Arquitectura", "Derecho", "Psicología",
  "Medicina", "Administración", "Diseño Gráfico", "Contabilidad", "Comunicaciones",
];

const INTERESTS = [
  "IA", "Diseño UX", "Fútbol", "Música", "Investigación", "Emprendimiento",
  "Programación", "Idiomas", "Voluntariado", "Startups", "Anime", "Java", "React",
];

/** Fila infinita: el segundo set (aria-hidden) duplica el primero para el loop. */
function TickerRow({ items, dir }: { items: string[]; dir: "l" | "r" }) {
  return (
    <div className={`tk-row ${dir}`}>
      <div className="tk-set">
        {items.map((t) => <span key={t} className="tk">{t}</span>)}
      </div>
      <div className="tk-set" aria-hidden="true">
        {items.map((t) => <span key={t} className="tk">{t}</span>)}
      </div>
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-label="Carreras e intereses que se encuentran en UniMatch">
      <TickerRow items={CAREERS} dir="l" />
      <TickerRow items={INTERESTS} dir="r" />
    </div>
  );
}
