import { useRef, useState } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { cn } from "../utils/cn";
import { Eyebrow } from "./Badges";

interface Props {
  revealed: boolean;
  taps: number;
  onTapAvatar: () => void;
}

export function ProfileHero({ revealed, taps, onTapAvatar }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  const displayName = revealed ? profile.secretName.reveal : profile.name;

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(90,169,255,0.25), rgba(139,92,246,0.12) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Text */}
        <div className="stagger order-2 lg:order-1 lg:col-span-7">
          <Eyebrow>Portfolio · {projects.length} projects</Eyebrow>
          <h1 className="mt-5 text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            <span className="block text-mute font-light">Hello, I'm</span>
            <span
              key={displayName}
              className={cn("mt-2 block font-display italic", revealed !== undefined && "animate-reveal")}
              style={revealed ? { textShadow: "0 0 24px rgba(90,169,255,0.45)" } : undefined}
            >
              {displayName}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-2">{profile.tagline}</p>
          <p className="mt-3 text-sm text-mute">{profile.role}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white"
            >
              See the work
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-paper-2 transition hover:border-paper/40 hover:text-paper"
            >
              About me
            </a>
          </div>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mute/70">
            {revealed ? "Secret name revealed — type it again to return" : "There is a secret name hidden on this page."}
          </p>
        </div>

        {/* Portrait */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div
            ref={frame}
            onMouseMove={onMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
              setTilt({ x: 0, y: 0 });
            }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            {/* orbit rings */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] border border-line opacity-60 transition-transform duration-700"
              style={{ transform: `rotate(${hover ? -3 : 0}deg)` }}
            />
            <div
              aria-hidden
              className="absolute -inset-12 hidden rounded-[3.5rem] border border-line/60 sm:block transition-transform duration-700"
              style={{ transform: `rotate(${hover ? 2 : 0}deg)` }}
            />

            <button
              type="button"
              onClick={onTapAvatar}
              aria-label={`Portrait of ${profile.name}. Tap ${profile.secretName.tapCount} times for a surprise.`}
              className="group relative block h-64 w-64 overflow-hidden rounded-[2rem] border border-line bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] outline-none transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-paper/60 sm:h-80 sm:w-80"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hover ? 1.02 : 1})`,
                transformStyle: "preserve-3d",
              }}
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="flex h-full w-full items-end justify-start p-6"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 30% 20%, #2f8cff 0%, #1d63d6 45%, #0f3a8a 100%)",
                  }}
                >
                  <span className="font-display text-7xl italic leading-none text-white/95 drop-shadow sm:text-8xl">
                    {revealed ? profile.secretName.reveal.slice(0, 2) : profile.monogram}
                  </span>
                </div>
              )}

              {/* sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(${115 + tilt.y * 4}deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)`,
                }}
              />

              {/* tap progress */}
              {taps > 0 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                  {Array.from({ length: profile.secretName.tapCount }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 w-4 rounded-full transition-colors",
                        i < taps ? "bg-white" : "bg-white/30",
                      )}
                    />
                  ))}
                </div>
              )}
            </button>

            {/* floating caption */}
            <div className="absolute -bottom-5 -left-4 animate-float rounded-xl border border-line bg-ink-2/90 px-3 py-2 text-xs text-paper-2 backdrop-blur sm:-left-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Based in</span>
              <br />
              the space between ideas and builds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
