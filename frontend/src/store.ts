import { createSignal } from "solid-js";
import { BADGES, ROUTES } from "./data";
import { pushToast } from "./toast";
import type { Badge, CheckInMethod, Progress, Summary, TrackId } from "./types";

const ROUTE_BY_ID = new Map(ROUTES.map((r) => [r.id, r]));

// Reactive progress store, persisted to localStorage.
// In a real product this would sync to /backend.
const STORAGE_KEY = "klatrepasset.progress.v1";

function load(): Progress {
  try {
    return (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Progress) ?? {};
  } catch {
    return {};
  }
}

const [progress, setProgress] = createSignal<Progress>(load());

function persist(next: Progress): void {
  setProgress(next);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export { progress };

export function isDone(routeId: string): boolean {
  return Boolean(progress()[routeId]);
}

export function completeRoute(routeId: string, method: CheckInMethod): void {
  if (isDone(routeId)) return;
  const badgesBefore = new Set(earnedBadges().map((b) => b.id));

  persist({ ...progress(), [routeId]: { method, at: new Date().toISOString() } });

  const route = ROUTE_BY_ID.get(routeId);
  if (route) {
    pushToast({ icon: "✅", title: `+${route.points} poeng`, sub: `${route.name} tikket` });
  }
  for (const badge of earnedBadges()) {
    if (!badgesBefore.has(badge.id)) {
      pushToast({ icon: badge.icon, title: "Merke låst opp!", sub: badge.name });
    }
  }
}

export function undoRoute(routeId: string): void {
  const next = { ...progress() };
  delete next[routeId];
  persist(next);
}

export function resetProgress(): void {
  persist({});
}

// Derived season summary. Reads progress(), so it tracks reactively.
export function summary(): Summary {
  const p = progress();
  const byTrack: Record<TrackId, number> = { green: 0, blue: 0, black: 0 };
  const byDiscipline: Record<string, number> = {};
  const areas = new Set<string>();
  let points = 0;
  let totalTicks = 0;

  for (const r of ROUTES) {
    if (!p[r.id]) continue;
    totalTicks++;
    byTrack[r.track]++;
    byDiscipline[r.discipline] = (byDiscipline[r.discipline] ?? 0) + 1;
    areas.add(r.areaId);
    points += r.points;
  }

  return { totalTicks, points, byTrack, byDiscipline, areasVisited: areas.size };
}

export function earnedBadges(): Badge[] {
  const s = summary();
  return BADGES.filter((b) => b.check(s));
}
