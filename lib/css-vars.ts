import type { CSSProperties } from "react";

/**
 * Permite usar variables CSS (p. ej. `--i`, `--w`, `--d`) en la prop `style`
 * de React manteniendo el tipado de TypeScript.
 */
export function cssVars(
  style: Record<string, string | number>
): CSSProperties {
  return style as CSSProperties;
}
