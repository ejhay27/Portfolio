import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

/**
 * Secret-name Easter egg.
 *  • Type the trigger word anywhere on the page (outside inputs), or
 *  • tap/click the portrait `tapCount` times
 * …to reveal the secret name. Either action toggles it back.
 */
export function useSecretName() {
  const { trigger, tapCount } = profile.secretName;
  const [revealed, setRevealed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);
  const buffer = useRef("");
  const tapTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);

  const announce = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const toggle = useCallback(() => {
    setRevealed((r) => {
      const next = !r;
      announce(next ? profile.secretName.message : "Back to the usual name.");
      return next;
    });
  }, [announce]);

  // Keyboard trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.length !== 1) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-trigger.length);
      if (buffer.current === trigger.toLowerCase()) {
        buffer.current = "";
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger, toggle]);

  // Tap trigger
  const tapCountRef = useRef(0);
  const tapAvatar = useCallback(() => {
    const next = tapCountRef.current + 1;
    if (tapTimer.current) window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => {
      tapCountRef.current = 0;
      setTaps(0);
    }, 1200);
    if (next >= tapCount) {
      tapCountRef.current = 0;
      setTaps(0);
      toggle();
      return;
    }
    tapCountRef.current = next;
    setTaps(next);
  }, [tapCount, toggle]);

  return { revealed, toast, taps, tapAvatar, toggle };
}
