import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SESSION_SECONDS } from "@/lib/focusforge-content";

type SessionState = "idle" | "running" | "paused" | "done";

type FocusSession = {
  remaining: number;
  state: SessionState;
  progress: number;
  label: string;
  statusText: string;
  toggle: () => void;
  reset: () => void;
};

const FocusSessionContext = createContext<FocusSession | null>(null);

export function FocusSessionProvider({ children }: { children: ReactNode }) {
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const [state, setState] = useState<SessionState>("idle");
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (state !== "running") return;
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setState("done");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [state]);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  const toggle = useCallback(() => {
    setState((current) => {
      if (current === "running") return "paused";
      if (current === "done") {
        setRemaining(SESSION_SECONDS);
        return "running";
      }
      return "running";
    });
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setRemaining(SESSION_SECONDS);
  }, []);

  const value = useMemo<FocusSession>(() => {
    const label =
      state === "running"
        ? "Pause Session"
        : state === "paused"
          ? "Resume Session"
          : state === "done"
            ? "Start Again"
            : "Start Focus Session";
    const statusText =
      state === "running"
        ? "Deep work in progress"
        : state === "paused"
          ? "Session paused"
          : state === "done"
            ? "Session complete"
            : "Ready to focus";
    return {
      remaining,
      state,
      progress: 1 - remaining / SESSION_SECONDS,
      label,
      statusText,
      toggle,
      reset,
    };
  }, [remaining, state, toggle, reset]);

  return (
    <FocusSessionContext.Provider value={value}>
      {children}
    </FocusSessionContext.Provider>
  );
}

export function useFocusSession() {
  const ctx = useContext(FocusSessionContext);
  if (!ctx)
    throw new Error("useFocusSession must be used inside FocusSessionProvider");
  return ctx;
}

export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
