export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
] as const;

export type ChecklistItem = { label: string; done: boolean };

export const CHECKLIST: ChecklistItem[] = [
  { label: "API structure", done: true },
  { label: "Database schema", done: true },
  { label: "Auth middleware", done: false },
  { label: "Test edge cases", done: false },
];

export const ACTIVITY = [
  { time: "09:12", text: "Session started — Fix authentication flow" },
  { time: "09:38", text: "Checked off API structure" },
  { time: "10:04", text: "Checked off Database schema" },
  { time: "10:21", text: "Notes added to Auth middleware" },
] as const;

export const FEATURES = [
  {
    name: "Focus sessions",
    description:
      "Turn large engineering tasks into structured deep-work sprints.",
  },
  {
    name: "Task clarity",
    description: "Break complex work into small, actionable steps.",
  },
  {
    name: "Progress signals",
    description: "Understand what you worked on and where your time went.",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "Pick a task",
    description: "Choose the piece of work that deserves your full attention.",
  },
  {
    number: "02",
    title: "Start a sprint",
    description: "Set a focused session and remove the noise.",
  },
  {
    number: "03",
    title: "Ship the work",
    description: "Finish the session with visible progress.",
  },
] as const;

export const SESSION_SECONDS = 25 * 60;
