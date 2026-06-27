import { For, Show, type Component } from "solid-js";
import { A, type RouteSectionProps } from "@solidjs/router";
import { MAIN_SPONSOR, SEASON } from "./data";
import { resetProgress } from "./store";
import { settings } from "./settings";
import { CheckInModal } from "./components/CheckInModal";
import { Onboarding } from "./components/Onboarding";
import { Toaster } from "./components/Toaster";

const TABS: { href: string; label: string; end?: boolean; right?: boolean }[] = [
  { href: "/", label: "Oppdag", end: true },
  { href: "/passport", label: "Mitt pass" },
  { href: "/events", label: "Treff" },
  { href: "/leaderboard", label: "Toppliste" },
  { href: "/shop", label: "Butikk" },
  { href: "/about", label: "Om" },
  { href: "/settings", label: "Innstillinger", right: true },
];

// Root layout — the routed view is passed in as props.children.
const App: Component<RouteSectionProps> = (props) => {
  const onReset = () => {
    if (confirm("Nullstille all fremdrift i passet ditt?")) resetProgress();
  };

  return (
    <div class="min-h-screen flex flex-col">
      <header class="flex items-center justify-between gap-4 px-6 py-4 text-white flex-wrap bg-gradient-to-br from-brand-dark to-brand">
        <div class="flex items-center gap-3.5">
          <span class="text-4xl">🧗</span>
          <div>
            <h1 class="m-0 text-2xl font-bold tracking-tight">Klatrepasset</h1>
            <p class="m-0 text-sm opacity-90">Tur-orientering for klatring i Oslo — av Kolsås Klatreklubb</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Show when={settings().isMember}>
            <span class="bg-white text-brand-dark px-2.5 py-1 rounded-full text-xs font-bold">★ Medlem</span>
          </Show>
          <div class="bg-white/20 px-3.5 py-1.5 rounded-full text-sm font-semibold">
            {SEASON.label} · åpner {SEASON.opens}
          </div>
        </div>
      </header>

      <nav class="flex gap-1 px-4 bg-white border-b border-line sticky top-0 z-10 overflow-x-auto">
        <For each={TABS}>
          {(t) => (
            <A
              href={t.href}
              end={t.end}
              class="px-4 py-3.5 text-[0.95rem] font-semibold cursor-pointer border-b-[3px] whitespace-nowrap"
              classList={{ "ml-auto": t.right }}
              activeClass="text-brand border-brand"
              inactiveClass="text-muted border-transparent hover:text-ink"
            >
              {t.label}
            </A>
          )}
        </For>
      </nav>

      <Show when={settings().mainSponsorProminence === "small"}>
        <div class="bg-emerald-50 border-b border-line text-center text-xs text-muted px-4 py-1.5">
          {MAIN_SPONSOR.logo} Presentert av <span class="text-brand-dark font-semibold">{MAIN_SPONSOR.name}</span>
        </div>
      </Show>
      <Show when={settings().mainSponsorProminence === "large"}>
        <div class="bg-gradient-to-br from-brand to-brand-dark text-white border-b border-line px-4 py-12 text-center">
          <div class="text-xs uppercase tracking-[0.25em] opacity-80">Hovedsponsor</div>
          <div class="text-7xl mt-4 leading-none">{MAIN_SPONSOR.logo}</div>
          <div class="text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight">{MAIN_SPONSOR.name}</div>
          <div class="text-base sm:text-lg opacity-90 mt-2">{MAIN_SPONSOR.tagline}</div>
        </div>
      </Show>

      <main class="max-w-5xl w-full mx-auto px-4 py-6 flex-1">{props.children}</main>

      <footer class="text-center text-xs text-muted px-6 py-6">
        <p class="m-0">
          MVP-prototype med dummydata · Fremdrift lagres kun i denne nettleseren ·{" "}
          <button onClick={onReset} class="text-brand underline bg-transparent border-0 cursor-pointer p-0">
            Nullstill passet mitt
          </button>
        </p>
      </footer>

      <CheckInModal />
      <Onboarding />
      <Toaster />
    </div>
  );
};

export default App;
