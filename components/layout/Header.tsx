"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cssVars } from "@/lib/css-vars";
import { NAV_LINKS } from "@/lib/navigation";

export function Header({ isTermsPage = false }: { isTermsPage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Escuchar scroll para fondo de nav y scrollspy
  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (!isTermsPage) {
        let cur: string | null = null;
        NAV_LINKS.forEach((l) => {
          const el = document.getElementById(l.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
            cur = l.id;
          }
        });
        setActiveSection(cur);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTermsPage]);

  // Cerrar menú con Escape y bloquear scroll del body
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const navClasses = `nav${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`;

  return (
    <>
      <header className={navClasses}>
        <div className="nav-in">
          <Logo />
          <nav className="nav-links" aria-label="Principal">
            {NAV_LINKS.map((l) => {
              const href = isTermsPage ? `/#${l.id}` : `#${l.id}`;
              const isActive = !isTermsPage && activeSection === l.id;
              return (
                <a
                  key={l.id}
                  href={href}
                  className={isActive ? "on" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
            <Link
              href="/terminos"
              className={isTermsPage ? "on" : undefined}
            >
              Términos y condiciones
            </Link>
          </nav>
          <div className="nav-right">
            <a className="btn btn-primary btn-sm" href="#descargar">
              Crear cuenta
            </a>
            <button
              className="burger"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="menu"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <i></i>
              <i></i>
              <i></i>
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`menu${menuOpen ? " open" : ""}`}
        id="menu"
        aria-label="Menú móvil"
      >
        {NAV_LINKS.map((l, i) => {
          const href = isTermsPage ? `/#${l.id}` : `#${l.id}`;
          return (
            <a
              key={l.id}
              href={href}
              style={cssVars({ "--i": i })}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          );
        })}
        <Link
          href="/terminos"
          style={cssVars({ "--i": NAV_LINKS.length })}
          onClick={() => setMenuOpen(false)}
        >
          Términos y condiciones
        </Link>
        <a
          className="btn btn-primary"
          href="#descargar"
          onClick={() => setMenuOpen(false)}
        >
          Crear cuenta
        </a>
      </nav>
    </>
  );
}
