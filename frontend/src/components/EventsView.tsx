import { For, Show, type Component } from "solid-js";
import { AREAS, EVENT_TYPE_META, EVENTS } from "../data";
import { settings } from "../settings";
import type { ClimbEvent } from "../types";

const dayFmt = new Intl.DateTimeFormat("nb-NO", { day: "numeric" });
const monthFmt = new Intl.DateTimeFormat("nb-NO", { month: "short" });
const weekdayFmt = new Intl.DateTimeFormat("nb-NO", { weekday: "long" });

const areaName = (id: string) => AREAS.find((a) => a.id === id)?.name ?? id;

export const EventsView: Component = () => {
  const events = () => [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <header class="mb-4">
        <h2 class="text-2xl font-bold m-0">Treff</h2>
        <p class="text-muted m-0">
          Medlemstreff på feltene gjennom sesongen — sosiale samlinger, grilling, teknikktips og instruksjon.
        </p>
      </header>

      <div class="space-y-3">
        <For each={events()}>{(ev) => <EventCard event={ev} />}</For>
      </div>
    </div>
  );
};

const EventCard: Component<{ event: ClimbEvent }> = (props) => {
  const meta = () => EVENT_TYPE_META[props.event.type];
  const date = () => new Date(props.event.date);
  // Only chargeable when the setting is on and the event has a price.
  const price = () => (settings().paidEvents ? props.event.price : undefined);

  return (
    <section class="bg-white border border-line rounded-2xl shadow-sm p-5 flex gap-4">
      <div class="flex flex-col items-center justify-center bg-emerald-50 text-brand-dark rounded-xl w-16 h-16 shrink-0">
        <span class="text-xl font-bold leading-none">{dayFmt.format(date())}</span>
        <span class="text-xs uppercase">{monthFmt.format(date())}</span>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="text-xs bg-emerald-50 text-brand-dark px-2 py-0.5 rounded-full font-semibold">
            {meta().icon} {meta().label}
          </span>
          <Show when={props.event.membersOnly}>
            <span class="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
              Medlemstreff
            </span>
          </Show>
          <Show
            when={price()}
            fallback={
              <span class="text-xs bg-emerald-50 text-brand-dark px-2 py-0.5 rounded-full font-semibold">
                Gratis
              </span>
            }
          >
            {(p) => (
              <span class="text-xs bg-brand text-white px-2 py-0.5 rounded-full font-semibold">
                kr {p()}
              </span>
            )}
          </Show>
        </div>

        <h3 class="text-lg font-bold m-0">{props.event.title}</h3>
        <div class="text-sm text-muted">
          {areaName(props.event.areaId)} · {weekdayFmt.format(date())} kl. {props.event.time} · vert: {props.event.host}
        </div>
        <p class="text-sm mt-2 mb-3">{props.event.description}</p>

        <button class="rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer bg-brand text-white hover:bg-brand-dark">
          <Show when={price()} fallback="Meld deg på">
            {(p) => <>Kjøp plass · kr {p()}</>}
          </Show>
        </button>
      </div>
    </section>
  );
};
