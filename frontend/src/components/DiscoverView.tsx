import { createSignal, For, Show, type Component } from "solid-js";
import { AREA_SPONSORS, AREAS, CATEGORY_LABEL, ROUTES, routeCategory, TRACK_LIST, TRACKS } from "../data";
import type { Area, Route, RouteCategory, TrackId } from "../types";
import { isDone, undoRoute } from "../store";
import { settings } from "../settings";
import { setCheckInRoute, TRACK_BG } from "../ui";
import { Stats } from "./Stats";

type TrackFilter = TrackId | "all";
type AreaFilter = string | "all";
type CategoryFilter = RouteCategory | "all";

const CATEGORY_OPTIONS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Tau + buldring" },
  { id: "rope", label: CATEGORY_LABEL.rope },
  { id: "boulder", label: CATEGORY_LABEL.boulder },
];

const Chip: Component<{ active: boolean; activeClass?: string; onClick: () => void; label: string }> = (props) => {
  const state = () =>
    props.active
      ? props.activeClass ?? "bg-ink text-white border-ink"
      : "bg-white text-muted border-line hover:text-ink";
  return (
    <button
      onClick={props.onClick}
      class={`rounded-full px-3.5 py-1.5 text-sm font-semibold border cursor-pointer transition-colors ${state()}`}
    >
      {props.label}
    </button>
  );
};

export const DiscoverView: Component = () => {
  const [track, setTrack] = createSignal<TrackFilter>("all");
  const [area, setArea] = createSignal<AreaFilter>("all");
  const [category, setCategory] = createSignal<CategoryFilter>("all");

  const visibleAreas = () => AREAS.filter((a) => area() === "all" || a.id === area());
  const routesFor = (areaId: string) =>
    ROUTES.filter(
      (r) =>
        r.areaId === areaId &&
        (track() === "all" || r.track === track()) &&
        (category() === "all" || routeCategory(r) === category())
    );

  return (
    <div>
      <header class="mb-4">
        <h2 class="text-2xl font-bold m-0">Oppdag felt og ruter</h2>
        <p class="text-muted m-0">
          Velg en rute, dra ut og klatre, og sjekk inn med koden på toppen — eller på tillit.
        </p>
      </header>

      <Stats />

      <div class="flex flex-wrap gap-2 mb-3">
        <For each={CATEGORY_OPTIONS}>
          {(c) => (
            <Chip
              active={category() === c.id}
              activeClass="bg-brand text-white border-transparent"
              onClick={() => setCategory(c.id)}
              label={c.label}
            />
          )}
        </For>
      </div>

      <div class="flex flex-wrap gap-2 mb-3">
        <Chip active={track() === "all"} onClick={() => setTrack("all")} label="Alle spor" />
        <For each={TRACK_LIST}>
          {(t) => (
            <Chip
              active={track() === t.id}
              activeClass={`${TRACK_BG[t.id]} text-white border-transparent`}
              onClick={() => setTrack(t.id)}
              label={`${t.label} · ${t.sub}`}
            />
          )}
        </For>
      </div>

      <div class="flex flex-wrap gap-2 mb-5">
        <Chip active={area() === "all"} onClick={() => setArea("all")} label="Alle felt" />
        <For each={AREAS}>
          {(a) => <Chip active={area() === a.id} onClick={() => setArea(a.id)} label={a.name} />}
        </For>
      </div>

      <Show
        when={visibleAreas().some((a) => routesFor(a.id).length > 0)}
        fallback={<p class="text-center text-muted py-8">Ingen ruter matcher filteret.</p>}
      >
        <For each={visibleAreas()}>{(a) => <AreaCard area={a} routes={routesFor(a.id)} />}</For>
      </Show>
    </div>
  );
};

const AreaCard: Component<{ area: Area; routes: Route[] }> = (props) => {
  const doneCount = () => props.routes.filter((r) => isDone(r.id)).length;
  const sponsor = () => AREA_SPONSORS[props.area.id];

  return (
    <Show when={props.routes.length > 0}>
      <section class="bg-white border border-line rounded-2xl mb-5 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-line flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h3 class="text-lg font-bold m-0">{props.area.name}</h3>
            <div class="text-sm text-muted mt-0.5">
              {props.area.region} · ~{props.area.approachMinutes} min tilnærming
            </div>
            <div class="flex gap-1.5 flex-wrap mt-2">
              <For each={props.area.disciplines}>
                {(d) => (
                  <span class="text-xs bg-emerald-50 text-brand-dark px-2 py-0.5 rounded-full font-semibold">
                    {d}
                  </span>
                )}
              </For>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-muted whitespace-nowrap">
              {doneCount()}/{props.routes.length} tikket
            </div>
            <Show when={settings().cragSponsorProminence === "small" && sponsor()}>
              {(s) => (
                <div class="text-[0.7rem] text-muted mt-1 whitespace-nowrap">
                  Sponset av {s().logo} {s().name}
                </div>
              )}
            </Show>
          </div>
        </div>

        <Show when={settings().cragSponsorProminence === "large" && sponsor()}>
          {(s) => (
            <div class="bg-gradient-to-r from-emerald-100 to-emerald-50 border-b border-line px-5 py-4 flex items-center gap-4">
              <span class="text-5xl leading-none">{s().logo}</span>
              <div>
                <div class="text-[0.7rem] uppercase tracking-[0.15em] text-muted">Feltsponsor</div>
                <div class="text-xl font-extrabold text-brand-dark">{s().name}</div>
              </div>
            </div>
          )}
        </Show>

        <p class="text-sm text-muted bg-amber-50 border-l-[3px] border-amber-400 px-3 py-2 m-0">
          ⚠️ {props.area.safety}
        </p>

        <For each={props.routes}>{(r) => <RouteRow route={r} />}</For>
      </section>
    </Show>
  );
};

const RouteRow: Component<{ route: Route }> = (props) => {
  const done = () => isDone(props.route.id);

  return (
    <div
      class="flex items-center gap-3.5 px-5 py-3 border-t border-line"
      classList={{ "bg-emerald-50/60": done() }}
    >
      <div class={`w-11 h-11 rounded-lg text-white font-bold text-sm flex items-center justify-center shrink-0 ${TRACK_BG[props.route.track]}`}>
        {props.route.grade}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold">
          {props.route.name}
          <Show when={done()}>
            <span class="text-track-green ml-1.5">✓</span>
          </Show>
        </div>
        <div class="text-sm text-muted">{props.route.desc}</div>
        <div class="text-xs text-muted mt-0.5">
          {props.route.discipline} · {TRACKS[props.route.track].label} spor
        </div>
      </div>
      <div class="text-sm font-bold text-brand whitespace-nowrap">{props.route.points} p</div>
      <Show
        when={done()}
        fallback={
          <button
            onClick={() => setCheckInRoute(props.route)}
            class="rounded-lg px-3.5 py-2 text-sm font-semibold cursor-pointer bg-brand text-white hover:bg-brand-dark whitespace-nowrap"
          >
            Sjekk inn
          </button>
        }
      >
        <button
          onClick={() => undoRoute(props.route.id)}
          class="rounded-lg px-3.5 py-2 text-sm font-semibold cursor-pointer bg-white text-muted border border-line hover:text-ink whitespace-nowrap"
        >
          Angre
        </button>
      </Show>
    </div>
  );
};
