import { Faq } from "./Faq";
import { Features } from "./Features";
import { FinalCta } from "./FinalCta";
import { Hero } from "./Hero";
import { Modes } from "./Modes";
import { Premium } from "./Premium";
import { Story } from "./Story";
import { Ticker } from "./Ticker";

/** Vista de inicio: todas las secciones de la landing en orden. */
export function HomeView() {
  return (
    <div id="view-home">
      <Hero />
      <Ticker />
      <Modes />
      <Story />
      <Features />
      <Premium />
      <Faq />
      <FinalCta />
    </div>
  );
}
