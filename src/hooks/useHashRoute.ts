import { useEffect, useState } from "react";

export type Route = { page: "home" } | { page: "project"; id: string };

const parse = (hash: string): Route => {
  const m = hash.match(/^#\/project\/([a-z0-9-]+)/i);
  if (m) return { page: "project", id: m[1] };
  return { page: "home" };
};

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setRoute(next);
      // Only jump to top when switching pages; in-page anchors keep native behaviour.
      if (next.page === "project" || window.location.hash === "" || window.location.hash === "#/") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export const navigate = (hash: string) => {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
};
