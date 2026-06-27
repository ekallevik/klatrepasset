export type TrackId = "green" | "blue" | "black";

/** Climbing-type category: rope-based vs bouldering. */
export type RouteCategory = "rope" | "boulder";

export interface Track {
  id: TrackId;
  label: string;
  sub: string;
  color: string;
}

export interface Area {
  id: string;
  name: string;
  region: string;
  approachMinutes: number;
  disciplines: string[];
  safety: string;
}

export interface Route {
  id: string;
  areaId: string;
  name: string;
  grade: string;
  track: TrackId;
  discipline: string;
  points: number;
  /** 2–4 letter code on the plate at the top of the route. */
  checkInCode: string;
  desc: string;
}

export interface Summary {
  totalTicks: number;
  points: number;
  byTrack: Record<TrackId, number>;
  byDiscipline: Record<string, number>;
  areasVisited: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  desc: string;
  check: (s: Summary) => boolean;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  member: boolean;
  you?: boolean;
}

export type CheckInMethod = "code" | "honor";

export interface CheckIn {
  method: CheckInMethod;
  at: string;
}

export type Progress = Record<string, CheckIn>;

export interface Season {
  label: string;
  opens: string;
  closes: string;
}

export type EventType = "social" | "grill" | "technique" | "instruction";

export interface ClimbEvent {
  id: string;
  title: string;
  areaId: string;
  /** ISO date, e.g. "2026-07-03". */
  date: string;
  time: string;
  type: EventType;
  host: string;
  description: string;
  membersOnly?: boolean;
  /** Price in NOK. Only charged when the "paid events" setting is on; absent = always free. */
  price?: number;
}

export interface League {
  id: string;
  name: string;
  icon: string;
  description: string;
  /** When true, the current user's real points are spliced into the standings. */
  includesYou: boolean;
  members: LeaderboardEntry[];
}

export interface Sponsor {
  name: string;
  /** Emoji stands in for a logo in this MVP. */
  logo: string;
  tagline?: string;
  url?: string;
}

export interface Product {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  /** Formatted price, e.g. "kr 349" or "fra kr 8 900". */
  price: string;
  /** Optional discounted member price — reinforces the membership driver. */
  memberPrice?: string;
  features: string[];
  cta: string;
  /** Visually highlight this product (e.g. the corporate package). */
  highlight?: boolean;
}
