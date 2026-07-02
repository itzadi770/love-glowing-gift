import { useEffect } from "react";

export function CursorHearts() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      const el = document.createElement("span");
      el.textContent = ["❤", "✨", "🌸"][Math.floor(Math.random() * 3)];
      el.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        pointer-events: none; z-index: 9999; font-size: ${10 + Math.random() * 8}px;
        color: oklch(0.75 0.2 15); filter: drop-shadow(0 0 6px oklch(0.85 0.2 15 / 0.8));
        transform: translate(-50%,-50%); transition: transform 900ms ease-out, opacity 900ms ease-out;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${(Math.random() - 0.5) * 40}px), -60px) scale(0.4)`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 950);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
