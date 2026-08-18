import { ArrowRight, Gauge, ListChecks, Timer } from "lucide-react";
import { FEATURES, NAV_LINKS, STEPS } from "@/lib/focusforge-content";
import { Action, SectionLabel, Wordmark } from "./ui";

const ICONS = [Timer, ListChecks, Gauge];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-border px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Built for the hours that matter.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[i] ?? Timer;
            return (
              <article
                key={feature.name}
                className="group bg-surface p-6 transition-colors duration-300 hover:bg-surface-raised sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-primary transition-colors duration-300 group-hover:border-primary/40"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                  {feature.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-border px-5 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Three steps, no ceremony.
          </h2>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-border pt-6">
              <span className="font-mono text-sm tabular-nums text-primary">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-border px-5 py-24 sm:px-6 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Make your next hour count.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
          Less context switching. More meaningful work.
        </p>
        <div className="mt-9 flex justify-center">
          <Action onClick={onStart} className="group h-12 px-6">
            Start a Focus Session
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Action>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <Wordmark />
          <p className="mt-2 text-sm text-muted-foreground">
            A focused workspace for developers.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-6xl font-mono text-[11px] text-muted-foreground/70">
        FocusForge is a fictional product concept built for a frontend design
        challenge.
      </p>
    </footer>
  );
}
