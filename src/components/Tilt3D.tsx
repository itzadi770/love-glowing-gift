import { useRef, type ReactNode, type CSSProperties } from "react";

// Lightweight 3D tilt-on-mouse-move wrapper. Uses CSS transforms only.
export function Tilt3D({
  children,
  max = 14,
  scale = 1.03,
  glare = true,
  className = "",
  style,
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  glare?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const g = glareRef.current;
    const inn = inner.current;
    if (!el || !inn) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * max;
    const ry = (x - 0.5) * max;
    inn.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    if (g) {
      g.style.opacity = "0.55";
      g.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, oklch(1 0 0 / 0.55), transparent 55%)`;
    }
  };
  const reset = () => {
    const inn = inner.current;
    const g = glareRef.current;
    if (inn) inn.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    if (g) g.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d" }}
    >
      <div
        ref={inner}
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 mix-blend-overlay"
          />
        )}
      </div>
    </div>
  );
}
