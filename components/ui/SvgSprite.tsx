/** Sprite SVG con el isotipo y todos los iconos de la landing. */
export function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="iso" viewBox="0 0 26 26">
          <path d="M8.3 17.2L17.4 9.8" style={{ stroke: "var(--iso-line)" }} strokeWidth="1.1" strokeLinecap="round" fill="none" />
          <circle cx="6" cy="19" r="3.4" style={{ fill: "var(--iso-navy)" }} />
          <circle cx="20" cy="8" r="3.4" style={{ fill: "var(--iso-blue)" }} />
          <circle cx="13" cy="20" r="2.6" style={{ fill: "var(--iso-teal)" }} />
        </symbol>
        <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6L12 3z" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><circle cx="8" cy="9" r="3" /><circle cx="17" cy="9" r="2.6" /><path d="M2.5 20c.8-3.2 2.6-5 5.5-5s4.7 1.8 5.5 5M14 15.4c2.3.2 4 1.9 4.7 4.6" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5.5h16v10.5H9l-4 3.5V16H4V5.5z" /></symbol>
        <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2.5" /><path d="M3 9.5h18M8 3v4M16 3v4" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.4-3.6 4.4-5.6 7.5-5.6s6.1 2 7.5 5.6" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></symbol>
        <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
        <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 15.5v-10z" /><path d="M4 15.5A2.5 2.5 0 006.5 18H19" /></symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></symbol>
        <symbol id="i-back" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6L12 3z" /><path d="M8.7 12l2.3 2.3 4.3-4.6" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.3-9A5 5 0 0112 6.5 5 5 0 0121.3 11c-2.3 4.6-9.3 9-9.3 9z" /></symbol>
        <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 018 0v3" /></symbol>
        <symbol id="i-grad" viewBox="0 0 24 24"><path d="M12 3L2 8l10 5 10-5-10-5z" /><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6V3z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></symbol>
      </defs>
    </svg>
  );
}
