import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause } from "lucide-react";

type Props = {
  src: string | null;
  poster?: string;
  title?: string;
  onClose: () => void;
};

function fmt(t: number) {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function StoryPlayer({ src, poster, title = "Our Story", onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hideUI, setHideUI] = useState(false);
  const hideTimer = useRef<number | null>(null);

  // Autoplay + reset when src changes
  useEffect(() => {
    if (!src) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = true;
    setMuted(true);
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [src]);

  // ESC to close, space to toggle
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
      if (e.key.toLowerCase() === "m") toggleMute();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Lock body scroll
  useEffect(() => {
    if (!src) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [src]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTime = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrent(v.currentTime);
    if (v.duration) setProgress((v.currentTime / v.duration) * 100);
  };
  const onLoaded = () => {
    const v = videoRef.current;
    if (v?.duration) setDuration(v.duration);
  };
  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(1, pct)) * v.duration;
  };

  const bumpUI = () => {
    setHideUI(false);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setHideUI(true), 2600);
  };

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] bg-black"
          onMouseMove={bumpUI}
          onClick={bumpUI}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            playsInline
            onTimeUpdate={onTime}
            onLoadedMetadata={onLoaded}
            onEnded={onClose}
            onClick={togglePlay}
            className="h-full w-full object-contain"
          />

          {/* Top gradient + title + close */}
          <motion.div
            animate={{ opacity: hideUI ? 0 : 1, y: hideUI ? -10 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-5 sm:p-8"
          >
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="font-script text-3xl font-bold tracking-[0.1em] text-primary drop-shadow-[0_0_10px_oklch(0.55_0.22_27/0.7)]">
                N
              </span>
              <span className="font-sans text-sm uppercase tracking-[0.4em] text-white/70">
                {title}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Center play/pause indicator on toggle */}
          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_60px_oklch(0.55_0.22_27/0.8)]">
                <Play className="h-8 w-8 fill-current" />
              </span>
            </button>
          )}

          {/* Bottom controls */}
          <motion.div
            animate={{ opacity: hideUI ? 0 : 1, y: hideUI ? 20 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pb-6 pt-16 sm:px-10"
          >
            {/* Netflix-style progress bar */}
            <div
              onClick={onSeek}
              className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-[height] hover:h-2.5"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary shadow-[0_0_12px_oklch(0.55_0.22_27/0.9)]"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_10px_oklch(0.55_0.22_27/0.9)] transition-opacity group-hover:opacity-100"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
              >
                {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <span className="font-sans text-xs tabular-nums text-white/80">
                {fmt(current)} <span className="text-white/40">/ {fmt(duration)}</span>
              </span>
              <div className="ml-auto font-sans text-xs uppercase tracking-[0.35em] text-white/50">
                Press M to unmute · Esc to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}