import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEasterEgg() {
  const [open, setOpen] = useState(false);
  const index = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[index.current]) {
        index.current += 1;
        if (index.current === SEQUENCE.length) {
          index.current = 0;
          setOpen(true);
        }
      } else {
        index.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-end justify-center p-5 sm:place-items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Focus mode unlocked"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <div className="rise-in surface-panel relative w-full max-w-sm rounded-xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </p>
        <p className="mt-3 text-base font-medium tracking-tight">
          Focus mode unlocked. Now get back to shipping.
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          className="mt-5 rounded-lg border border-border-strong px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
