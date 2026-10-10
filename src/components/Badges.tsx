import { STATUS_STYLES, type ProjectImage, type ProjectStatus } from "../data/projects";
import { cn } from "../utils/cn";

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-paper-2 backdrop-blur",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/** Makes it explicit whether an image is original artwork or a real screenshot. */
export function ImageKindBadge({ kind, className }: { kind: ProjectImage["kind"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-paper-2 backdrop-blur",
        className,
      )}
      title={kind === "artwork" ? "Original illustration — not an application screenshot" : "Authentic application screenshot"}
    >
      {kind === "artwork" ? "Original artwork" : "Screenshot"}
    </span>
  );
}

export function Tag({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="rounded-md border border-line bg-ink-3/60 px-2 py-0.5 text-[11px] text-paper-2"
      style={accent ? { borderColor: `${accent}33` } : undefined}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute"
      style={accent ? { color: accent } : undefined}
    >
      {children}
    </span>
  );
}
