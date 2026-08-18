import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/focusforge-content";
import { cn } from "@/lib/utils";
import { Action, Wordmark } from "./ui";

export function Navbar({ onStart }: { onStart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "border border-border bg-background/80 shadow-[0_10px_30px_-18px_oklch(0_0_0/80%)] backdrop-blur-xl"
            : "border border-transparent",
        )}
      >
        <a href="#top" className="min-w-0 shrink-0" aria-label="FocusForge home">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
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

        <div className="flex shrink-0 items-center gap-2">
          <Action onClick={onStart} className="hidden h-9 px-4 text-[13px] sm:inline-flex">
            Start a session
          </Action>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="mx-auto mt-2 max-w-6xl rounded-xl border border-border bg-background/95 p-3 backdrop-blur-xl md:hidden"
        >
          <ul className="grid">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Action
            onClick={() => {
              setOpen(false);
              onStart();
            }}
            className="mt-2 w-full"
          >
            Start a session
          </Action>
        </div>
      ) : null}
    </header>
  );
}
