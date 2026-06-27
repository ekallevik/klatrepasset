# Klatrepasset 🧗

A "Tur-orientering" for climbing in the Oslo area, built for **Kolsås Klatreklubb**.
Buy a season pass, get a curated collection of crags and routes around Oslo, and collect them
at your own pace — from family-friendly boulders to airy multi-pitches — while checking in,
earning points and badges, and supporting the club.

📄 **Concept sketch:** see [`CONCEPT.md`](./CONCEPT.md).

## Tech stack

- **SolidJS** + **TypeScript** — reactive UI, fully typed.
- **Tailwind CSS v4** — styling (CSS-based theme config in `src/index.css`).
- **Vite** — dev server and build.

## Repo layout

```
.
├── CONCEPT.md          # The full concept (business model, tracks, safety, etc.)
├── README.md
└── frontend/           # The MVP web app (SolidJS + TS + Tailwind, Vite)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── index.tsx         # Entry point + hash router (@solidjs/router)
        ├── index.css         # Tailwind import + theme tokens + animations
        ├── App.tsx           # Root layout: header, tab nav, sponsor banner, footer, overlays
        ├── types.ts          # Shared TypeScript types
        ├── data.ts           # Dummy data (areas, routes, badges, events, leagues, products, sponsors)
        ├── store.ts          # Reactive progress + derived summary + check-in toasts (localStorage)
        ├── settings.ts       # Persisted settings (sponsor prominence, paid events, membership, onboarding)
        ├── toast.ts          # Lightweight toast queue
        ├── ui.ts             # UI state (open check-in modal) + track class maps
        └── components/       # Discover / Passport / Events / Leaderboard / Shop / About /
                              # Settings / CheckInModal / Onboarding / Toaster / Stats
```

Views are hash-routed (`/#/passport`, `/#/shop`, …) so tabs are deep-linkable and the
browser back button works — convenient on static hosting with no server config.

`/backend` can be added alongside `/frontend` later (e.g. for real pass purchases,
accounts, check-in codes, and a shared leaderboard). The frontend currently persists
progress in the browser's `localStorage` (see `store.ts`).

## Run the MVP

Requires Node. From the repo root:

```bash
cd frontend
npm install
npm run dev      # dev server at http://localhost:5173
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck`.

## What the MVP demonstrates

- **Oppdag** — browse crags and routes; filter by track (green/blue/black) and area.
- **Sjekk inn** — log a route with its 2–4 letter code (try e.g. `KOA`, `HAA`, `GJB`) or on the honor system. No GPS.
- **Mitt pass** — your points, per-track progress bars, and badges.
- **Toppliste** — season standings with dummy participants; "Deg" is inserted by your real points.

Progress is stored locally; use **"Nullstill passet mitt"** in the footer to reset.
