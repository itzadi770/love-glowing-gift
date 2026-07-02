import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Gift, X, Maximize2, ChevronDown } from "lucide-react";
import { loveConfig } from "@/config/love";
import { BackgroundFX } from "./BackgroundFX";
import { CursorHearts } from "./CursorHearts";
import { MusicPlayer } from "./MusicPlayer";
import { ThemeToggle } from "./ThemeToggle";
import { Tilt3D } from "./Tilt3D";

export function LoveExperience() {
  return (
    <main className="relative">
      <div className="aurora" aria-hidden><span /></div>
      <BackgroundFX />
      <CursorHearts />
      <ThemeToggle />
      <MusicPlayer />

      <Hero />
      <LoveLetter />
      <Countdown />
      <LoveCounter />
      <PhotoGallery />
      <VideoMemories />
      <Timeline />
      <Reasons />
      <Surprise />
      <Ending />
    </main>
  );
}

/* --------------------------------- HERO --------------------------------- */
function Hero() {
  const scrollNext = () =>
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
        style={{ perspective: "1200px" }}
      >
        <div
          className="preserve-3d relative"
          style={{ animation: "rotate3d-heart 9s ease-in-out infinite" }}
        >
          <div
            className="absolute -z-10 rounded-full"
            style={{
              width: "min(70vw, 620px)",
              height: "min(70vw, 620px)",
              transform: "translate(-50%, -50%) translateZ(-40px)",
              left: "50%",
              top: "50%",
              background:
                "conic-gradient(from 0deg, oklch(0.82 0.15 15 / 0.35), oklch(0.78 0.14 310 / 0.3), oklch(0.88 0.14 80 / 0.35), oklch(0.82 0.15 15 / 0.35))",
              filter: "blur(50px)",
              animation: "spin-slow 30s linear infinite",
            }}
          />
          <Heart
            className="h-[36vw] max-h-[420px] min-h-[220px] w-[36vw] max-w-[420px] min-w-[220px] fill-primary text-primary opacity-25"
            strokeWidth={0.6}
            style={{ filter: "drop-shadow(0 30px 60px oklch(0.7 0.2 15 / 0.4))" }}
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative font-serif-display text-sm uppercase tracking-[0.5em] text-primary/70"
      >
        A little letter, from me to you
      </motion.p>
      <Tilt3D max={10} scale={1.02} glare={false} className="relative mt-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-script text-6xl leading-none text-gradient-romantic sm:text-8xl md:text-9xl"
          style={{ textShadow: "0 20px 40px oklch(0.7 0.2 15 / 0.25)" }}
        >
          Happy Birthday,
          <br />
          My Love <span className="inline-block animate-heart-pulse">❤️</span>
        </motion.h1>
      </Tilt3D>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative mt-8 max-w-xl font-serif-display text-lg italic text-foreground/80 sm:text-xl"
      >
        Today is all about the most beautiful person in my life.
      </motion.p>
      <motion.button
        onClick={scrollNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-8 py-4 font-serif-display text-lg font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-[background-position] duration-1000 hover:bg-right"
      >
        <Heart className="h-5 w-5 fill-current" />
        Open My Heart
      </motion.button>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-primary/60"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}

/* ----------------------------- LOVE LETTER ----------------------------- */
function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const text = loveConfig.loveLetter;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <Section id="letter" title="A Love Letter" subtitle="Every word, just for you.">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={inView ? { opacity: 1, y: 0, rotate: -1.2 } : {}}
        transition={{ duration: 1 }}
        className="paper-texture mx-auto max-w-2xl rounded-2xl p-8 sm:p-12 shadow-[0_30px_80px_-30px_oklch(0.5_0.15_15/0.4)]"
        style={{ boxShadow: "var(--shadow-soft), inset 0 0 60px oklch(0.85 0.08 40 / 0.15)" }}
      >
        <p className="font-script text-3xl text-primary sm:text-4xl">My darling,</p>
        <pre className="mt-6 whitespace-pre-wrap font-serif-display text-lg leading-relaxed text-foreground/85 sm:text-xl">
          {typed}
          <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
        </pre>
        <p className="mt-8 text-right font-script text-3xl text-primary">— Yours, always</p>
      </motion.div>
    </Section>
  );
}

/* ------------------------------- COUNTDOWN ------------------------------- */
function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = new Date(target).getTime() - now;
  const done = diff <= 0;
  const abs = Math.max(0, diff);
  return {
    done,
    days: Math.floor(abs / 86400000),
    hours: Math.floor((abs / 3600000) % 24),
    minutes: Math.floor((abs / 60000) % 60),
    seconds: Math.floor((abs / 1000) % 60),
  };
}

function Countdown() {
  const c = useCountdown(loveConfig.birthday);
  return (
    <Section id="countdown" title="Counting the Moments" subtitle="Until your special day.">
      {c.done ? (
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-script text-center text-5xl text-gradient-romantic sm:text-7xl"
        >
          Happy Birthday, {loveConfig.princessName} ❤️
        </motion.h3>
      ) : (
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Days", c.days],
            ["Hours", c.hours],
            ["Minutes", c.minutes],
            ["Seconds", c.seconds],
          ].map(([label, val]) => (
            <motion.div
              key={label as string}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="font-serif-display text-4xl font-semibold text-gradient-romantic sm:text-5xl">
                {String(val).padStart(2, "0")}
              </div>
              <div className="mt-2 font-serif-display text-xs uppercase tracking-widest text-foreground/60">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ----------------------------- LOVE COUNTER ----------------------------- */
function LoveCounter() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const start = new Date(loveConfig.relationshipStart).getTime();
  const diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return (
    <Section id="together" title="We've Been Together For…" subtitle="Every second, still my favorite.">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Days", days],
          ["Hours", hours],
          ["Minutes", minutes],
          ["Seconds", seconds],
        ].map(([l, v]) => (
          <div key={l as string} className="glass rounded-2xl p-6 text-center">
            <div className="font-serif-display text-4xl font-semibold text-primary sm:text-5xl">
              {String(v).padStart(2, "0")}
            </div>
            <div className="mt-2 font-serif-display text-xs uppercase tracking-widest text-foreground/60">{l}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- GALLERY -------------------------------- */
function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const rotations = useMemo(
    () => loveConfig.photos.map(() => (Math.random() - 0.5) * 8),
    [],
  );
  return (
    <Section id="photos" title="Our Little Moments" subtitle="A polaroid album of us.">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loveConfig.photos.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
            className="group cursor-pointer rounded-sm bg-cream p-3 pb-8 shadow-[0_20px_50px_-15px_oklch(0.4_0.1_340/0.4)] transition-shadow hover:shadow-[var(--shadow-glow)]"
            style={{ background: "oklch(0.99 0.01 80)" }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <p className="mt-4 text-center font-script text-2xl text-primary">{p.caption}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={loveConfig.photos[active].src}
                alt={loveConfig.photos[active].caption}
                className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-3 text-center font-script text-3xl text-white">
                {loveConfig.photos[active].caption}
              </p>
              <button
                onClick={() => setActive(null)}
                className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* --------------------------------- VIDEOS --------------------------------- */
function VideoMemories() {
  const videos = loveConfig.videos;
  return (
    <Section id="videos" title="Video Memories" subtitle="Little films of us.">
      {videos.length === 0 ? (
        <div className="mx-auto max-w-2xl glass rounded-2xl p-10 text-center">
          <p className="font-serif-display text-lg text-foreground/70">
            Add your videos to <code className="mx-1 rounded bg-primary/10 px-2 py-0.5 text-primary">public/videos/</code>
            and list them in <code className="mx-1 rounded bg-primary/10 px-2 py-0.5 text-primary">src/config/love.ts</code>.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {videos.map((v, i) => (
            <VideoCard key={i} src={v.src} poster={v.poster} />
          ))}
        </div>
      )}
    </Section>
  );
}

function VideoCard({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="group relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]"
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="aspect-video w-full object-cover"
      />
      <button
        onClick={() => ref.current?.requestFullscreen()}
        className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-primary opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
        aria-label="Fullscreen"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* -------------------------------- TIMELINE -------------------------------- */
function Timeline() {
  return (
    <Section id="timeline" title="Our Story" subtitle="Milestones I'll never forget.">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
        {loveConfig.timeline.map((t, i) => {
          const left = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: left ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className={`relative mb-10 pl-14 sm:mb-14 sm:w-1/2 sm:pl-0 ${
                left ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
              }`}
            >
              <div
                className={`absolute top-3 grid h-8 w-8 place-items-center rounded-full bg-primary text-lg text-primary-foreground shadow-[var(--shadow-glow)] left-0 ${
                  left ? "sm:left-auto sm:-right-4" : "sm:-left-4"
                }`}
              >
                {t.emoji}
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-serif-display text-xl font-semibold text-primary">{t.title}</h3>
                <p className="mt-2 text-foreground/75">{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* --------------------------------- REASONS -------------------------------- */
function Reasons() {
  return (
    <Section id="reasons" title="Reasons I Love You" subtitle="A few of infinitely many.">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loveConfig.reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group h-56 [perspective:1000px]"
          >
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="glass absolute inset-0 grid place-items-center rounded-3xl p-6 text-center [backface-visibility:hidden]">
                <div>
                  <div className="text-5xl">{r.emoji}</div>
                  <h3 className="mt-4 font-serif-display text-xl font-semibold text-primary">{r.title}</h3>
                </div>
              </div>
              <div
                className="absolute inset-0 grid place-items-center rounded-3xl p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.16 15), oklch(0.72 0.15 340))",
                  color: "white",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <p className="font-script text-2xl">{r.back}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- SURPRISE ------------------------------- */
function Surprise() {
  const [revealed, setRevealed] = useState(false);

  const fireworks = () => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#ff8fb1", "#ffd1e0", "#f6c26b", "#c8a2ff", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors, shapes: ["circle", "square"] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors, shapes: ["circle", "square"] });
      confetti({
        particleCount: 2, startVelocity: 30, spread: 360, ticks: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 }, colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const heartsRain = () => {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: "❤", scalar });
    const end = Date.now() + 3500;
    (function rain() {
      confetti({
        particleCount: 3, startVelocity: 20, ticks: 200, gravity: 0.7,
        origin: { x: Math.random(), y: -0.1 },
        shapes: [heart], scalar, colors: ["#ff5c8a", "#ff9ec7", "#ffd1e0"],
      });
      if (Date.now() < end) setTimeout(rain, 90);
    })();
  };

  const onClick = () => {
    setRevealed(true);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    heartsRain();
    setTimeout(fireworks, 400);
  };

  return (
    <Section id="surprise" title="One More Thing…" subtitle="Just for you.">
      <div className="mx-auto max-w-2xl text-center">
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-10 py-5 font-serif-display text-xl font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-[background-position] duration-1000 hover:bg-right"
          style={{ animation: "float-y 3s ease-in-out infinite" }}
        >
          <Gift className="h-6 w-6" />
          Click for a Surprise 🎁
        </motion.button>

        <AnimatePresence>
          {revealed && (
            <motion.p
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="mt-10 font-script text-5xl text-gradient-romantic sm:text-6xl"
            >
              I Love You More Every Single Day ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* --------------------------------- ENDING --------------------------------- */
function Ending() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl font-serif-display text-2xl leading-relaxed text-foreground/85 sm:text-3xl"
      >
        "No matter where life takes us,
        <br />
        I'll always choose you.
        <br />
        <span className="font-script text-4xl text-gradient-romantic sm:text-6xl">
          Happy Birthday, My Forever Person.
        </span>{" "}
        ❤️"
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 1.2, delay: 0.3 }}
        className="mt-12"
      >
        <Heart
          className="h-32 w-32 animate-heart-pulse fill-primary text-primary sm:h-40 sm:w-40"
          strokeWidth={1}
        />
      </motion.div>
      <p className="mt-16 font-serif-display text-xs uppercase tracking-[0.4em] text-foreground/50">
        made with love · forever yours
      </p>
    </section>
  );
}

/* --------------------------------- SHARED --------------------------------- */
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center"
      >
        <h2 className="font-script text-5xl text-gradient-romantic sm:text-7xl">{title}</h2>
        {subtitle && (
          <p className="mt-3 font-serif-display italic text-foreground/70 sm:text-lg">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
