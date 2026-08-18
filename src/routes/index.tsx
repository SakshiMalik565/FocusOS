import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import {
  FocusSessionProvider,
  useFocusSession,
} from "@/components/focusforge/focus-session";
import { Navbar } from "@/components/focusforge/navbar";
import { Hero } from "@/components/focusforge/hero";
import { WorkspaceShowcase } from "@/components/focusforge/workspace-showcase";
import { Features, FinalCTA, Footer, HowItWorks } from "@/components/focusforge/sections";
import { KonamiEasterEgg } from "@/components/focusforge/konami";

const title = "FocusForge — Ship code. Not distractions.";
const description =
  "A developer deep-work workspace that turns messy development sessions into focused, measurable sprints — without leaving the flow.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Page() {
  const { state, toggle } = useFocusSession();
  const heroRef = useRef<HTMLDivElement>(null);

  const startSession = useCallback(() => {
    if (state !== "running") toggle();
    heroRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [state, toggle]);

  return (
    <div ref={heroRef}>
      <Navbar onStart={startSession} />
      <main>
        <Hero onStart={startSession} />
        <WorkspaceShowcase />
        <Features />
        <HowItWorks />
        <FinalCTA onStart={startSession} />
      </main>
      <Footer />
      <KonamiEasterEgg />
    </div>
  );
}

function Index() {
  return (
    <FocusSessionProvider>
      <Page />
    </FocusSessionProvider>
  );
}
