import { For, type Component, type JSX } from "solid-js";
import { MAIN_SPONSOR } from "../data";
import {
  PROMINENCE_OPTIONS,
  setSetting,
  settings,
  type SettingsState,
  type SponsorProminence,
} from "../settings";

export const SettingsView: Component = () => (
  <div>
    <header class="mb-4">
      <h2 class="text-2xl font-bold m-0">Innstillinger</h2>
      <p class="text-muted m-0">Styr hva som vises i appen. Valgene lagres lokalt.</p>
    </header>

    <section class="bg-white border border-line rounded-2xl shadow-sm overflow-hidden mb-5">
      <div class="px-5 py-4 border-b border-line">
        <h3 class="text-lg font-bold m-0">Medlemskap</h3>
      </div>
      <label class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
        <span>
          <span class="font-semibold block">Jeg er medlem av Kolsås Klatreklubb</span>
          <span class="text-sm text-muted">Låser opp medlemspris i Butikk og rabatterte treff.</span>
        </span>
        <Switch checked={settings().isMember} onChange={(v) => setSetting("isMember", v)} />
      </label>
    </section>

    <section class="bg-white border border-line rounded-2xl shadow-sm overflow-hidden">
      <div class="px-5 py-4 border-b border-line">
        <h3 class="text-lg font-bold m-0">Sponsorer</h3>
        <p class="text-sm text-muted m-0">Velg hvor fremtredende hver sponsorkategori skal være.</p>
      </div>

      <ProminenceRow
        label="Hovedsponsor"
        hint="Banner med presenterende sponsor øverst i appen."
        setting="mainSponsorProminence"
      />
      <ProminenceRow
        label="Feltsponsorer"
        hint="Lokal sponsor vist på hvert felt under «Oppdag»."
        setting="cragSponsorProminence"
      />
    </section>

    <section class="bg-white border border-line rounded-2xl shadow-sm overflow-hidden mt-5">
      <div class="px-5 py-4 border-b border-line">
        <h3 class="text-lg font-bold m-0">Arrangementer</h3>
      </div>
      <label class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
        <span>
          <span class="font-semibold block">La enkelte treff koste penger</span>
          <span class="text-sm text-muted">
            Når på: instruktørledede treff krever betaling. Når av: alle treff er gratis.
          </span>
        </span>
        <Switch
          checked={settings().paidEvents}
          onChange={(v) => setSetting("paidEvents", v)}
        />
      </label>
    </section>

    <p class="text-xs text-muted mt-3">
      Nåværende hovedsponsor: {MAIN_SPONSOR.logo} <strong>{MAIN_SPONSOR.name}</strong>
    </p>
  </div>
);

// Keys of SettingsState whose value is a SponsorProminence.
type ProminenceKey = {
  [K in keyof SettingsState]: SettingsState[K] extends SponsorProminence ? K : never;
}[keyof SettingsState];

const ProminenceRow: Component<{
  label: string;
  hint: string;
  setting: ProminenceKey;
}> = (props) => {
  const value = () => settings()[props.setting];
  return (
    <div class="flex items-center justify-between gap-4 px-5 py-4 border-t border-line first:border-t-0 flex-wrap">
      <span>
        <span class="font-semibold block">{props.label}</span>
        <span class="text-sm text-muted">{props.hint}</span>
      </span>
      <Segmented value={value()} onChange={(v) => setSetting(props.setting, v)} />
    </div>
  );
};

const Switch: Component<{ checked: boolean; onChange: (v: boolean) => void }> = (props) => {
  const onKey: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      props.onChange(!props.checked);
    }
  };
  return (
    <div
      role="switch"
      tabindex="0"
      aria-checked={props.checked}
      onClick={() => props.onChange(!props.checked)}
      onKeyDown={onKey}
      class="relative w-11 h-6 rounded-full transition-colors shrink-0 cursor-pointer"
      classList={{ "bg-brand": props.checked, "bg-line": !props.checked }}
    >
      <span
        class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
        classList={{ "translate-x-5": props.checked }}
      />
    </div>
  );
};

const Segmented: Component<{
  value: SponsorProminence;
  onChange: (v: SponsorProminence) => void;
}> = (props) => (
  <div class="inline-flex rounded-lg border border-line overflow-hidden shrink-0" role="group">
    <For each={PROMINENCE_OPTIONS}>
      {(o, i) => (
        <button
          onClick={() => props.onChange(o.id)}
          aria-pressed={props.value === o.id}
          class="px-3.5 py-1.5 text-sm font-semibold cursor-pointer transition-colors"
          classList={{
            "bg-brand text-white": props.value === o.id,
            "bg-white text-muted hover:text-ink": props.value !== o.id,
            "border-l border-line": i() > 0,
          }}
        >
          {o.label}
        </button>
      )}
    </For>
  </div>
);
