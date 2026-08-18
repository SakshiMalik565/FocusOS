import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] border border-border-strong"
        style={{ background: "var(--gradient-ember)" }}
      >
        <span className="h-1.5 w-1.5 rounded-[2px] bg-background" />
      </span>
      FocusForge
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  );
}

type ActionProps = {
  children: ReactNode;
  className?: string;
  variant?: "ember" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Action({
  children,
  className,
  variant = "ember",
  ...props
}: ActionProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-all duration-200 active:translate-y-px",
        variant === "ember"
          ? "text-primary-foreground hover:brightness-110"
          : "border border-border-strong bg-surface-raised/60 text-foreground hover:bg-surface-raised",
        className,
      )}
      style={
        variant === "ember"
          ? {
              backgroundImage: "var(--gradient-ember)",
              boxShadow: "var(--shadow-ember)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}
