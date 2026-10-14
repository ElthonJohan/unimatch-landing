export type IconName =
  | "spark"
  | "users"
  | "chat"
  | "cal"
  | "user"
  | "pin"
  | "clock"
  | "check"
  | "x"
  | "book"
  | "plus"
  | "back"
  | "shield"
  | "heart"
  | "lock"
  | "grad"
  | "doc";

/** Icono de línea que referencia un símbolo del sprite (`#i-<name>`). */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="i" aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Isotipo de UniMatch (símbolo `#iso` del sprite). */
export function Iso() {
  return (
    <svg aria-hidden="true">
      <use href="#iso" />
    </svg>
  );
}
