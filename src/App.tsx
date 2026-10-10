import { About } from "./components/About";
import { CaseStudy } from "./components/CaseStudy";
import { Footer, Nav } from "./components/Nav";
import { ProfileHero } from "./components/ProfileHero";
import { ProjectGallery } from "./components/ProjectGallery";
import { getProjectById } from "./data/projects";
import { navigate, useHashRoute } from "./hooks/useHashRoute";
import { useSecretName } from "./hooks/useSecretName";

function NotFound({ id }: { id: string }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-5 pt-28 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">404</p>
      <h1 className="mt-4 font-display text-5xl italic text-paper">No project called “{id}”.</h1>
      <button
        onClick={() => navigate("#/")}
        className="mt-8 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-white"
      >
        ← Back to all projects
      </button>
    </main>
  );
}

export default function App() {
  const route = useHashRoute();
  const secret = useSecretName();
  const goHome = () => navigate("#/");

  const project = route.page === "project" ? getProjectById(route.id) : undefined;

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <Nav onHome={goHome} revealed={secret.revealed} />

      {route.page === "home" && (
        <main>
          <ProfileHero revealed={secret.revealed} taps={secret.taps} onTapAvatar={secret.tapAvatar} />
          <ProjectGallery />
          <About />
        </main>
      )}

      {route.page === "project" && (project ? <CaseStudy key={project.id} project={project} /> : <NotFound id={route.id} />)}

      <Footer />

      {/* Easter-egg toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center transition-all duration-500 ${
          secret.toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="rounded-full border border-line bg-ink-2/90 px-4 py-2 text-sm text-paper shadow-xl backdrop-blur">
          {secret.toast}
        </div>
      </div>
    </div>
  );
}
