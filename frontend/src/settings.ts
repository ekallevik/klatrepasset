import { createSignal } from "solid-js";

// User-adjustable settings, persisted to localStorage.
const STORAGE_KEY = "klatrepasset.settings.v2";

/** How prominently a sponsor is shown. */
export type SponsorProminence = "none" | "small" | "large";

export const PROMINENCE_OPTIONS: { id: SponsorProminence; label: string }[] = [
  { id: "none", label: "Ingen" },
  { id: "small", label: "Liten" },
  { id: "large", label: "Stor" },
];

export interface SettingsState {
  mainSponsorProminence: SponsorProminence;
  cragSponsorProminence: SponsorProminence;
  /** When on, events with a price actually cost money; when off, all treff are free. */
  paidEvents: boolean;
  /** Whether the user is a member of the club (unlocks member pricing). */
  isMember: boolean;
  /** Set once the first-run intro has been dismissed. */
  seenOnboarding: boolean;
}

const DEFAULTS: SettingsState = {
  mainSponsorProminence: "large",
  cragSponsorProminence: "small",
  paidEvents: true,
  isMember: false,
  seenOnboarding: false,
};

function load(): SettingsState {
  try {
    return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ?? {}) };
  } catch {
    return { ...DEFAULTS };
  }
}

const [settings, setSettingsState] = createSignal<SettingsState>(load());

export { settings };

export function setSetting<K extends keyof SettingsState>(key: K, value: SettingsState[K]): void {
  const next = { ...settings(), [key]: value };
  setSettingsState(next);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
