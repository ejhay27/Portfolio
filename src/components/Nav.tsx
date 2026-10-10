import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { cn } from "../utils/cn";

export function Nav({ onHome, revealed }: { onHome: () => void; revealed: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-line" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={onHome}
          className="group flex items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-2">
            <span className="font-display text-lg italic leading-none text-paper transition-transform duration-500 group-hover:-translate-y-6">
              H
            </span>
            <span className="absolute font-display text-lg italic leading-none text-paper translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
              U
            </span>
          </span>
          <span className="hidden text-sm tracking-tight text-paper-2 sm:block">
            {revealed ? profile.secretName.reveal : profile.name}
          </span>
        </button>

        <nav className="flex items-center gap-1 text-sm">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onHome();
              setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 50);
            }}
            className="rounded-full px-3 py-1.5 text-paper-2 transition hover:bg-ink-3 hover:text-paper"
          >
            Work
          </a>
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onHome();
              setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 50);
            }}
            className="rounded-full px-3 py-1.5 text-paper-2 transition hover:bg-ink-3 hover:text-paper"
          >
            About
          </a>
          {profile.links[0] && (
            <a
              href={profile.links[0].href}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-full border border-line px-3.5 py-1.5 text-paper transition hover:border-paper/40"
            >
              {profile.links[0].label}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl italic text-paper">{profile.name}</p>
          <p className="mt-1 text-sm text-mute">{profile.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-mute sm:items-end">
          {profile.links.length > 0 && (
            <div className="flex gap-4">
              {profile.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:text-paper">
                  {l.label}
                </a>
              ))}
            </div>
          )}
          <p>
            Project artwork on this site is original illustration unless labelled as a screenshot. Feature lists
            distinguish confirmed from intended capabilities.
          </p>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
