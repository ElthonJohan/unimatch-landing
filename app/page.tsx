import { HomeView } from "@/components/home/HomeView";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SvgSprite } from "@/components/ui/SvgSprite";

export default function Page() {
  return (
    <>
      <SvgSprite />
      <ProgressBar />
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HomeView />
      </main>
      <Footer />
    </>
  );
}
