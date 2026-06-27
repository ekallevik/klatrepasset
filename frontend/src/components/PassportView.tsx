import { For, type Component } from "solid-js";
import { BADGES, ROUTES, SEASON, TRACK_LIST } from "../data";
import { earnedBadges, summary } from "../store";
import { Stats } from "./Stats";

export const PassportView: Component = () => {
  const earnedIds = () => new Set(earnedBadges().map((b) => b.id));

  return (
    <div>
      <header class="mb-4">
        <h2 class="text-2xl font-bold m-0">Mitt pass · {SEASON.label}</h2>
        <p class="text-muted m-0">Din progresjon gjennom sesongen. Alt lagres lokalt i denne MVP-en.</p>
      </header>

      <Stats />

      <section class="bg-white border border-line rounded-2xl p-6 shadow-sm mb-6">
        <h3 class="text-lg font-bold mt-0 mb-4">Fremdrift per spor</h3>
        <For each={TRACK_LIST}>
          {(t) => {
            const total = ROUTES.filter((r) => r.track === t.id).length;
            const done = () => summary().byTrack[t.id];
            const pct = () => (total ? Math.round((done() / total) * 100) : 0);
            return (
              <div class="mb-4 last:mb-0">
                <div class="flex justify-between text-sm mb-1">
                  <strong style={{ color: t.color }}>
                    {t.label} · {t.sub}
                  </strong>
                  <span>
                    {done()}/{total}
                  </span>
                </div>
                <div class="h-2 bg-line rounded-full overflow-hidden">
                  <div class="h-full rounded-full" style={{ width: `${pct()}%`, background: t.color }} />
                </div>
              </div>
            );
          }}
        </For>
      </section>

      <h3 class="text-lg font-bold mb-3">Merker</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        <For each={BADGES}>
          {(b) => {
            const earned = () => earnedIds().has(b.id);
            return (
              <div
                class="bg-white border rounded-xl p-4 text-center shadow-sm transition-all"
                classList={{
                  "border-brand": earned(),
                  "border-line opacity-45 grayscale": !earned(),
                }}
              >
                <div class="text-3xl">{b.icon}</div>
                <div class="font-bold mt-1.5">{b.name}</div>
                <div class="text-xs text-muted mt-1">{b.desc}</div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
