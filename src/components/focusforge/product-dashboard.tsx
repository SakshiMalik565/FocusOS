import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKLIST } from "@/lib/focusforge-content";
import { formatTime, useFocusSession } from "./focus-session";
import { Action } from "./ui";

export function StatusPill() {
  const { state, statusText } = useFocusSession();
  const active = state === "running";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised/70 px-3 py-1 font-mono text-[11px] tracking-tight text-muted-foreground transition-colors duration-500">
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-primary pulse-dot" : "bg-muted-foreground/60",
        )}
      />
      <span className={active ? "text-primary" : undefined}>{statusText}</span>
    </span>
  );
}

export function ChecklistRows({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={cn("space-y-1", compact && "space-y-0.5")}>
      {CHECKLIST.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent/60"
        >
          <span
            aria-hidden="true"
            className={cn(
              "grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border",
              item.done
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border-strong",
            )}
          >
            {item.done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
          </span>
          <span
            className={cn(
              "min-w-0 truncate",
              item.done ? "text-muted-foreground line-through" : "text-foreground",
            )}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TimerReadout({ size = "lg" }: { size?: "lg" | "sm" }) {
  const { remaining, state } = useFocusSession();
  return (
    <div
      className={cn(
        "font-mono font-semibold tabular-nums tracking-tighter transition-all duration-500",
        size === "lg"
          ? "text-[clamp(3rem,14vw,4.75rem)]"
          : "text-[clamp(2.5rem,10vw,3.5rem)]",
        state === "running" ? "text-ember" : "text-foreground",
        state === "paused" && "text-muted-foreground",
      )}
      role="timer"
      aria-live="off"
    >
      {formatTime(remaining)}
    </div>
  );
}

export function ProgressBar() {
  const { progress, state } = useFocusSession();
  return (
    <div
      className="h-1 w-full overflow-hidden rounded-full bg-accent"
      role="progressbar"
      aria-label="Session progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-1000 ease-linear"
        style={{
          width: `${Math.max(progress * 100, state === "idle" ? 0 : 1.5)}%`,
          backgroundImage: "var(--gradient-ember)",
        }}
      />
    </div>
  );
}

export function DashboardChrome({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { state } = useFocusSession();
  return (
    <div
      className="surface-panel overflow-hidden rounded-2xl transition-shadow duration-700"
      style={
        state === "running"
          ? { boxShadow: "var(--shadow-panel), var(--shadow-ember)" }
          : undefined
      }
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-raised/40 px-4 py-3">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          FocusForge · {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Compact hero dashboard */
export function ProductDashboard() {
  const { label, toggle, state } = useFocusSession();
  return (
    <DashboardChrome title="Deep Work Session">
      <div className="space-y-6 p-5 sm:p-7">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Current task
          </p>
          <h3 className="text-lg font-medium tracking-tight">
            Fix authentication flow
          </h3>
        </div>

        <div className="flex flex-col gap-4 border-y border-border py-6 sm:flex-row sm:items-end sm:justify-between">
          <TimerReadout />
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="rounded-md border border-border bg-accent/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-foreground">
              Deep Work
            </span>
            <StatusPill />
          </div>
        </div>

        <ProgressBar />

        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Checklist
          </p>
          <ChecklistRows />
        </div>

        <Action
          onClick={toggle}
          variant={state === "running" ? "ghost" : "ember"}
          className="w-full"
          aria-label={label}
        >
          {label}
        </Action>
      </div>
    </DashboardChrome>
  );
}
