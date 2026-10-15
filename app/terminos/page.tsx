import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TermsView } from "@/components/terms/TermsView";
import { SvgSprite } from "@/components/ui/SvgSprite";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Reglas, condiciones de uso y privacidad de la plataforma UniMatch.",
  alternates: { canonical: "/terminos" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/terminos",
    title: "Términos y condiciones — UniMatch",
    description: "Reglas, condiciones de uso y privacidad de la plataforma UniMatch.",
  },
};

export default function TerminosPage() {
  return (
    <>
      <SvgSprite />
      <Header isTermsPage={true} />
      <main id="main" tabIndex={-1}>
        <TermsView />
      </main>
      <Footer isTermsPage={true} />
    </>
  );
}
