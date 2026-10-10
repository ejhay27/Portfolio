import type { Project } from "../data/projects";
import { navigate } from "../hooks/useHashRoute";
import { cn } from "../utils/cn";
import { ImageKindBadge, StatusBadge, Tag } from "./Badges";

interface Props {
  project: Project;
  index: number;
}

function ExternalLinks({ project, className }: { project: Project; className?: string }) {
  if (!project.repositoryUrl && !project.demoUrl) return null;
  return (
    <div className={cn("flex items-center gap-3 text-xs", className)}>
      {project.repositoryUrl && (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-paper-2 underline-offset-4 hover:text-paper hover:underline"
        >
          Repository ↗
        </a>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-paper-2 underline-offset-4 hover:text-paper hover:underline"
        >
          Demo ↗
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project, index }: Props) {
  const hasCaseStudy = Boolean(project.caseStudyUrl);
  const open = () => project.caseStudyUrl && navigate(project.caseStudyUrl);
  const featured = project.featured;

  return (
    <article
      onClick={open}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && hasCaseStudy) {
          e.preventDefault();
          open();
        }
      }}
      tabIndex={hasCaseStudy ? 0 : -1}
      role={hasCaseStudy ? "link" : undefined}
      aria-label={hasCaseStudy ? `Open ${project.name} case study` : undefined}
      style={{ ["--accent" as string]: project.accent, animationDelay: `${index * 70}ms` }}
      className={cn(
        "group relative flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 outline-none transition-all duration-500",
        "hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_30px_60px_-30px_var(--accent)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        hasCaseStudy && "cursor-pointer",
        featured ? "md:col-span-2 lg:flex-row" : "",
      )}
    >
      {/* Artwork */}
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:w-[58%] lg:min-h-[360px]" : "aspect-[16/10]",
        )}
      >
        <img
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/10 to-transparent",
            featured && "lg:bg-gradient-to-r lg:via-transparent",
          )}
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <StatusBadge status={project.status} />
        </div>
        <ImageKindBadge kind={project.thumbnail.kind} className="absolute bottom-4 left-4" />
        {/* accent corner */}
        <span
          aria-hidden
          className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full shadow-[0_0_18px_var(--accent)]"
          style={{ background: project.accent }}
        />
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col p-6", featured ? "lg:p-10" : "sm:p-7")}>
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: project.accent }}
          >
            {project.categoryLabel}
          </span>
          <span className="font-mono text-[11px] text-mute">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display italic leading-none tracking-tight text-paper",
            featured ? "text-4xl sm:text-5xl" : "text-3xl",
          )}
        >
          {project.name}
        </h3>

        <p className={cn("mt-4 text-paper-2", featured ? "text-base leading-relaxed" : "text-sm leading-relaxed")}>
          {project.description}
        </p>

        {featured && (
          <p className="mt-3 text-sm text-mute">
            <span className="text-paper-2">For</span> {project.intendedAudience.toLowerCase()}.
          </p>
        )}

        {(project.tags.length > 0 || project.technologies.length > 0) && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <Tag key={`tech-${t}`} accent={project.accent}>
                {t}
              </Tag>
            ))}
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          {hasCaseStudy ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-paper">
              Read case study
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-ink">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </span>
          ) : (
            <span className="text-sm text-mute">Case study coming soon</span>
          )}
          <ExternalLinks project={project} />
        </div>
      </div>

      {/* accent underline */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />
    </article>
  );
}
