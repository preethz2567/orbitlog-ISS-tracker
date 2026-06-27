# Orbit Log

A responsive dashboard that tracks the International Space Station in real time and lets you log your own ISS sightings.

> **Note:** This README documents the project as designed and built across several feature branches/PRs. See the open PRs in this repo for the corresponding code: project scaffold, charts, sighting form, and dashboard UI.

## Purpose

Built to practice core dashboard-engineering concepts:
- Visualizing live and static data with Chart.js (line + bar charts)
- Fetching and polling public APIs with TanStack Query, including proper loading/error handling
- Building a validated form with React Hook Form + Zod, with accessible inline errors
- Managing client state with Zustand
- Writing strict TypeScript throughout, with zero use of `any`
- Designing a responsive, accessible layout

## What It Does

- A live-updating **line chart** showing ISS altitude and velocity, polled every 5 seconds via TanStack Query against the [wheretheiss.at](https://wheretheiss.at) API.
- A **bar chart** showing the current number of astronauts in space, grouped by spacecraft, using the [Open Notify](http://api.open-notify.org) API.
- A **stat strip** surfacing live altitude, velocity, visibility, and crew count as readable numeric values above the charts.
- A **sighting log form** (location, date, optional note) validated with Zod and wired through React Hook Form, with inline, screen-reader-accessible error messages (`aria-invalid`, `aria-describedby`, `role="alert"`).
- Sighting state managed with **Zustand**, rendered as a sightings table below the form.
- Written entirely in **TypeScript**, with form types derived directly from the Zod schema (`z.infer`) so validation and types can never drift apart.
- A responsive CSS Grid layout that collapses from a multi-column dashboard to a single column on mobile (768px breakpoint).

## Project Architecture

```
orbit-log/
├── src/
│   ├── types/
│   │   └── iss.ts                  # Shared TypeScript types
│   ├── api/
│   │   ├── iss.ts                  # Raw API fetch functions
│   │   ├── useISSPosition.ts       # TanStack Query hook (polling)
│   │   └── useAstronauts.ts        # TanStack Query hook (one-time fetch)
│   ├── store/
│   │   └── sightingsStore.ts       # Zustand store for logged sightings
│   ├── schemas/
│   │   └── sightingSchema.ts       # Zod validation schema + inferred type
│   ├── components/
│   │   ├── AltitudeChart.tsx       # Line chart (Chart.js)
│   │   ├── AstronautsChart.tsx     # Bar chart (Chart.js)
│   │   └── SightingForm.tsx        # Form + sightings table
│   ├── App.tsx                     # Dashboard layout assembly
│   └── App.css                     # Styling, responsive grid
└── package.json
```

**Data flow:**
```
wheretheiss.at API ──┐
                      ├──> TanStack Query (polling/fetch, loading/error states)
open-notify.org API ──┘             │
                                     ▼
                         App.tsx (stat strip + chart components)

User input ──> React Hook Form ──> Zod validation ──> Zustand store ──> Sightings table
```

## How to Run

```bash
git clone https://github.com/<your-username>/orbit-log.git
cd orbit-log
npm install
npm run dev
```

Open the printed `localhost` URL in your browser.

### Production build

```bash
npm run build
npm run preview
```

## Tech Stack

- React + TypeScript (Vite)
- Chart.js + react-chartjs-2
- TanStack Query
- React Hook Form + Zod
- Zustand

## Accessibility

Audited with Lighthouse (Chrome DevTools → Lighthouse tab → Accessibility category).

**Result: 100/100**

<!-- Add Lighthouse screenshot here -->

## Output Screenshots

<!-- Add screenshots here: dashboard overview, mobile responsive view, form validation errors, sightings table -->
