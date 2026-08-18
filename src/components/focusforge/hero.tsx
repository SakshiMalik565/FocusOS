import { ArrowDown, ArrowRight } from "lucide-react";
import { ProductDashboard } from "./product-dashboard";
import { useFocusSession } from "./focus-session";
import { Action } from "./ui";

export function Hero({ onStart }: { onStart: () => void }) {
  const { state } = useFocusSession();

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid-veil" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:pb-28">
        <div className="rise-in">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            The developer focus workspace
          </p>
          <h1 className="mt-5 text-[clamp(2.75rem,9vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            Ship code.
            <br />
            <span className="text-ember">Not distractions.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Turn your development sessions into focused, measurable sprints —
            without leaving the flow.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Action onClick={onStart} className="group">
              {state === "running" ? "Session running" : "Start a Focus Session"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Action>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See how it works
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div
          className="rise-in [animation-delay:140ms]"
          style={{ animationDelay: "140ms" }}
        >
          <ProductDashboard />
        </div>
      </div>
    </section>
  );
}
