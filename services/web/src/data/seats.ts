/**
 * Cohort seat map — single source for /assignments/ and scaffold pages.
 * Keep in sync with docs/DEV_PLAN/MONDRIAN/TEAM-ASSIGNMENTS.md + STUDENT-ASSIGNMENT-LIST.md.
 */

export type Wave = "A" | "B" | "C" | "shared";

export type Seat = {
  id: number;
  handle: string;
  title: string;
  track: string;
  wave: Wave;
  owns: string[];
  routes: { href: string; label: string }[];
  tasks: { id: string; summary: string }[];
  outcome: string;
};

export const seats: Seat[] = [
  {
    id: 1,
    handle: "ATIaas",
    title: "Analyzer & catalog",
    track: "Backend",
    wave: "B",
    owns: ["packages/analyzer/", "packages/works/python/", "catalog CLI"],
    routes: [
      { href: "/method/", label: "Method (consume)" },
      { href: "/gallery/", label: "Gallery patterns" },
    ],
    tasks: [
      { id: "B1-T3", summary: "Classical analyzer → work.yml draft + evaluation" },
      { id: "B1-T5", summary: "Personal measured work (M8)" },
    ],
    outcome: "M4 analyzer + M8 personal work; weight remaps only with closed-form proofs.",
  },
  {
    id: 2,
    handle: "diegomartinezh",
    title: "Contract / API",
    track: "Backend",
    wave: "B",
    owns: ["services/api/", "conformance harness", "OpenAPI"],
    routes: [{ href: "/method/", label: "Method (contract story)" }],
    tasks: [
      { id: "B2-T3", summary: "JS ↔ Python conformance ownership" },
      { id: "B2-T7", summary: "Prove Pages never fetches the API" },
    ],
    outcome: "Conformance + M5 LAN API; public build has zero API fetches.",
  },
  {
    id: 3,
    handle: "medinaxd29",
    title: "About story",
    track: "Storytelling",
    wave: "A",
    owns: ["/about/"],
    routes: [{ href: "/about/", label: "About (your page)" }],
    tasks: [
      { id: "S3-T1", summary: "Seven About scenes" },
      { id: "S3-T2", summary: "GSAP ScrollTrigger parallax (About only)" },
      { id: "S3-T5", summary: "Reduced-motion / no-JS complete" },
    ],
    outcome: "Seven scenes; parallax on /about/ only; safe cites.",
  },
  {
    id: 4,
    handle: "Yassin-Skirej",
    title: "Gallery & method",
    track: "Storytelling",
    wave: "A",
    owns: ["/gallery/", "/method/"],
    routes: [
      { href: "/gallery/", label: "Gallery (your page)" },
      { href: "/method/", label: "Method (your page)" },
    ],
    tasks: [
      { id: "S4-T1", summary: "Live CSS Grid gallery miniatures" },
      { id: "S4-T2", summary: "/method/ pedagogy depth" },
      { id: "S4-T3", summary: "Container-query chrome" },
    ],
    outcome: "CSS Grid gallery + method page; no painting photos.",
  },
  {
    id: 5,
    handle: "itzy-4Qunn7",
    title: "About-us / contribute",
    track: "Storytelling",
    wave: "A",
    owns: ["/about-us/", "/contribute/", "/declaration/"],
    routes: [
      { href: "/about-us/", label: "About us" },
      { href: "/contribute/", label: "Contribute" },
      { href: "/declaration/", label: "Declaration (scaffold)" },
    ],
    tasks: [
      { id: "S5-T1", summary: "Credits + research / AI notice" },
      { id: "S5-T4", summary: "Contribute lanes for classmates" },
    ],
    outcome: "/about-us/ credits; /contribute/ lanes; declaration scaffold.",
  },
  {
    id: 6,
    handle: "galarp2005",
    title: "Editor island",
    track: "App UI",
    wave: "C",
    owns: ["/create/", "/kiosk/", "packages/editor/"],
    routes: [
      { href: "/create/kunsthaus-1930-rbby/", label: "Create (probe)" },
      { href: "/kiosk/", label: "Kiosk (scaffold)" },
    ],
    tasks: [
      { id: "U6-T1", summary: "Svelte+SVG on /create/ and /kiosk/ only" },
      { id: "U6-T2", summary: "Liquid-fill free-aspect frame" },
    ],
    outcome: "Editor island; liquid-fill; format chips; no node drag.",
  },
  {
    id: 7,
    handle: "PauLAanDReEa-Ai",
    title: "Export / PWA / tokens",
    track: "App UI + Design",
    wave: "A",
    owns: ["packages/tokens/", "export/print/QR", "/design/tokens/"],
    routes: [
      { href: "/design/tokens/", label: "Token specimen (your page)" },
      { href: "/kiosk/", label: "Kiosk / PWA (later)" },
    ],
    tasks: [
      { id: "U7-T1", summary: "Token barrel + type specimen" },
      { id: "U7-T6", summary: "Visual QA on chrome PRs" },
    ],
    outcome: "Token barrel consumption; visual QA; later export/PWA.",
  },
];

export const sharedRules = [
  "Node ≥24.22.1; pnpm check green locally.",
  "Branch lane/<handle>-issue-<n>-<slug> from current main.",
  "Plan under docs/plans/<handle>/; AI Review Log on assisted PRs.",
  "Measure one work in M8 (work.yml + MEASUREMENT.md + rights).",
  "Defend one bound in M9.",
];

export const neverRules = [
  "Museum photos in git",
  "FastAPI from Pages / kiosk",
  "Svelte outside editor routes",
  "Invented proportions",
  "SVG or work JSON in URL query",
];

export function seatById(id: number): Seat | undefined {
  return seats.find((seat) => seat.id === id);
}
