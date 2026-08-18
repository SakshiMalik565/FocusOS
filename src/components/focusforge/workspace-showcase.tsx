import { ACTIVITY, CHECKLIST } from "@/lib/focusforge-content";
import {
  ChecklistRows,
  DashboardChrome,
  ProgressBar,
  StatusPill,
  TimerReadout,
} from "./product-dashboard";
import { useFocusSession } from "./focus-session";
import { Action, SectionLabel } from "./ui";

export function WorkspaceShowcase() {
  const { label, toggle, state, progress } = useFocusSession();
  const doneCount = CHECKLIST.filter((c) => c.done).length;

  return (
    <section id="product" className="scroll-mt-24 px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel>The workspace</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Your work, without the noise.
          </h2>
        </div>

        <div className="mt-10 lg:mt-14">
          <DashboardChrome title="Workspace">
            <div className="grid gap-px bg-border lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <div className="space-y-8 bg-surface p-5 sm:p-8">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Current task
                    </p>
                    <h3 className="mt-2 truncate text-xl font-medium tracking-tight">
                      Fix authentication flow
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-md border border-border bg-accent/60 px-2.5 py-1 font-mono text-[11px] text-foreground">
                    Deep Work
                  </span>
                </div>

                <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface-raised/40 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <TimerReadout size="sm" />
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <StatusPill />
                    <Action
                      onClick={toggle}
                      variant={state === "running" ? "ghost" : "ember"}
                      className="h-10 px-4 text-[13px]"
                    >
                      {label}
                    </Action>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Session progress</span>
                    <span className="tabular-nums text-foreground">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <ProgressBar />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Checklist</span>
                    <span className="tabular-nums">
                      {doneCount}/{CHECKLIST.length}
                    </span>
                  </div>
                  <ChecklistRows />
                </div>
              </div>

              <div className="bg-surface p-5 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Activity
                </p>
                <ol className="mt-5 space-y-5 border-l border-border pl-5">
                  {ACTIVITY.map((item) => (
                    <li key={item.time} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[23px] top-1.5 h-1.5 w-1.5 rounded-full bg-border-strong"
                      />
                      <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {item.time}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </DashboardChrome>
        </div>
      </div>
    </section>
  );
}
