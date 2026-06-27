import { For, type Component } from "solid-js";
import { AREAS, BADGES, ROUTES } from "../data";
import { earnedBadges, summary } from "../store";

/** Four-up summary strip reused across views. */
export const Stats: Component = () => {
  const items = (): [string | number, string][] => {
    const s = summary();
    return [
      [s.points, "poeng"],
      [`${s.totalTicks}/${ROUTES.length}`, "ruter tikket"],
      [`${s.areasVisited}/${AREAS.length}`, "felt besøkt"],
      [`${earnedBadges().length}/${BADGES.length}`, "merker"],
    ];
  };

  return (
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <For each={items()}>
        {([num, label]) => (
          <div class="bg-white border border-line rounded-xl p-4 shadow-sm">
            <div class="text-2xl font-bold text-brand leading-none">{num}</div>
            <div class="text-xs text-muted mt-1">{label}</div>
          </div>
        )}
      </For>
    </div>
  );
};
