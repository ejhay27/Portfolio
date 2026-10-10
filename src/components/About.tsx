import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { Eyebrow } from "./Badges";

export function About() {
  const statusCounts = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-4 text-4xl tracking-tight text-paper">
            Focused tools, <span className="font-display italic text-paper-2">built honestly.</span>
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-paper-2 lg:col-span-5">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-line bg-ink-2 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Project statuses</p>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.entries(statusCounts).map(([s, n]) => (
                <li key={s} className="flex items-center justify-between border-b border-line/60 pb-2 last:border-0">
                  <span className="text-paper">{s}</span>
                  <span className="font-mono text-mute">{n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              No project is marked Released by default. Statuses change only when the owner updates them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
