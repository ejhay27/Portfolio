import { useMemo, useState } from "react";
import {
  PROJECT_CATEGORIES,
  projectMatchesCategory,
  projects,
  type ProjectCategory,
} from "../data/projects";
import { cn } from "../utils/cn";
import { Eyebrow } from "./Badges";
import { ProjectCard } from "./ProjectCard";

type Filter = ProjectCategory | "All";

export function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("All");

  // Counts and the visible list are derived purely from project data.
  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", projects.length]]);
    for (const c of PROJECT_CATEGORIES) {
      map.set(c, projects.filter((p) => projectMatchesCategory(p, c)).length);
    }
    return map;
  }, []);

  const visible = useMemo(() => projects.filter((p) => projectMatchesCategory(p, filter)), [filter]);

  const filters: Filter[] = ["All", ...PROJECT_CATEGORIES];

  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 text-4xl tracking-tight text-paper sm:text-5xl">
              Six projects, <span className="font-display italic text-paper-2">one universe.</span>
            </h2>
            <p className="mt-4 text-paper-2">
              Each project has its own identity and its own honest status. Confirmed capabilities are
              separated from intended ones on every case-study page.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const active = f === filter;
              const n = counts.get(f) ?? 0;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300",
                    active
                      ? "border-paper bg-paper text-ink"
                      : "border-line text-paper-2 hover:border-paper/40 hover:text-paper",
                  )}
                >
                  {f === "All" ? "All Projects" : f}
                  <span
                    className={cn(
                      "font-mono text-[10px]",
                      active ? "text-ink/60" : "text-mute",
                    )}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={filter}
          className="mt-12 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-mute">No projects in this category yet.</p>
        )}

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-mute">
          Thumbnails labelled “Original artwork” are illustrations created for this portfolio — they are not
          application screenshots. Statuses are set by the owner and are not inferred.
        </p>
      </div>
    </section>
  );
}
