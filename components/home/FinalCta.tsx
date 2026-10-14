export function FinalCta() {
  return (
    <section className="sec cta on-amber" id="descargar" aria-labelledby="cta-title">
      <div className="wrap">
        <h2 id="cta-title">Tu comunidad universitaria comienza aquí.</h2>
        <p>Crea tu perfil, encuentra a tu gente y arma tu primera sesión esta semana.</p>
        <div className="hero-cta">
          {/* TODO: reemplaza estos enlaces por los reales (registro y descarga) */}
          <a className="btn btn-primary" href="#" data-cta="">
            Crear cuenta
          </a>
          <a className="btn btn-ghost" href="#" data-cta="">
            Descargar la app
          </a>
        </div>
      </div>
    </section>
  );
}
