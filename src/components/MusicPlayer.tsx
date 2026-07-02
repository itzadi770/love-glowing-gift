import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2, Volume2 } from "lucide-react";
import { loveConfig } from "@/config/love";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    const onTime = () => setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    const onErr = () => setAvailable(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("error", onErr);
    };
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setAvailable(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={loveConfig.musicFile} loop preload="none" />
      <div className="glass flex items-center gap-3 rounded-full px-4 py-3 text-sm">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-105"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
        </button>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1 font-serif-display text-xs text-foreground/80">
            <Music2 className="h-3 w-3" />
            <span className="truncate max-w-[140px]">{available ? loveConfig.musicTitle : "Add /music/song.mp3"}</span>
          </div>
          <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <Volume2 className="h-3 w-3 opacity-60" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1 w-24 accent-[color:var(--primary)]"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
