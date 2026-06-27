import { createSignal } from "solid-js";
import type { Route } from "./types";

// The route currently being checked in (null = modal closed).
export const [checkInRoute, setCheckInRoute] = createSignal<Route | null>(null);

// Static class lookups so Tailwind's JIT can see the full class names.
export const TRACK_BG: Record<string, string> = {
  green: "bg-track-green",
  blue: "bg-track-blue",
  black: "bg-track-black",
};

export const TRACK_TEXT: Record<string, string> = {
  green: "text-track-green",
  blue: "text-track-blue",
  black: "text-track-black",
};
