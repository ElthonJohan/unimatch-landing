import Link from "next/link";
import { Iso } from "./Icon";

/** Logo de UniMatch: lleva al inicio. */
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="UniMatch, ir al inicio">
      <Iso />
      <span>
        Uni<span className="m">Match</span>
      </span>
    </Link>
  );
}
