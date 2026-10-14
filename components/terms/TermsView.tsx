"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

const KEY_POINTS: { icon: IconName; title: string; text: string }[] = [
  { icon: "grad", title: "Solo estudiantes", text: "Necesitas ser estudiante universitario y registrarte con tu correo universitario." },
  { icon: "heart", title: "Respeto ante todo", text: "Cero acoso, discriminación o suplantación. UniMatch no es una app de citas." },
  { icon: "shield", title: "Encuentros con cuidado", text: "Reúnete en lugares públicos. No organizamos ni supervisamos los encuentros." },
  { icon: "lock", title: "Tus datos, con reglas", text: "Se tratan según la Ley N.º 29733 y puedes ejercer tus derechos sobre ellos." },
];

const SECTIONS_META = [
  { n: 1, toc: "Aceptación", title: "Aceptación de los términos" },
  { n: 2, toc: "Definiciones", title: "Definiciones" },
  { n: 3, toc: "Quién puede usarla", title: "Quién puede usar UniMatch" },
  { n: 4, toc: "Tu cuenta", title: "Tu cuenta y su seguridad" },
  { n: 5, toc: "Cómo funciona", title: "Cómo funciona el servicio" },
  { n: 6, toc: "Reglas de convivencia", title: "Reglas de convivencia" },
  { n: 7, toc: "Tu contenido", title: "Contenido que publicas" },
  { n: 8, toc: "Encuentros presenciales", title: "Sesiones y encuentros presenciales" },
  { n: 9, toc: "Premium", title: "UniMatch Premium" },
  { n: 10, toc: "Privacidad y datos", title: "Privacidad y datos personales" },
  { n: 11, toc: "Propiedad intelectual", title: "Propiedad intelectual" },
  { n: 12, toc: "Reportes y moderación", title: "Reportes, moderación y suspensión" },
  { n: 13, toc: "Disponibilidad", title: "Disponibilidad del servicio" },
  { n: 14, toc: "Responsabilidad", title: "Limitación de responsabilidad" },
  { n: 15, toc: "Eliminar tu cuenta", title: "Eliminación de cuenta y terminación" },
  { n: 16, toc: "Cambios", title: "Cambios en estos términos" },
  { n: 17, toc: "Ley aplicable", title: "Ley aplicable y controversias" },
  { n: 18, toc: "Contacto", title: "Contacto" },
];

function Ph({ children }: { children: ReactNode }) {
  return <mark className="ph">{children}</mark>;
}

function TSec({
  n,
  toc,
  title,
  children,
}: {
  n: number;
  toc: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="t-sec" id={`t${n}`} data-t={toc}>
      <h2>
        <span className="n">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function TermsView() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tocBoxRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function handleScroll() {
      const isDesktop = window.matchMedia("(min-width: 1021px)").matches;
      const navH = 68;
      const lim = navH + (isDesktop ? 90 : 150);

      let matched = 0;
      SECTIONS_META.forEach((s, idx) => {
        const el = document.getElementById(`t${s.n}`);
        if (el && el.getBoundingClientRect().top <= lim) {
          matched = idx;
        }
      });

      setActiveIdx(matched);

      // Posicionar el indicador marker
      const activeLink = linkRefs.current[matched];
      const li = activeLink?.parentElement;
      if (isDesktop && markerRef.current && li) {
        markerRef.current.style.transform = `translateY(${li.offsetTop}px)`;
        markerRef.current.style.height = `${li.offsetHeight}px`;
      }
      // En móvil, centrar la pastilla activa en el scroll horizontal
      if (!isDesktop && activeLink) {
        activeLink.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Si se entra con un hash en la URL (ej. /terminos#t3), desplazarse suavemente a él
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          const navH = 68;
          const y = el.getBoundingClientRect().top + window.scrollY - navH - 20;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  function handleTocClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navH = 68;
      const y = el.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        /* noop */
      }
    }
  }

  return (
    <div id="view-terms">
      <section className="t-hero">
        <div className="wrap">
          <h1>Términos y condiciones</h1>
          <p className="t-meta">
            <Icon name="doc" />
            Última actualización: 14 de octubre de 2026
          </p>
          <p className="lead">
            Estas son las reglas de UniMatch. Léelas con calma: explican cómo usar la app, cómo cuidamos la comunidad y qué esperamos de ti.
          </p>
          <div className="t-key">
            {KEY_POINTS.map((k) => (
              <div key={k.title}>
                <Icon name={k.icon} />
                <b>{k.title}</b>
                <p>{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap t-layout">
        <aside className="t-toc" aria-label="Contenido de los términos" ref={tocBoxRef}>
          <h2>En esta página</h2>
          <ol ref={listRef} style={{ position: "relative" }}>
            <span
              className="toc-mk"
              ref={markerRef}
              aria-hidden="true"
            ></span>
            {SECTIONS_META.map((s, idx) => {
              const isActive = activeIdx === idx;
              return (
                <li key={s.n}>
                  <a
                    href={`#t${s.n}`}
                    className={isActive ? "on" : undefined}
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    onClick={(e) => handleTocClick(e, `t${s.n}`)}
                  >
                    {s.n}. {s.toc}
                  </a>
                </li>
              );
            })}
          </ol>
        </aside>

        <article className="t-body">
          <TSec n={1} toc="Aceptación" title="Aceptación de los términos">
            <p>Estos Términos y Condiciones (los «Términos») regulan el acceso y el uso de UniMatch (la «App»), una plataforma que ayuda a estudiantes universitarios a conectar con otras personas con intereses en común para estudiar, desarrollar proyectos, asistir a eventos, practicar deportes, participar en clubes, hacer networking y colaborar en actividades universitarias.</p>
            <p>Al crear una cuenta, iniciar sesión o usar la App, declaras que leíste estos Términos y que los aceptas. Si no estás de acuerdo con alguno de ellos, no uses la App.</p>
            <p>La App es ofrecida por <Ph>[nombre o razón social del titular de UniMatch]</Ph> (el «Titular» o «nosotros»).</p>
          </TSec>

          <TSec n={2} toc="Definiciones" title="Definiciones">
            <ul>
              <li><strong>App:</strong> la aplicación móvil UniMatch y los servicios asociados a ella.</li>
              <li><strong>Usuario:</strong> toda persona que crea una cuenta y usa la App.</li>
              <li><strong>Perfil:</strong> la información que publicas sobre ti, como nombre, sede, carrera, año académico, fotos, intereses, habilidades, asignaturas y disponibilidad.</li>
              <li><strong>Match y conexión:</strong> la sugerencia que hace la App de personas con intereses en común y la relación que se forma cuando una solicitud de conexión es aceptada.</li>
              <li><strong>Sesión:</strong> encuentro de estudio o de actividad que un Usuario crea en la App y al que otros pueden unirse, con un cupo limitado.</li>
              <li><strong>Propuesta de plan:</strong> mensaje dentro del chat que sugiere un lugar y una hora para reunirse.</li>
              <li><strong>Premium:</strong> suscripción opcional que habilita funciones adicionales, como el match con otras sedes y universidades.</li>
              <li><strong>Contenido del Usuario:</strong> todo lo que publicas o envías en la App, como fotos, textos, mensajes, propuestas y sesiones.</li>
            </ul>
          </TSec>

          <TSec n={3} toc="Quién puede usarla" title="Quién puede usar UniMatch">
            <p>Para usar la App debes:</p>
            <ul>
              <li>Ser estudiante universitario activo.</li>
              <li>Tener al menos 18 años o la mayoría de edad que corresponda en tu país.</li>
              <li>Registrarte con un correo universitario válido. Podemos pedirte que lo verifiques o que confirmes tu condición de estudiante.</li>
              <li>Tener una sola cuenta personal y brindar información veraz, completa y actualizada (nombre, sede, carrera y año académico).</li>
            </ul>
            <p>Podemos negar el registro o suspender cuentas cuando no se cumplan estos requisitos.</p>
          </TSec>

          <TSec n={4} toc="Tu cuenta" title="Tu cuenta y su seguridad">
            <ul>
              <li>Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad que ocurra en tu cuenta.</li>
              <li>No compartas ni transfieras tu cuenta a otra persona.</li>
              <li>Avísanos sin demora si sospechas de un uso no autorizado.</li>
              <li>Puedes cambiar tu nombre, correo y contraseña desde Ajustes.</li>
            </ul>
          </TSec>

          <TSec n={5} toc="Cómo funciona" title="Cómo funciona el servicio">
            <p>La App te permite:</p>
            <ul>
              <li>Elegir el tipo de match (Estudio, Actividades o Networking) y ver perfiles con intereses, habilidades, asignaturas y horarios en común.</li>
              <li>Enviar y responder solicitudes de conexión, que la otra parte puede aceptar o rechazar.</li>
              <li>Conversar por chat y enviar propuestas de plan.</li>
              <li>Crear sesiones o unirte a ellas según los cupos disponibles.</li>
              <li>Compartir tu disponibilidad semanal.</li>
            </ul>
            <p>Las sugerencias de match son orientativas. No garantizamos que encuentres compañeros, que alguien te responda ni que una sesión se realice. Nadie está obligado a conectar con otra persona.</p>
          </TSec>

          <TSec n={6} toc="Reglas de convivencia" title="Reglas de convivencia">
            <p>Para cuidar la comunidad, te comprometes a no:</p>
            <ul>
              <li>Acosar, amenazar, intimidar ni discriminar a otras personas por su origen, género, orientación sexual, religión, discapacidad, condición socioeconómica u otra característica.</li>
              <li>Publicar contenido sexual explícito, violento, ilegal o que atente contra la dignidad de las personas.</li>
              <li>Suplantar la identidad de otra persona ni usar datos falsos.</li>
              <li>Enviar spam, publicidad, ofertas comerciales o esquemas de venta sin autorización.</li>
              <li>Insistir en contactar a alguien que no quiere comunicarse contigo. UniMatch no es una app de citas.</li>
              <li>Obtener, compartir o vender exámenes, ni usar la App para entregar trabajos ajenos como propios u otras formas de deshonestidad académica.</li>
              <li>Extraer datos de otros usuarios de forma automatizada, interferir con el funcionamiento de la App o intentar acceder a cuentas o sistemas sin autorización.</li>
            </ul>
          </TSec>

          <TSec n={7} toc="Tu contenido" title="Contenido que publicas">
            <p>Eres responsable del contenido que publicas. Declaras que tienes derecho a usarlo y que no infringe derechos de terceros. Si en tus fotos aparecen otras personas, necesitas su consentimiento.</p>
            <p>Nos otorgas una licencia no exclusiva, gratuita y limitada para alojar, mostrar y procesar tu contenido dentro de la App, únicamente para operar y mejorar el servicio. La licencia termina cuando eliminas el contenido o tu cuenta, salvo por copias de respaldo temporales y por lo que otros usuarios ya hayan recibido en sus conversaciones.</p>
          </TSec>

          <TSec n={8} toc="Encuentros presenciales" title="Sesiones y encuentros presenciales">
            <p>UniMatch facilita el contacto entre usuarios, pero no organiza, supervisa ni verifica los encuentros que se acuerdan a través de la App. No somos parte de esos encuentros ni respondemos por lo que ocurra en ellos.</p>
            <p>Te recomendamos:</p>
            <ul>
              <li>Reunirte en lugares públicos y concurridos, como bibliotecas, aulas o áreas comunes del campus.</li>
              <li>Avisar a alguien de confianza dónde y con quién estarás.</li>
              <li>No compartir contraseñas, datos bancarios ni información sensible.</li>
              <li>Confiar en tu criterio y retirarte si algo te incomoda.</li>
              <li>Reportar en la App cualquier conducta indebida.</li>
            </ul>
            <p>En caso de emergencia, contacta a las autoridades locales; en Perú puedes llamar al 105 (Policía Nacional). El uso de los espacios de una universidad está sujeto a las reglas de esa institución. UniMatch es una plataforma independiente y, salvo que se indique expresamente, no está afiliada ni respaldada por ninguna universidad.</p>
          </TSec>

          <TSec n={9} toc="Premium" title="UniMatch Premium">
            <ul>
              <li>Premium es opcional y habilita funciones adicionales, como el match con otras sedes y universidades.</li>
              <li>El precio, la periodicidad y los medios de pago se muestran antes de contratar.</li>
              <li>Los pagos pueden procesarse mediante tiendas de aplicaciones (como Google Play o App Store) y se rigen también por las condiciones de esas tiendas.</li>
              <li>Si la suscripción se renueva automáticamente, puedes cancelarla antes de la fecha de renovación desde la tienda donde la contrataste.</li>
              <li>Los reembolsos se rigen por la política de la tienda y por la ley aplicable.</li>
              <li>Podemos cambiar los precios o las funciones de Premium con un aviso previo razonable.</li>
            </ul>
            <p>Esta sección no limita los derechos que te reconoce la normativa de protección al consumidor.</p>
          </TSec>

          <TSec n={10} toc="Privacidad y datos" title="Privacidad y datos personales">
            <p>Tratamos tus datos personales conforme a nuestra Política de Privacidad y a la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.</p>
            <p>Parte de tu Perfil (como tu nombre, sede, carrera, año académico, fotos, intereses y disponibilidad) es visible para otros usuarios según las funciones de la App. Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiéndonos a <Ph>[correo de contacto]</Ph>.</p>
          </TSec>

          <TSec n={11} toc="Propiedad intelectual" title="Propiedad intelectual">
            <p>La App, su diseño, el nombre y el logotipo de UniMatch y su código pertenecen al Titular o a sus licenciantes y están protegidos por la ley. Te concedemos una licencia personal, limitada, no exclusiva y revocable para usar la App conforme a estos Términos. No puedes copiar, modificar, distribuir, descompilar ni crear obras derivadas de la App.</p>
          </TSec>

          <TSec n={12} toc="Reportes y moderación" title="Reportes, moderación y suspensión">
            <p>Puedes reportar o bloquear a otros usuarios y contenidos que incumplan estos Términos. Podemos revisar los reportes, retirar contenido, advertir, suspender o cerrar cuentas, con o sin aviso previo según la gravedad de la falta, y colaborar con las autoridades cuando la ley lo exija.</p>
            <p>Si crees que una medida fue un error, escríbenos a <Ph>[correo de contacto]</Ph> y la revisaremos.</p>
          </TSec>

          <TSec n={13} toc="Disponibilidad" title="Disponibilidad del servicio">
            <p>Trabajamos para que la App funcione de forma continua, pero se ofrece «tal cual» y según disponibilidad. Puede haber interrupciones por mantenimiento, fallas técnicas o causas ajenas a nosotros. Podemos agregar, modificar o retirar funciones.</p>
          </TSec>

          <TSec n={14} toc="Responsabilidad" title="Limitación de responsabilidad">
            <p>En la medida permitida por la ley, el Titular no responde por:</p>
            <ul>
              <li>Las conductas de otros usuarios, dentro o fuera de la App.</li>
              <li>Los encuentros presenciales ni los daños que puedan ocurrir en ellos.</li>
              <li>El contenido publicado por usuarios o por terceros.</li>
              <li>Interrupciones o pérdidas de datos por causas fuera de nuestro control.</li>
              <li>Los resultados académicos, laborales o personales que esperes obtener al usar la App.</li>
            </ul>
            <p>Nada en estos Términos excluye ni limita responsabilidades que no puedan excluirse o limitarse conforme a la ley aplicable, ni los derechos que te corresponden como consumidor.</p>
          </TSec>

          <TSec n={15} toc="Eliminar tu cuenta" title="Eliminación de cuenta y terminación">
            <p>Puedes eliminar tu cuenta en cualquier momento desde Ajustes. Al hacerlo, tu Perfil y tu contenido dejan de ser visibles para otros usuarios y los cupos que ocupabas en sesiones pueden liberarse. Podemos conservar cierta información durante el tiempo que exija la ley o que sea necesario para prevenir fraudes y abusos.</p>
            <p>Podemos suspender o cerrar tu cuenta si incumples estos Términos o si la ley lo exige. Las secciones que por su naturaleza deban continuar (propiedad intelectual, limitación de responsabilidad y ley aplicable) seguirán vigentes.</p>
          </TSec>

          <TSec n={16} toc="Cambios" title="Cambios en estos términos">
            <p>Podemos actualizar estos Términos. Cuando los cambios sean importantes, te avisaremos dentro de la App o por correo con una anticipación razonable. Si sigues usando la App después de que los cambios entren en vigencia, entenderemos que los aceptas; si no estás de acuerdo, deja de usarla y elimina tu cuenta. La fecha de la última actualización aparece al inicio de esta página.</p>
          </TSec>

          <TSec n={17} toc="Ley aplicable" title="Ley aplicable y controversias">
            <p>Estos Términos se rigen por las leyes de la República del Perú. Si surge una diferencia, intentaremos resolverla de forma amistosa; escríbenos primero a <Ph>[correo de contacto]</Ph>.</p>
            <p>De no lograrlo, se someterá a los jueces y tribunales de <Ph>[Cajamarca, Perú]</Ph>, sin perjuicio de tu derecho a acudir ante el Indecopi u otras autoridades competentes cuando corresponda.</p>
          </TSec>

          <TSec n={18} toc="Contacto" title="Contacto">
            <p>Para consultas sobre estos Términos, reportes o el ejercicio de tus derechos sobre tus datos personales, escríbenos a <Ph>[correo de contacto]</Ph>.</p>
          </TSec>

          <div className="t-end">
            <div>
              <b>¿Todo claro?</b>
              <p>Vuelve al inicio y crea tu cuenta cuando quieras.</p>
            </div>
            <Link className="btn btn-primary" href="/">
              Volver al inicio
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
