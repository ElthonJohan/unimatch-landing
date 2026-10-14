import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/navigation";

export function Footer({ isTermsPage = false }: { isTermsPage?: boolean }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo />
            <p>La red universitaria para estudiar, crear y vivir mejor tu experiencia en el campus.</p>
          </div>
          <div>
            <h4>Explora</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={isTermsPage ? `/#${l.id}` : `#${l.id}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/terminos">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 UniMatch. Todos los derechos reservados.</span>
          <span>Hecho para estudiantes universitarios.</span>
        </div>
      </div>
    </footer>
  );
}
