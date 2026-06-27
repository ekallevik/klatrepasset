import { createSignal, For, Show, type Component } from "solid-js";
import { LEADERBOARD, LEAGUES, SEASON } from "../data";
import type { LeaderboardEntry } from "../types";
import { summary } from "../store";

// "global" = the season-wide board; otherwise a league id.
type BoardId = "global" | string;

export const LeaderboardView: Component = () => {
  const [boardId, setBoardId] = createSignal<BoardId>("global");

  const options = [{ id: "global", label: "🏔️ Sesongtoppliste" }].concat(
    LEAGUES.map((l) => ({ id: l.id, label: `${l.icon} ${l.name}` }))
  );

  const league = () => LEAGUES.find((l) => l.id === boardId());

  const rows = (): LeaderboardEntry[] => {
    const me: LeaderboardEntry = { name: "Deg", points: summary().points, member: true, you: true };
    const l = league();
    const base = l ? l.members : LEADERBOARD;
    const withYou = !l || l.includesYou ? [...base, me] : [...base];
    return withYou.sort((a, b) => b.points - a.points);
  };

  const description = () =>
    league()?.description ??
    "Hele sesongen, alle deltakere. Du konkurrerer mest mot deg selv — men litt kappestrid skader ikke.";

  return (
    <div>
      <header class="mb-4">
        <h2 class="text-2xl font-bold m-0">Toppliste · {SEASON.label}</h2>
        <p class="text-muted m-0">{description()} (Dummy-deltakere.)</p>
      </header>

      <div class="flex flex-wrap gap-2 mb-4">
        <For each={options}>
          {(o) => {
            const active = () => boardId() === o.id;
            return (
              <button
                onClick={() => setBoardId(o.id)}
                class={`rounded-full px-3.5 py-1.5 text-sm font-semibold border cursor-pointer transition-colors ${
                  active()
                    ? "bg-brand text-white border-transparent"
                    : "bg-white text-muted border-line hover:text-ink"
                }`}
              >
                {o.label}
              </button>
            );
          }}
        </For>
      </div>

      <Show when={league() && !league()!.includesYou}>
        <p class="text-xs text-muted mb-3">
          Du er ikke med i denne ligaen — den vises som eksempel på en bedriftsliga.
        </p>
      </Show>

      <div class="bg-white border border-line rounded-2xl shadow-sm overflow-hidden">
        <For each={rows()}>
          {(r, i) => (
            <div
              class="flex items-center gap-3.5 px-5 py-3 border-t border-line first:border-t-0"
              classList={{ "bg-emerald-50 font-semibold": r.you }}
            >
              <div class="w-7 font-bold" classList={{ "text-brand": r.you, "text-muted": !r.you }}>
                {i() + 1}
              </div>
              <div class="flex-1">
                {r.name}
                <Show when={r.member}>
                  <span class="text-[0.68rem] bg-emerald-50 text-brand-dark px-1.5 py-0.5 rounded-full font-semibold ml-1.5">
                    Medlem
                  </span>
                </Show>
              </div>
              <div class="font-bold text-brand">{r.points} p</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
