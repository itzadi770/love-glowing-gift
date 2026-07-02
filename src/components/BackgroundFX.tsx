import { useEffect, useRef } from "react";

// Ambient background: stars, floating hearts, sparkles, petals, butterflies
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; hue: number; kind: "star" | "spark" };
    const particles: P[] = [];
    const count = Math.min(120, Math.floor((w * h) / 16000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.3 - 0.05,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random(),
        hue: 330 + Math.random() * 50,
        kind: Math.random() > 0.35 ? "star" : "spark",
      });
    }

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += 0.01;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        const alpha = 0.4 + Math.sin(p.a) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `oklch(0.9 0.12 ${p.hue} / ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `oklch(0.85 0.18 ${p.hue} / ${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        aria-hidden
      />
      {/* Floating hearts */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute select-none text-2xl opacity-60"
            style={{
              left: `${(i * 7 + 5) % 100}%`,
              bottom: `-${Math.random() * 20}%`,
              animation: `rise ${18 + Math.random() * 14}s linear ${Math.random() * -20}s infinite`,
              filter: "drop-shadow(0 0 10px oklch(0.85 0.18 15 / 0.6))",
            }}
          >
            {["❤️", "🌸", "✨", "🦋", "💗", "🌹"][i % 6]}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
