"use client";

import { useEffect, useRef } from "react";
import { Icon, Iso, type IconName } from "@/components/ui/Icon";
import { cssVars } from "@/lib/css-vars";

const NAV_TABS: { tab: number; icon: IconName; label: string; stepTarget: number }[] = [
  { tab: 0, icon: "spark", label: "Matches", stepTarget: 1 },
  { tab: 1, icon: "users", label: "Conexiones", stepTarget: 1 },
  { tab: 2, icon: "chat", label: "Chats", stepTarget: 2 },
  { tab: 3, icon: "cal", label: "Sesiones", stepTarget: 3 },
  { tab: 4, icon: "user", label: "Perfil", stepTarget: 0 },
];

function ProfileScreen({ active, past }: { active: boolean; past: boolean }) {
  const cls = `ph-screen${active ? " is-active" : ""}${past ? " is-past" : ""}`;
  return (
    <div className={cls} data-tab="4">
      <div className="ph-pad">
        <div className="ph-prof">
          <div className="ph-ava">AV</div>
          <div>
            <div className="ph-name">
              Alberto Villalobos <i className="ph-ver"></i>
            </div>
            <div className="ph-sub">CAJAMARCA</div>
          </div>
        </div>
        <div className="ph-chips">
          <span className="ph-chip">Ing. de Sistemas</span>
          <span className="ph-chip">5° año</span>
        </div>
        <div className="ph-h">Mis intereses</div>
        <div className="ph-chips" style={{ marginTop: 0 }}>
          {["Programación", "Fútbol", "IA", "Diseño UX"].map((t) => (
            <span key={t} className="ph-chip am">{t}</span>
          ))}
        </div>
        <div className="ph-h">Disponibilidad</div>
        <div className="ph-card">
          <div className="ph-heat">
            {Array.from({ length: 15 }, (_, i) => (
              <i key={i} className={i === 10 ? "off" : undefined} style={cssVars({ "--i": i })}></i>
            ))}
          </div>
          <div className="ph-note">14 de 15 franjas abiertas</div>
        </div>
      </div>
    </div>
  );
}

function MatchesScreen({ active, past }: { active: boolean; past: boolean }) {
  const cls = `ph-screen${active ? " is-active" : ""}${past ? " is-past" : ""}`;
  return (
    <div className={cls} data-tab="0">
      <div className="ph-pad">
        <div className="ph-top">
          <Iso />
          <span>
            Uni<span className="m">Match</span>
          </span>
        </div>
        <div className="ph-tabs">
          <span className="on">Estudio</span>
          <span>Actividades</span>
          <span>Networking</span>
        </div>
        <div className="ph-cand">
          <div className="ph-photo">
            <span className="ph-tag">Estudio</span>
            <span className="ph-badge">4 intereses en común</span>
            <svg viewBox="0 0 62 92" fill="rgba(255,255,255,.18)">
              <circle cx="31" cy="25" r="14" />
              <path d="M4 92c2-23 13-34 27-34s25 11 27 34z" />
            </svg>
          </div>
          <div className="ph-cb">
            <div className="ph-cn">
              Camila Rojas<small>4° año</small>
            </div>
            <div className="ph-sub" style={{ letterSpacing: 0 }}>Diseño UX</div>
            <p>Busco compañeros para un proyecto de investigación este ciclo.</p>
            <div className="ph-chips" style={{ marginTop: "8px" }}>
              <span className="ph-chip">Diseño UX</span>
              <span className="ph-chip">Investigación</span>
              <span className="ph-chip">IA</span>
            </div>
            <div className="ph-act">
              <span><Icon name="x" /></span>
              <span className="ok"><Icon name="check" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ active, past }: { active: boolean; past: boolean }) {
  const cls = `ph-screen${active ? " is-active" : ""}${past ? " is-past" : ""}`;
  return (
    <div className={cls} data-tab="2">
      <div className="ph-chat-h">
        <span className="back"><Icon name="back" /></span>
        <span className="ava">CR</span>
        <div>
          <b>Camila Rojas</b>
          <small>En línea</small>
        </div>
      </div>
      <div className="ph-msgs">
        <div className="ph-b in" style={cssVars({ "--d": ".15s" })}>¿Te animas al proyecto de investigación?</div>
        <div className="ph-b out" style={cssVars({ "--d": ".55s" })}>¡Claro! ¿Nos vemos mañana?</div>
        <div className="ph-plan" style={cssVars({ "--d": ".95s" })}>
          <div className="hd"><Icon name="cal" />Propuesta de plan</div>
          <div className="rw"><Icon name="pin" />Biblioteca</div>
          <div className="rw"><Icon name="clock" />3:00 p. m.</div>
          <span className="st"><Icon name="check" />Confirmado</span>
        </div>
        <div className="ph-b in" style={cssVars({ "--d": "1.5s" })}>Perfecto, ahí estaré.</div>
      </div>
      <div className="ph-input">
        <span className="p"><Icon name="plus" /></span>
        <span className="f">Escribe un mensaje…</span>
        <span className="s"><Icon name="chat" /></span>
      </div>
    </div>
  );
}

function SessionsScreen({ active, past }: { active: boolean; past: boolean }) {
  const cls = `ph-screen${active ? " is-active" : ""}${past ? " is-past" : ""}`;
  return (
    <div className={cls} data-tab="3">
      <div className="ph-pad">
        <div className="ph-hd2">
          <h4>Sesiones</h4>
          <span className="ph-plus"><Icon name="plus" /></span>
        </div>
        <div className="ph-tabs">
          <span className="on">Estudio</span>
          <span>Actividad</span>
        </div>
        <div className="ph-ses">
          <div className="tp">
            <div className="ic" style={{ background: "rgba(91,122,107,.16)", color: "#5B7A6B" }}><Icon name="book" /></div>
            <div>
              <b>Grupo de estudio: Cálculo II</b>
              <small>Matemática</small>
            </div>
          </div>
          <div className="rw"><Icon name="cal" />mar, 22 set. a las 4:00 p. m.</div>
          <div className="rw"><Icon name="pin" />Biblioteca central</div>
          <div className="ph-bar"><i style={cssVars({ "--w": "67%" })}></i></div>
          <div className="ph-ft">
            <div className="ph-av">
              <i style={{ background: "#23262B" }}>MF</i>
              <i style={{ background: "#C77B3B" }}>RS</i>
              <i style={{ background: "#3A3F47" }}>JP</i>
              <i style={{ background: "#5B7A6B" }}>+1</i>
            </div>
            <span className="ph-join">Unirme</span>
          </div>
        </div>
        <div className="ph-ses">
          <div className="tp">
            <div className="ic" style={{ background: "rgba(199,123,59,.16)", color: "#C77B3B" }}><Icon name="book" /></div>
            <div>
              <b>Hackaton</b>
              <small>Programación</small>
            </div>
          </div>
          <div className="rw"><Icon name="cal" />dom, 20 set. a las 8:00 p. m.</div>
          <div className="rw"><Icon name="pin" />Sala 3</div>
          <div className="ph-bar"><i style={cssVars({ "--w": "8%" })}></i></div>
          <div className="ph-ft">
            <span className="rw" style={{ margin: 0 }}>Sé la primera persona en unirte</span>
            <span className="ph-join">Unirme</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneMockup({
  activeStep,
  onStepChange,
}: {
  activeStep: number;
  onStepChange: (step: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (wrapRef.current && phoneRef.current) {
        const avail = wrapRef.current.clientWidth;
        if (avail > 0) {
          const scale = Math.min(1, avail / 320);
          phoneRef.current.style.zoom = String(scale);
        }
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active tab:
  // Step 0 -> tab 4 (Perfil)
  // Step 1 -> tab 0 (Matches)
  // Step 2 -> tab 2 (Chats)
  // Step 3 -> tab 3 (Sesiones)
  const currentTab = activeStep === 0 ? 4 : activeStep === 1 ? 0 : activeStep === 2 ? 2 : 3;

  return (
    <div className="phone-wrap" ref={wrapRef} data-fit="320">
      <div className="phone" ref={phoneRef} aria-hidden="true">
        <div className="ph-notch"></div>
        <div className="ph-status">
          <span>9:41</span>
          <span className="ph-bat"></span>
        </div>
        <div className="ph-screens">
          <ProfileScreen active={activeStep === 0} past={activeStep > 0} />
          <MatchesScreen active={activeStep === 1} past={activeStep > 1} />
          <ChatScreen active={activeStep === 2} past={activeStep > 2} />
          <SessionsScreen active={activeStep === 3} past={false} />
        </div>
        <div className="ph-nav">
          {NAV_TABS.map((t) => {
            const isTabOn = currentTab === t.tab;
            return (
              <span
                key={t.tab}
                className={`ph-t${isTabOn ? " on" : ""}`}
                data-tab={t.tab}
                style={{ cursor: "pointer" }}
                onClick={() => onStepChange(t.stepTarget)}
              >
                <Icon name={t.icon} />
                <b>{t.label}</b>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
