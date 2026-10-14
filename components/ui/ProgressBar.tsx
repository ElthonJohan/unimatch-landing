"use client";

import { useEffect, useState } from "react";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const root = document.documentElement;
      const h = root.scrollHeight - window.innerHeight;
      if (h > 0) {
        setProgress(Math.max(0, Math.min(1, window.scrollY / h)));
      } else {
        setProgress(0);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${progress})` }}
    ></div>
  );
}
