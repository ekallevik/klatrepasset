// Dummy data for the Klatrepasset MVP.
// User-facing content is Norwegian (product language); identifiers are English.
// In a real product this would come from /backend instead of a static module.

import type {
  Area,
  Badge,
  ClimbEvent,
  EventType,
  League,
  LeaderboardEntry,
  Product,
  Route,
  RouteCategory,
  Season,
  Sponsor,
  Track,
  TrackId,
} from "./types";

// Overall presenting sponsor for Klatrepasset.
export const MAIN_SPONSOR: Sponsor = {
  name: "Fjellsport Oslo",
  logo: "🏔️",
  tagline: "Din lokale klatrebutikk — hovedsponsor for Klatrepasset",
  url: "#",
};

// Local sponsor per crag (keyed by area id). Mirrors "logo på felt-skilt" from the concept.
export const AREA_SPONSORS: Record<string, Sponsor> = {
  kolsas: { name: "Bærum Sport", logo: "🧗", url: "#" },
  hauktjern: { name: "Østmarka Kaffebrenneri", logo: "☕", url: "#" },
  damtjern: { name: "Sandvika Fysioterapi", logo: "🩹", url: "#" },
  kalvoya: { name: "Sjøsiden Kafé", logo: "🌊", url: "#" },
  gjonsjo: { name: "Nordmarka Friluft", logo: "🌲", url: "#" },
  lorenskog: { name: "Lørenskog Sportssenter", logo: "🏋️", url: "#" },
};

/** Universal master code that works for any route (handy for demos/testing). */
export const MASTER_CODE = "EMIL";

/** Maps a route's discipline to its climbing-type category. */
export const DISCIPLINE_CATEGORY: Record<string, RouteCategory> = {
  Sport: "rope",
  Trad: "rope",
  Topptau: "rope",
  Flertaulengder: "rope",
  Buldring: "boulder",
};

export function routeCategory(route: Route): RouteCategory {
  return DISCIPLINE_CATEGORY[route.discipline] ?? "rope";
}

export const CATEGORY_LABEL: Record<RouteCategory, string> = {
  rope: "🧗 Tau",
  boulder: "🪨 Buldring",
};

export const TRACKS: Record<TrackId, Track> = {
  green: { id: "green", label: "Grønt", sub: "Familie & nybegynner", color: "#2f9e44" },
  blue: { id: "blue", label: "Blått", sub: "Allround", color: "#1971c2" },
  black: { id: "black", label: "Svart", sub: "Erfaren", color: "#212529" },
};

export const TRACK_LIST: Track[] = [TRACKS.green, TRACKS.blue, TRACKS.black];

export const AREAS: Area[] = [
  {
    id: "kolsas",
    name: "Kolsås",
    region: "Bærum",
    approachMinutes: 20,
    disciplines: ["Sport", "Trad", "Flertaulengder"],
    safety: "Klubbens hjemmefelt. Bolta sportsruter og klassiske trad-linjer. Frarådes ved vått fjell.",
  },
  {
    id: "hauktjern",
    name: "Hauktjern",
    region: "Østmarka",
    approachMinutes: 15,
    disciplines: ["Buldring"],
    safety: "Buldrefelt ved vannet. Ta med crashpad. Fint for familier på lave blokker.",
  },
  {
    id: "damtjern",
    name: "Damtjern",
    region: "Bærumsmarka",
    approachMinutes: 25,
    disciplines: ["Sport", "Topptau"],
    safety: "Solvendt sportsfelt, mange topptau-vennlige ruter. Bra for nybegynnerkvelder.",
  },
  {
    id: "kalvoya",
    name: "Kalvøya",
    region: "Sandvika",
    approachMinutes: 10,
    disciplines: ["Buldring"],
    safety: "Buldreblokker rett ved sjøen. Kort tilnærming, sjekk tidevann på de laveste.",
  },
  {
    id: "gjonsjo",
    name: "Gjønsjø",
    region: "Nordmarka",
    approachMinutes: 35,
    disciplines: ["Sport", "Flertaulengder"],
    safety: "Lengre tilnærming. Luftige flertaulengder for erfarne. Krever ledklatrekompetanse.",
  },
  {
    id: "lorenskog",
    name: "Sandbakken",
    region: "Lørenskog",
    approachMinutes: 12,
    disciplines: ["Sport", "Topptau"],
    safety: "Lite, vennlig sportsfelt. Korte ruter, lav høyde — fint som første led-felt.",
  },
];

export const ROUTES: Route[] = [
  // Kolsås
  { id: "r-kol-1", areaId: "kolsas", name: "Sprekken", grade: "4", track: "green", discipline: "Sport", points: 10, checkInCode: "KOA", desc: "Lett og grei oppvarming langs en tydelig sprekk." },
  { id: "r-kol-2", areaId: "kolsas", name: "Platekanten", grade: "5", track: "blue", discipline: "Sport", points: 20, checkInCode: "KOB", desc: "Balansert plateklatring, god fotteknikk lønner seg." },
  { id: "r-kol-3", areaId: "kolsas", name: "Overhenget", grade: "6+", track: "black", discipline: "Sport", points: 40, checkInCode: "KOC", desc: "Kraftig parti over taket. Klassiker på feltet." },
  { id: "r-kol-4", areaId: "kolsas", name: "Gamleveien", grade: "5+", track: "blue", discipline: "Trad", points: 30, checkInCode: "KOD", desc: "Klassisk trad-linje, ta med kiler og kameler." },
  { id: "r-kol-5", areaId: "kolsas", name: "Tårnet", grade: "6", track: "black", discipline: "Flertaulengder", points: 50, checkInCode: "KOE", desc: "To taulengder med luftig avslutning. Topptur-følelse." },

  // Hauktjern (bouldering)
  { id: "r-hau-1", areaId: "hauktjern", name: "Barneblokka", grade: "2", track: "green", discipline: "Buldring", points: 5, checkInCode: "HAA", desc: "Lav, snill blokk — perfekt første buldring for barn." },
  { id: "r-hau-2", areaId: "hauktjern", name: "Vannkanten", grade: "4", track: "green", discipline: "Buldring", points: 12, checkInCode: "HAB", desc: "Fine grep langs vannet. Crashpad anbefales." },
  { id: "r-hau-3", areaId: "hauktjern", name: "Kantproblemet", grade: "6A", track: "blue", discipline: "Buldring", points: 25, checkInCode: "HAC", desc: "Teknisk kantklatring, krever presis fotsetting." },
  { id: "r-hau-4", areaId: "hauktjern", name: "Slabben", grade: "6C", track: "black", discipline: "Buldring", points: 45, checkInCode: "HAD", desc: "Beryktet slab uten grep — ren balanse." },

  // Damtjern
  { id: "r-dam-1", areaId: "damtjern", name: "Solveggen", grade: "3", track: "green", discipline: "Topptau", points: 8, checkInCode: "DAA", desc: "Solvendt og snill, ideell for topptau-debut." },
  { id: "r-dam-2", areaId: "damtjern", name: "Første led", grade: "5", track: "blue", discipline: "Sport", points: 20, checkInCode: "DAB", desc: "Trygg, godt bolta linje — perfekt for første ledklatring." },
  { id: "r-dam-3", areaId: "damtjern", name: "Knatten", grade: "5+", track: "blue", discipline: "Sport", points: 24, checkInCode: "DAC", desc: "Variert vegg med god hvile midtveis." },
  { id: "r-dam-4", areaId: "damtjern", name: "Finalen", grade: "6+", track: "black", discipline: "Sport", points: 38, checkInCode: "DAD", desc: "Tøff utgang øverst. Spar litt krefter." },

  // Kalvøya (bouldering)
  { id: "r-kal-1", areaId: "kalvoya", name: "Strandblokka", grade: "3", track: "green", discipline: "Buldring", points: 8, checkInCode: "KAA", desc: "Kort og hyggelig rett ved sjøen." },
  { id: "r-kal-2", areaId: "kalvoya", name: "Tidevannet", grade: "5", track: "blue", discipline: "Buldring", points: 18, checkInCode: "KAB", desc: "Morsom traversering. Sjekk at blokka er tørr." },
  { id: "r-kal-3", areaId: "kalvoya", name: "Saltsteinen", grade: "6B", track: "black", discipline: "Buldring", points: 42, checkInCode: "KAC", desc: "Kraftig avslutning over crux. Mange forsøk kreves." },

  // Gjønsjø (advanced)
  { id: "r-gjo-1", areaId: "gjonsjo", name: "Luftpilaren", grade: "6", track: "black", discipline: "Flertaulengder", points: 55, checkInCode: "GJA", desc: "Tre taulengder, eksponert. Garva klatrere only." },
  { id: "r-gjo-2", areaId: "gjonsjo", name: "Ryggen", grade: "6+", track: "black", discipline: "Flertaulengder", points: 60, checkInCode: "GJB", desc: "Signaturlinjen på feltet. Sesongens trofé." },
  { id: "r-gjo-3", areaId: "gjonsjo", name: "Innsteget", grade: "5+", track: "blue", discipline: "Sport", points: 26, checkInCode: "GJC", desc: "Lavere oppvarmingsrute før de store linjene." },

  // Sandbakken (Lørenskog)
  { id: "r-lor-1", areaId: "lorenskog", name: "Nybegynnern", grade: "3", track: "green", discipline: "Topptau", points: 8, checkInCode: "SAA", desc: "Kort og trygg — fint familiefelt med topptau." },
  { id: "r-lor-2", areaId: "lorenskog", name: "Steget opp", grade: "4+", track: "green", discipline: "Sport", points: 14, checkInCode: "SAB", desc: "Snill ledklatring med god bolting." },
  { id: "r-lor-3", areaId: "lorenskog", name: "Hjørnet", grade: "5+", track: "blue", discipline: "Sport", points: 22, checkInCode: "SAC", desc: "Teknisk hjørne med fin flyt." },
];

export const BADGES: Badge[] = [
  { id: "first-tick", name: "Første tikk", icon: "🎯", desc: "Sjekk inn din aller første rute.", check: (s) => s.totalTicks >= 1 },
  { id: "family-friend", name: "Familievenn", icon: "👨‍👩‍👧", desc: "Fullfør 3 grønne ruter.", check: (s) => s.byTrack.green >= 3 },
  { id: "explorer", name: "Oppdager", icon: "🧭", desc: "Klatre i 3 forskjellige felt.", check: (s) => s.areasVisited >= 3 },
  { id: "all-round", name: "Allrounder", icon: "🔵", desc: "Fullfør minst én rute i hvert spor.", check: (s) => s.byTrack.green >= 1 && s.byTrack.blue >= 1 && s.byTrack.black >= 1 },
  { id: "boulderer", name: "Bulderhund", icon: "🪨", desc: "Fullfør 4 bulderproblemer.", check: (s) => (s.byDiscipline["Buldring"] ?? 0) >= 4 },
  { id: "high-flyer", name: "Høytflyvende", icon: "🦅", desc: "Fullfør en flertaulengde.", check: (s) => (s.byDiscipline["Flertaulengder"] ?? 0) >= 1 },
  { id: "collector", name: "Samleren", icon: "🏆", desc: "Nå 200 poeng denne sesongen.", check: (s) => s.points >= 200 },
];

export const EVENT_TYPE_META: Record<EventType, { label: string; icon: string }> = {
  social: { label: "Sosialt", icon: "🍻" },
  grill: { label: "Grillkveld", icon: "🔥" },
  technique: { label: "Teknikktips", icon: "🧠" },
  instruction: { label: "Instruksjon", icon: "🎓" },
};

// Membership gatherings on the various crags through the season.
export const EVENTS: ClimbEvent[] = [
  {
    id: "ev-1",
    title: "Grillkveld & sosial klatring",
    areaId: "kolsas",
    date: "2026-07-03",
    time: "17:00",
    type: "grill",
    host: "Kolsås Klatreklubb",
    description: "Vi fyrer opp grillen ved hjemmefeltet. Klatre litt, spis litt, bli kjent med klubben.",
    membersOnly: true,
  },
  {
    id: "ev-2",
    title: "Buldretreff med teknikktips",
    areaId: "hauktjern",
    date: "2026-07-10",
    time: "18:00",
    type: "technique",
    host: "Mari (instruktør)",
    description: "Felles bulderøkt der vi går gjennom fotteknikk, balanse og lesing av problemer.",
  },
  {
    id: "ev-3",
    title: "Nybegynnerkveld: topptau-intro",
    areaId: "damtjern",
    date: "2026-07-17",
    time: "17:30",
    type: "instruction",
    host: "Jonas (instruktør)",
    description: "Helt fersk? Vi rigger topptau og lærer deg å klatre og sikre trygt. Utstyr finnes.",
    membersOnly: true,
    price: 250,
  },
  {
    id: "ev-4",
    title: "Solnedgangsbuldring & bading",
    areaId: "kalvoya",
    date: "2026-07-24",
    time: "18:00",
    type: "social",
    host: "Turkomiteen",
    description: "Avslappet kveld på blokkene ved sjøen — ta med badetøy og noe å grille.",
  },
  {
    id: "ev-5",
    title: "Ledteknikk-klinikk",
    areaId: "kolsas",
    date: "2026-08-07",
    time: "17:00",
    type: "technique",
    host: "Mari (instruktør)",
    description: "For deg som vil bli tryggere på led: klipping, hvile og fallteknikk i fokus.",
    price: 200,
  },
  {
    id: "ev-6",
    title: "Flertaulengde-dag for erfarne",
    areaId: "gjonsjo",
    date: "2026-08-21",
    time: "09:00",
    type: "instruction",
    host: "Kolsås Klatreklubb",
    description: "Heldagstur på de lange linjene. Standplass, rappell og taulagsrutiner. Krever ledkompetanse.",
    membersOnly: true,
    price: 450,
  },
  {
    id: "ev-7",
    title: "Familietreff med grilling",
    areaId: "lorenskog",
    date: "2026-09-04",
    time: "16:00",
    type: "grill",
    host: "Familiegruppa",
    description: "Lavterskel treff for hele familien — barnevennlig klatring, lek og pølser på grillen.",
  },
];

// Mini-leaderboards: a friend group and a corporate (Bedriftspakke) league.
export const LEAGUES: League[] = [
  {
    id: "friends",
    name: "Klatrekompisene",
    icon: "🧗",
    description: "Vennegjengen din — ren stolthet og skryterett står på spill.",
    includesYou: true,
    members: [
      { name: "Sofie L.", points: 221, member: true },
      { name: "Markus T.", points: 256, member: false },
      { name: "Aisha K.", points: 174, member: true },
      { name: "Ola N.", points: 132, member: false },
      { name: "Thea R.", points: 88, member: true },
    ],
  },
  {
    id: "acme",
    name: "Acme AS",
    icon: "🏢",
    description: "Bedriftsliga via Bedriftspakken — lagkonkurranse mellom de ansatte.",
    includesYou: false,
    members: [
      { name: "Team Salg", points: 540, member: true },
      { name: "Team Utvikling", points: 498, member: true },
      { name: "Team HR", points: 365, member: true },
      { name: "Team Ledelse", points: 240, member: true },
      { name: "Team Support", points: 205, member: true },
    ],
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { name: "Ingrid S.", points: 412, member: true },
  { name: "Familien Berg", points: 318, member: true },
  { name: "Markus T.", points: 256, member: false },
  { name: "Sofie L.", points: 221, member: true },
  { name: "Jonas H.", points: 188, member: false },
  { name: "Klatreklubb-juniorene", points: 154, member: true },
  { name: "Petter W.", points: 96, member: false },
];

export const SEASON: Season = { label: "Sesong 2026", opens: "1. mars", closes: "30. november" };

// Upsell products shown in the Butikk (shop) view.
export const PRODUCTS: Product[] = [
  {
    id: "guide",
    icon: "📖",
    name: "Klatrefører Oslo",
    tagline: "Komplett klatrefører for Oslo-området — topo, grader og adkomst til alle feltene.",
    price: "kr 349",
    memberPrice: "kr 279",
    features: ["Digital + trykt utgave", "Topo og adkomst til hvert felt", "Oppdateres hver sesong"],
    cta: "Kjøp fører",
  },
  {
    id: "course-toprope",
    icon: "🧗",
    name: "Nybegynnerkurs — Topptau",
    tagline: "Kom trygt i gang med topptauklatring på én kveld.",
    price: "kr 695",
    memberPrice: "kr 495",
    features: ["3 timer med sertifisert instruktør", "Alt utstyr inkludert", "Maks 6 deltakere per kurs"],
    cta: "Meld deg på",
  },
  {
    id: "course-lead",
    icon: "🪢",
    name: "Lederkurs — Led/Sport",
    tagline: "Lær å lede sportsruter og klippe selv — neste steg etter topptau.",
    price: "kr 1 290",
    memberPrice: "kr 990",
    features: ["To kvelder + én feltdag", "Sikring, klipping og fallteknikk", "Krever topptauerfaring"],
    cta: "Meld deg på",
  },
  {
    id: "corporate",
    icon: "🏢",
    name: "Bedriftspakke",
    tagline: "Teambuilding på fjellet med egen firmatoppliste i appen.",
    price: "fra kr 8 900",
    features: [
      "Egen firma-toppliste og lagkonkurranse",
      "Guidet feltdag med instruktører",
      "Klatrepass og fører til alle ansatte",
      "Skreddersydd etter gruppestørrelse og nivå",
    ],
    cta: "Be om tilbud",
    highlight: true,
  },
  {
    id: "physical-pass",
    icon: "🎟️",
    name: "Fysisk Klatrepass",
    tagline: "Et ekte stemplekort å fylle ut i felt — samleobjekt og fin gave.",
    price: "kr 149",
    features: ["Trykt passkort i lommeformat", "Plass til stempel/signatur per felt", "Fin som gave eller suvenir"],
    cta: "Legg til pass",
  },
];
