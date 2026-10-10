import { useEffect, useState } from "react";
import { projects, type Project } from "../data/projects";
import { navigate } from "../hooks/useHashRoute";
import { cn } from "../utils/cn";
import { Eyebrow, ImageKindBadge, StatusBadge, Tag } from "./Badges";

interface Props {
  project: Project;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Block({
  id,
  index,
  heading,
  children,
}: {
  id: string;
  index?: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-10 first:border-0 first:pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          {index && <span className="font-mono text-[11px] text-mute">{index}</span>}
          <h2 className="mt-1 text-2xl tracking-tight text-paper">{heading}</h2>
        </div>
        <div className="space-y-4 text-paper-2 leading-relaxed md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function List({ items, marker, accent }: { items: string[]; marker?: "check" | "dot" | "arrow"; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: marker === "check" && accent ? accent : "#5e5b55" }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ project }: Props) {
  const [active, setActive] = useState<string>("");
  const sectionIds = project.caseStudy.sections.map((s) => slug(s.heading));

  const toc = [
    ...project.caseStudy.sections.map((s) => ({ id: slug(s.heading), label: s.heading })),
    { id: "features", label: "Confirmed vs intended features" },
    { id: "technical", label: "Technical information" },
    { id: "screenshots", label: "Screenshots" },
    { id: "limitations", label: "Known limitations" },
    { id: "future", label: "Future plans" },
  ];

  useEffect(() => {
    document.title = `${project.name} — Haru Unabara`;
    const ids = [...sectionIds, "features", "technical", "screenshots", "limitations", "future"];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      obs.disconnect();
      document.title = "Haru Unabara — Portfolio";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  return (
    <main className="animate-fade-up" style={{ ["--accent" as string]: project.accent }}>
      {/* HERO */}
      <div className="relative">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{ background: `radial-gradient(60% 50% at 20% 100%, ${project.accent}55, transparent)` }}
          />
          <ImageKindBadge kind={project.thumbnail.kind} className="absolute right-5 top-24 sm:right-8" />
        </div>

        <div className="mx-auto -mt-40 max-w-7xl px-5 sm:px-8">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigate("#/");
            }}
            className="inline-flex items-center gap-2 text-sm text-paper-2 hover:text-paper"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span> All projects
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Eyebrow accent={project.accent}>{project.categoryLabel}</Eyebrow>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-4 font-display text-6xl italic leading-[0.95] tracking-tight text-paper sm:text-7xl lg:text-8xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-paper-2">{project.description}</p>

          {/* Meta */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Category</dt>
              <dd className="mt-2 text-sm text-paper">{project.category}</dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Intended users</dt>
              <dd className="mt-2 text-sm text-paper">{project.intendedAudience}</dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Platforms</dt>
              <dd className="mt-2 text-sm text-paper">
                {project.platforms.length ? project.platforms.join(" · ") : "Not yet specified"}
              </dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Links</dt>
              <dd className="mt-2 flex flex-wrap gap-3 text-sm">
                {project.repositoryUrl && (
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="text-paper underline-offset-4 hover:underline">
                    Repository ↗
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-paper underline-offset-4 hover:underline">
                    Demo ↗
                  </a>
                )}
                {!project.repositoryUrl && !project.demoUrl && <span className="text-mute">Not published yet</span>}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
        {/* TOC */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Contents</p>
            <ol className="mt-4 space-y-1.5 border-l border-line">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "-ml-px block border-l py-1 pl-4 text-[13px] leading-snug transition-colors",
                      active === t.id
                        ? "border-[color:var(--accent)] text-paper"
                        : "border-transparent text-mute hover:text-paper-2",
                    )}
                  >
                    <span className="mr-2 font-mono text-[10px] text-mute">{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="lg:col-span-9">
          {/* Long description */}
          <p className="mb-12 border-l-2 pl-5 text-lg leading-relaxed text-paper" style={{ borderColor: project.accent }}>
            {project.longDescription}
          </p>

          {project.caseStudy.sections.map((s, i) => (
            <Block key={s.heading} id={slug(s.heading)} index={String(i + 1).padStart(2, "0")} heading={s.heading}>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.bullets && <List items={s.bullets} />}
            </Block>
          ))}

          {/* FEATURES */}
          <Block id="features" heading="Confirmed vs intended features">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ink-2 p-5">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
                  Confirmed
                </p>
                <div className="mt-4 text-sm">
                  {project.features.confirmed.length ? (
                    <List items={project.features.confirmed} marker="check" accent={project.accent} />
                  ) : (
                    <p className="text-mute">
                      Nothing is listed as confirmed yet. Capabilities appear here only once verified in the application.
                    </p>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-line bg-ink-2/50 p-5">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  <span className="h-1.5 w-1.5 rounded-full border border-mute" />
                  Intended · not yet verified
                </p>
                <div className="mt-4 text-sm">
                  {project.features.intended.length ? (
                    <List items={project.features.intended} />
                  ) : (
                    <p className="text-mute">No additional intended capabilities listed.</p>
                  )}
                </div>
              </div>
            </div>
            {project.features.note && (
              <p className="rounded-xl border border-line bg-ink-3/40 p-4 text-sm text-paper-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Honesty note · </span>
                {project.features.note}
              </p>
            )}
          </Block>

          {/* TECHNICAL */}
          <Block id="technical" heading="Technical information">
            {project.technologies.length ? (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Tag key={t} accent={project.accent}>
                    {t}
                  </Tag>
                ))}
              </div>
            ) : (
              <p className="text-mute">
                No technology stack is published for {project.name} yet. It will be listed here once confirmed rather than guessed.
              </p>
            )}
            {project.platforms.length > 0 && (
              <p className="text-sm">
                <span className="text-mute">Platforms: </span>
                {project.platforms.join(", ")}
              </p>
            )}
            {project.caseStudy.challenges.length > 0 && (
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Development challenges</p>
                <List items={project.caseStudy.challenges} />
              </div>
            )}
          </Block>

          {/* SCREENSHOTS */}
          <Block id="screenshots" heading="Screenshots">
            {project.screenshots.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.screenshots.map((s) => (
                  <figure key={s.src} className="overflow-hidden rounded-2xl border border-line bg-ink-2">
                    <div className="relative">
                      <img src={s.src} alt={s.alt} className="w-full" loading="lazy" />
                      <ImageKindBadge kind={s.kind} className="absolute bottom-3 left-3" />
                    </div>
                    {s.caption && <figcaption className="p-3 text-xs text-mute">{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line p-6 text-sm text-mute">
                No screenshots have been added for {project.name} yet. The hero image above is original artwork made for
                this portfolio — it is not an application screenshot and does not depict the real interface.
              </div>
            )}
          </Block>

          {/* LIMITATIONS */}
          <Block id="limitations" heading="Known limitations">
            <List items={project.caseStudy.limitations} />
          </Block>

          {/* FUTURE */}
          <Block id="future" heading="Future plans">
            <List items={project.caseStudy.futurePlans} marker="check" accent={project.accent} />
            {(project.repositoryUrl || project.demoUrl) && (
              <div className="flex flex-wrap gap-3 pt-4">
                {project.repositoryUrl && (
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-white">
                    View repository ↗
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-2.5 text-sm text-paper hover:border-paper/40">
                    Open demo ↗
                  </a>
                )}
              </div>
            )}
          </Block>
        </div>
      </div>

      {/* PREV / NEXT */}
      <nav className="border-t border-line" aria-label="Other projects">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
          {[
            { p: prev, label: "Previous", align: "left" },
            { p: next, label: "Next", align: "right" },
          ].map(({ p, label, align }) => (
            <a
              key={label}
              href={p.caseStudyUrl ?? "#/"}
              onClick={(e) => {
                e.preventDefault();
                navigate(p.caseStudyUrl ?? "#/");
              }}
              className={cn(
                "group relative flex flex-col gap-2 overflow-hidden px-5 py-12 sm:px-8",
                align === "right" ? "sm:items-end sm:text-right sm:border-l sm:border-line" : "",
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{label} project</span>
              <span className="font-display text-4xl italic text-paper transition-colors group-hover:text-[color:var(--hover)]" style={{ ["--hover" as string]: p.accent }}>
                {p.name}
              </span>
              <span className="text-sm text-mute">{p.categoryLabel}</span>
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}
