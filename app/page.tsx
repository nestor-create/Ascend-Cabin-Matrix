"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CabinType = "Business" | "First";

type RoutePair = {
  from: string;
  to: string;
};

type Product = {
  id: string;
  rank: number;
  productName: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  cabinType: CabinType;
  routePairs: RoutePair[];
  bestFor: string[];
  seatInsight: string;
  description: string;
  image: string;
  seatmapsUrl: string;
  aerolopaUrl: string;
};

type RawProduct = Omit<Product, "routePairs"> & {
  routes: string[];
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 16l20-4-20-4 5 4-5 4Z" />
      <path d="M7 12h9" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 13V6a2 2 0 1 1 4 0v7" />
      <path d="M7 13h8a2 2 0 0 1 2 2v3" />
      <path d="M5 21v-4a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
      <path d="M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16Z" />
      <path d="M19 14l1.1 2.4L22.5 17l-2.4 1.1L19 20.5l-1.1-2.4L15.5 17l2.4-1.1L19 14Z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 17h6" />
      <path d="M15 7h6" />
      <path d="M9 17a4 4 0 1 0 0-8h6a4 4 0 1 1 0 8" />
    </svg>
  );
}

const rawProducts: RawProduct[] = [
  {
    id: "1",
    rank: 1,
    productName: "Allegris First",
    airline: "Lufthansa",
    airlineCode: "LH",
    aircraft: "A350-900 / 787-9",
    cabinType: "First",
    routes: [
      "Munich → New York JFK",
      "Munich → Chicago",
      "Munich → San Francisco",
      "Munich → Shanghai",
    ],
    bestFor: ["Privacy", "Luxury"],
    seatInsight: "Private suite with doors and a fully lie-flat bed, designed for maximum privacy.",
    description: "Lufthansa’s newest flagship First Class suite under Allegris.",
    image: "/images/allegris-first.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/lh-lufthansa/",
    aerolopaUrl: "https://www.aerolopa.com/lh",
  },
  {
    id: "2",
    rank: 2,
    productName: "Allegris Business",
    airline: "Lufthansa",
    airlineCode: "LH",
    aircraft: "A350-900 / 787-9",
    cabinType: "Business",
    routes: [
      "Munich → New York JFK",
      "Munich → Chicago",
      "Munich → San Francisco",
      "Munich → Shanghai",
    ],
    bestFor: ["Privacy", "Choice"],
    seatInsight: "1-2-1 layout with multiple seat types including suites, extra privacy seats, and extra-long bed options.",
    description: "Lufthansa’s new Allegris Business Class.",
    image: "/images/allegris-business.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/lh-lufthansa/",
    aerolopaUrl: "https://www.aerolopa.com/lh",
  },
  {
    id: "3",
    rank: 3,
    productName: "The Room",
    airline: "ANA",
    airlineCode: "NH",
    aircraft: "777-300ER",
    cabinType: "Business",
    routes: [
      "Tokyo Haneda → London Heathrow",
      "Tokyo Haneda → New York JFK",
      "Tokyo Haneda → Chicago",
      "Tokyo Narita → Chicago",
      "Tokyo Haneda → San Francisco",
      "Tokyo Narita → San Francisco",
    ],
    bestFor: ["Space", "Solo"],
    seatInsight: "Extra-wide 1-2-1 business class seat with direct aisle access and exceptional personal space.",
    description: "ANA’s flagship business class suite.",
    image: "/images/the-room.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/nh-ana/",
    aerolopaUrl: "https://www.aerolopa.com/nh",
  },
  {
    id: "4",
    rank: 4,
    productName: "Qsuite",
    airline: "Qatar Airways",
    airlineCode: "QR",
    aircraft: "A350-1000 / 777-300ER / 787-9",
    cabinType: "Business",
    routes: [
      "Doha → New York JFK",
      "Doha → London Heathrow",
      "Doha → Paris",
      "Doha → Singapore",
      "Doha → Sydney",
      "Doha → Los Angeles",
    ],
    bestFor: ["Couples", "Privacy"],
    seatInsight: "Enclosed suite with doors and flexible seating for couples or groups.",
    description: "Qatar Airways’ flagship business class product.",
    image: "/images/qsuite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/qr-qatar-airways/",
    aerolopaUrl: "https://www.aerolopa.com/qr",
  },
  {
    id: "5",
    rank: 5,
    productName: "Singapore Suites",
    airline: "Singapore Airlines",
    airlineCode: "SQ",
    aircraft: "A380-800",
    cabinType: "First",
    routes: ["Singapore → London Heathrow", "Singapore → Sydney", "Singapore → Shanghai"],
    bestFor: ["Luxury", "Space"],
    seatInsight: "Large private suite concept on the A380 with one of the most spacious first class products in the sky.",
    description: "Singapore Airlines flagship Suites product.",
    image: "/images/singapore-suites.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/sq-singapore-airlines/",
    aerolopaUrl: "https://www.aerolopa.com/sq",
  },
  {
    id: "6",
    rank: 6,
    productName: "Etihad First Apartment",
    airline: "Etihad Airways",
    airlineCode: "EY",
    aircraft: "A380-800",
    cabinType: "First",
    routes: ["Abu Dhabi → London Heathrow"],
    bestFor: ["Space", "Luxury"],
    seatInsight: "A380 first class with a separate seat and bed concept, offering exceptional personal space.",
    description: "Etihad’s iconic A380 First Apartment experience.",
    image: "/images/etihad-apartment.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ey-etihad-airways/",
    aerolopaUrl: "https://www.aerolopa.com/ey",
  },
  {
    id: "7",
    rank: 7,
    productName: "The Suite",
    airline: "ANA",
    airlineCode: "NH",
    aircraft: "777-300ER",
    cabinType: "First",
    routes: ["Tokyo Haneda → New York JFK", "Tokyo Haneda → London Heathrow"],
    bestFor: ["Privacy", "Luxury"],
    seatInsight: "Wide enclosed suite with strong privacy and a modern residential-style design.",
    description: "ANA’s premium first class suite on selected flagship 777-300ER flights.",
    image: "/images/the-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/nh-ana/boeing-777-300er/",
    aerolopaUrl: "https://www.aerolopa.com/nh",
  },
  {
    id: "8",
    rank: 8,
    productName: "Emirates Game Changer First",
    airline: "Emirates",
    airlineCode: "EK",
    aircraft: "777-300ER",
    cabinType: "First",
    routes: ["Dubai → Brussels", "Dubai → Geneva", "Dubai → Tokyo Haneda"],
    bestFor: ["Privacy", "Solo"],
    seatInsight: "Fully enclosed suite with very high privacy and a more futuristic first class feel.",
    description: "Emirates’ newest fully enclosed first class suite on selected 777-300ER aircraft.",
    image: "/images/emirates-game-changer.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ek-emirates/",
    aerolopaUrl: "https://www.aerolopa.com/ek",
  },
  {
    id: "9",
    rank: 9,
    productName: "La Première",
    airline: "Air France",
    airlineCode: "AF",
    aircraft: "777-300ER",
    cabinType: "First",
    routes: [
      "Paris CDG → Los Angeles",
      "Paris CDG → New York JFK",
      "Paris CDG → Tokyo Haneda",
      "Paris CDG → Singapore",
      "Paris CDG → San Francisco",
    ],
    bestFor: ["Luxury", "Exclusivity"],
    seatInsight: "Highly exclusive first class experience with a spacious personal area and refined soft product.",
    description: "Air France’s exclusive long-haul first class product.",
    image: "/images/la-premiere.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/af-air-france/",
    aerolopaUrl: "https://www.aerolopa.com/af",
  },
  {
    id: "10",
    rank: 10,
    productName: "Club Suite",
    airline: "British Airways",
    airlineCode: "BA",
    aircraft: "A350-1000 / 777-300ER / 787-10",
    cabinType: "Business",
    routes: [
      "London Heathrow → New York JFK",
      "London Heathrow → Los Angeles",
      "London Heathrow → Dubai",
      "London Heathrow → San Francisco",
    ],
    bestFor: ["Privacy", "Network"],
    seatInsight: "1-2-1 layout with doors and direct aisle access across the cabin.",
    description: "British Airways’ modern suite-style business class.",
    image: "/images/club-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ba-british-airways/",
    aerolopaUrl: "https://www.aerolopa.com/ba",
  },
  {
    id: "11",
    rank: 11,
    productName: "Delta One Suite",
    airline: "Delta Air Lines",
    airlineCode: "DL",
    aircraft: "A350-900 / A330-900neo",
    cabinType: "Business",
    routes: [
      "Los Angeles → Sydney",
      "New York JFK → London Heathrow",
      "Detroit → Tokyo Haneda",
      "Atlanta → Johannesburg",
    ],
    bestFor: ["Privacy", "Consistency"],
    seatInsight: "Suite-style seat with door and direct aisle access on key long-haul aircraft.",
    description: "Delta’s enclosed suite-style long-haul business class.",
    image: "/images/delta-one-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/dl-delta-air-lines/",
    aerolopaUrl: "https://www.aerolopa.com/dl",
  },
  {
    id: "12",
    rank: 12,
    productName: "Aria Suite",
    airline: "Cathay Pacific",
    airlineCode: "CX",
    aircraft: "777-300ER",
    cabinType: "Business",
    routes: [
      "Hong Kong → London Heathrow",
      "Hong Kong → Sydney",
      "Hong Kong → Vancouver",
      "Hong Kong → San Francisco",
    ],
    bestFor: ["Privacy", "Storage"],
    seatInsight: "Next-generation suite with door, improved storage, and a refined Cathay design.",
    description: "Cathay Pacific’s newest flagship business class suite.",
    image: "/images/cathay-aria.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/cx-cathay-pacific/",
    aerolopaUrl: "https://www.aerolopa.com/cx",
  },
  {
    id: "13",
    rank: 13,
    productName: "Sky Suite",
    airline: "Japan Airlines",
    airlineCode: "JL",
    aircraft: "777-300ER / 787-9",
    cabinType: "Business",
    routes: [
      "Tokyo Haneda → San Francisco",
      "Tokyo Haneda → New York JFK",
      "Tokyo Haneda → London Heathrow",
      "Tokyo Haneda → Dallas/Fort Worth",
    ],
    bestFor: ["Comfort", "Solo"],
    seatInsight: "Direct aisle access layout with a strong balance of privacy and comfort.",
    description: "Japan Airlines’ well-known Sky Suite business class product.",
    image: "/images/jal-sky-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/jl-japan-airlines/",
    aerolopaUrl: "https://www.aerolopa.com/jl",
  },
  {
    id: "14",
    rank: 14,
    productName: "Royal Laurel Class",
    airline: "EVA Air",
    airlineCode: "BR",
    aircraft: "777-300ER",
    cabinType: "Business",
    routes: [
      "Taipei → New York JFK",
      "Taipei → Los Angeles",
      "Taipei → San Francisco",
      "Taipei → Paris",
      "Taipei → London Heathrow",
    ],
    bestFor: ["Comfort", "Sleep"],
    seatInsight: "Reverse herringbone seat with direct aisle access and a strong comfort reputation.",
    description: "EVA Air’s highly rated long-haul business class cabin.",
    image: "/images/eva-royal-laurel.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/br-eva-air/",
    aerolopaUrl: "https://www.aerolopa.com/br",
  },
  {
    id: "15",
    rank: 15,
    productName: "Prestige Suite",
    airline: "Korean Air",
    airlineCode: "KE",
    aircraft: "787-9 / 777-300ER",
    cabinType: "Business",
    routes: [
      "Seoul Incheon → Paris CDG",
      "Seoul Incheon → New York JFK",
      "Seoul Incheon → Los Angeles",
      "Seoul Incheon → London Heathrow",
    ],
    bestFor: ["Privacy", "Solo"],
    seatInsight: "Suite-style premium seat with direct aisle access on long-haul aircraft.",
    description: "Korean Air’s modern long-haul business class suite.",
    image: "/images/korean-prestige.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ke-korean-air/",
    aerolopaUrl: "https://www.aerolopa.com/ke",
  },
  {
    id: "16",
    rank: 16,
    productName: "Upper Class Suite",
    airline: "Virgin Atlantic",
    airlineCode: "VS",
    aircraft: "A330-900neo / A350-1000",
    cabinType: "Business",
    routes: [
      "London Heathrow → New York JFK",
      "London Heathrow → Los Angeles",
      "London Heathrow → San Francisco",
      "London Heathrow → Delhi",
    ],
    bestFor: ["Couples", "Social"],
    seatInsight: "1-2-1 seat configuration with direct aisle access. Features The Loft lounge at the back of the aircraft.",
    description: "Virgin Atlantic’s stylish and modern Upper Class suite.",
    image: "/images/virgin-upper-class.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/vs-virgin-atlantic/",
    aerolopaUrl: "https://www.aerolopa.com/vs",
  },
  {
    id: "17",
    rank: 17,
    productName: "Mint Studio",
    airline: "JetBlue",
    airlineCode: "B6",
    aircraft: "A321LR / A321XLR",
    cabinType: "Business",
    routes: [
      "New York JFK → Paris CDG",
      "New York JFK → London Heathrow",
      "New York JFK → Amsterdam",
      "Boston → Paris CDG",
    ],
    bestFor: ["Space", "Solo"],
    seatInsight: "Front-row Mint Studio offers more space and a larger suite-style experience than standard Mint seats.",
    description: "JetBlue’s spacious front-row Mint Studio product on selected Mint-equipped transatlantic flights.",
    image: "/images/jetblue-mint-studio.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/b6-jetblue-airways/",
    aerolopaUrl: "https://www.aerolopa.com/b6",
  },
  {
    id: "18",
    rank: 18,
    productName: "Business Suite",
    airline: "Qantas",
    airlineCode: "QF",
    aircraft: "A380-800 / 787-9",
    cabinType: "Business",
    routes: [
      "Sydney → Singapore",
      "Sydney → London Heathrow",
      "Melbourne → Dallas/Fort Worth",
      "Perth → London Heathrow",
    ],
    bestFor: ["Comfort", "Practicality"],
    seatInsight: "Direct aisle access layout with a practical and comfortable long-haul design.",
    description: "Qantas’ modern long-haul business class suite.",
    image: "/images/qantas-business-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/qf-qantas/",
    aerolopaUrl: "https://www.aerolopa.com/qf",
  },
  {
    id: "19",
    rank: 19,
    productName: "Business Class",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    aircraft: "787-9 / A350-900",
    cabinType: "Business",
    routes: [
      "Istanbul → San Francisco",
      "Istanbul → New York JFK",
      "Istanbul → Los Angeles",
      "Istanbul → Tokyo Haneda",
    ],
    bestFor: ["Network", "Value"],
    seatInsight: "Modern long-haul seat with direct aisle access and improved privacy over older fleet types.",
    description: "Turkish Airlines’ preferred long-haul business product.",
    image: "/images/turkish-business.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/tk-turkish-airlines/",
    aerolopaUrl: "https://www.aerolopa.com/tk",
  },
  {
    id: "20",
    rank: 20,
    productName: "Flagship Suite",
    airline: "American Airlines",
    airlineCode: "AA",
    aircraft: "787-9",
    cabinType: "Business",
    routes: [
      "Chicago O'Hare → London Heathrow",
      "Philadelphia → London Heathrow",
      "Dallas/Fort Worth → Brisbane",
      "Dallas/Fort Worth → Auckland",
    ],
    bestFor: ["Privacy", "New Product"],
    seatInsight: "New suite-style business class with doors on American’s latest premium configuration.",
    description: "American Airlines’ newest Flagship Suite product.",
    image: "/images/american-flagship.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/aa-american-airlines/",
    aerolopaUrl: "https://www.aerolopa.com/aa",
  },
  {
    id: "21",
    rank: 21,
    productName: "Polaris",
    airline: "United",
    airlineCode: "UA",
    aircraft: "787-9 / 787-10 / 777-300ER",
    cabinType: "Business",
    routes: [
      "San Francisco → Singapore",
      "Newark → London Heathrow",
      "Washington Dulles → Tokyo Haneda",
      "San Francisco → Sydney",
    ],
    bestFor: ["Consistency", "Network"],
    seatInsight: "United’s flagship long-haul seat with direct aisle access and a consistent premium layout.",
    description: "United’s Polaris long-haul business class product.",
    image: "/images/united-polaris.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ua-united/",
    aerolopaUrl: "https://www.aerolopa.com/ua",
  },
];

const boardRows = [
  "LH 410  MUNICH            NEW YORK JFK      08:35   G12   BOARDING",
  "QR 701  DOHA              NEW YORK JFK      09:20   A04   ON TIME ",
  "SQ 322  SINGAPORE         LONDON LHR        10:05   C19   FINAL   ",
  "EY 011  ABU DHABI         LONDON LHR        11:10   B07   GATE OPEN",
  "AF 022  PARIS CDG         LOS ANGELES       11:35   D21   ON TIME ",
  "VS 003  LONDON LHR        NEW YORK JFK      12:15   E09   BOARDING",
  "CX 251  HONG KONG         LONDON LHR        12:55   F11   ON TIME ",
  "NH 211  TOKYO HND         LONDON LHR        13:40   G03   FINAL   ",
  "UA 001  SAN FRANCISCO     SINGAPORE         14:20   H05   ON TIME ",
  "AA 098  CHICAGO ORD       LONDON LHR        15:00   J16   GATE OPEN",
  "TK 079  ISTANBUL          SAN FRANCISCO     15:45   K08   ON TIME ",
  "QF 001  SYDNEY            SINGAPORE         16:20   L14   BOARDING",
];

const cabinAccent: Record<CabinType, string> = {
  Business: "bg-sky-400/10 text-sky-200 ring-1 ring-inset ring-sky-400/20",
  First: "bg-amber-400/10 text-amber-200 ring-1 ring-inset ring-amber-400/20",
};

const curatedBestForOptions = ["Privacy", "Couples", "Space", "Luxury", "Sleep", "Network"];

const locationAliases: Record<string, string[]> = {
  "new york jfk": ["new york jfk", "jfk", "new york", "nyc"],
  "london heathrow": ["london heathrow", "heathrow", "lhr", "london", "lon"],
  "san francisco": ["san francisco", "sfo", "sf"],
  "los angeles": ["los angeles", "lax", "la"],
  "chicago": ["chicago", "ord", "o'hare", "ohare"],
  "chicago o'hare": ["chicago o'hare", "chicago ord", "ord", "o'hare", "ohare", "chicago"],
  munich: ["munich", "muc"],
  doha: ["doha", "doh"],
  singapore: ["singapore", "sin"],
  sydney: ["sydney", "syd"],
  paris: ["paris", "cdg", "par"],
  "paris cdg": ["paris cdg", "paris", "cdg", "charles de gaulle", "par"],
  "abu dhabi": ["abu dhabi", "auh"],
  "tokyo haneda": ["tokyo haneda", "haneda", "hnd", "tokyo"],
  "tokyo narita": ["tokyo narita", "narita", "nrt", "tokyo"],
  tokyo: ["tokyo", "hnd", "nrt", "haneda", "narita"],
  "hong kong": ["hong kong", "hkg"],
  taipei: ["taipei", "tpe"],
  "seoul incheon": ["seoul incheon", "incheon", "icn", "seoul"],
  seoul: ["seoul", "icn", "incheon"],
  istanbul: ["istanbul", "ist"],
  dubai: ["dubai", "dxb"],
  geneva: ["geneva", "gva"],
  brussels: ["brussels", "bru"],
  vancouver: ["vancouver", "yvr"],
  amsterdam: ["amsterdam", "ams"],
  boston: ["boston", "bos"],
  delhi: ["delhi", "del", "new delhi"],
  detroit: ["detroit", "dtw"],
  atlanta: ["atlanta", "atl"],
  johannesburg: ["johannesburg", "jnb"],
  "washington dulles": ["washington dulles", "dulles", "iad", "washington"],
  newark: ["newark", "ewr"],
  "dallas fort worth": ["dallas/fort worth", "dallas fort worth", "dfw", "dallas", "fort worth"],
  "dallas/fort worth": ["dallas/fort worth", "dallas fort worth", "dfw", "dallas", "fort worth"],
  melbourne: ["melbourne", "mel"],
  perth: ["perth", "per"],
  shanghai: ["shanghai", "pvg", "sha"],
  philadelphia: ["philadelphia", "phl"],
  brisbane: ["brisbane", "bne"],
  auckland: ["auckland", "akl"],
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/→/g, " to ")
    .replace(/[–—-]/g, " ")
    .replace(/\//g, " ")
    .replace(/[.,']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitRoute(route: string): RoutePair | null {
  const parts = route.split("→").map((part) => part.trim());
  if (parts.length !== 2) return null;
  return { from: parts[0], to: parts[1] };
}

function dedupeRoutePairs(routePairs: RoutePair[]) {
  const map = new Map<string, RoutePair>();

  for (const pair of routePairs) {
    const key = `${normalizeText(pair.from)}__${normalizeText(pair.to)}`;
    if (!map.has(key)) {
      map.set(key, pair);
    }
  }

  return Array.from(map.values());
}

function getLocationTokens(location: string) {
  const normalized = normalizeText(location);
  const aliasValues = locationAliases[normalized] ?? [];
  const tokenSet = new Set<string>([normalized, ...aliasValues.map(normalizeText)]);

  normalized.split(" ").forEach((part) => {
    if (part) tokenSet.add(part);
  });

  return Array.from(tokenSet).filter(Boolean);
}

function matchesLocation(input: string, location: string) {
  const normalizedInput = normalizeText(input);
  if (!normalizedInput) return true;

  const locationTokens = getLocationTokens(location);

  return locationTokens.some(
    (token) => token.includes(normalizedInput) || normalizedInput.includes(token)
  );
}

function parseRouteInput(input: string): { from: string; to: string; raw: string } {
  const normalized = normalizeText(input);

  if (!normalized) {
    return { from: "", to: "", raw: "" };
  }

  const separators = [" to ", " > ", " -> "];
  for (const separator of separators) {
    if (normalized.includes(separator)) {
      const [from, to] = normalized.split(separator).map((value) => value.trim());
      return { from: from || "", to: to || "", raw: normalized };
    }
  }

  return { from: "", to: "", raw: normalized };
}

function matchesRoutePair(pair: RoutePair, input: string) {
  const parsedInput = parseRouteInput(input);
  if (!parsedInput.raw) return true;

  if (parsedInput.from && parsedInput.to) {
    return matchesLocation(parsedInput.from, pair.from) && matchesLocation(parsedInput.to, pair.to);
  }

  return matchesLocation(parsedInput.raw, pair.from) || matchesLocation(parsedInput.raw, pair.to);
}

function formatRoute(pair: RoutePair) {
  return `${pair.from} → ${pair.to}`;
}

function scoreSuggestion(input: string, route: string) {
  const normalizedInput = normalizeText(input);
  const normalizedRoute = normalizeText(route);

  if (!normalizedInput) return 0;
  if (normalizedRoute.startsWith(normalizedInput)) return 100;
  if (normalizedRoute.includes(normalizedInput)) return 80;

  const parsed = splitRoute(route);
  if (!parsed) return 0;

  const fromMatch = matchesLocation(normalizedInput, parsed.from);
  const toMatch = matchesLocation(normalizedInput, parsed.to);

  if (fromMatch && toMatch) return 70;
  if (fromMatch) return 60;
  if (toMatch) return 50;

  return 0;
}

function RouteAutosuggest({
  label,
  placeholder,
  value,
  onChange,
  suggestions,
  onSelect,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const shouldShow = open && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
        <RouteIcon />
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40"
      />

      {shouldShow && (
        <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-cyan-400/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                onSelect(suggestion);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10"
            >
              <span>{suggestion}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/45">Route</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const premiumProducts: Product[] = rawProducts.map(({ routes, ...item }) => ({
  ...item,
  routePairs: dedupeRoutePairs(routes.map((route) => splitRoute(route)).filter(Boolean) as RoutePair[]),
}));

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [cabin, setCabin] = useState("");
  const [route, setRoute] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const airlineOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.airline))).sort(),
    []
  );

  const aircraftOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.aircraft))).sort(),
    []
  );

  const routeCatalog = useMemo(() => {
    return Array.from(
      new Set(
        premiumProducts.flatMap((item) => item.routePairs.map((pair) => formatRoute(pair)))
      )
    ).sort((a, b) => a.localeCompare(b));
  }, []);

  const productsMatchingNonRouteFilters = useMemo(() => {
    return premiumProducts.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        item.productName.toLowerCase().includes(query) ||
        item.airline.toLowerCase().includes(query) ||
        item.aircraft.toLowerCase().includes(query) ||
        item.routePairs.some((pair) => formatRoute(pair).toLowerCase().includes(query)) ||
        item.bestFor.some((value) => value.toLowerCase().includes(query));

      const matchesAirline = airline === "" || item.airline === airline;
      const matchesAircraft = aircraft === "" || item.aircraft === aircraft;
      const matchesCabin = cabin === "" || item.cabinType === cabin;
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.bestFor.includes(tag));

      return matchesSearch && matchesAirline && matchesAircraft && matchesCabin && matchesTags;
    });
  }, [search, airline, aircraft, cabin, selectedTags]);

  const routeSuggestions = useMemo(() => {
    const scopedRoutes = Array.from(
      new Set(
        productsMatchingNonRouteFilters.flatMap((item) =>
          item.routePairs.map((pair) => formatRoute(pair))
        )
      )
    );

    const base = route.trim() ? scopedRoutes : routeCatalog;

    return [...base]
      .filter((itemRoute) => (route.trim() ? scoreSuggestion(route, itemRoute) > 0 : true))
      .sort(
        (a, b) =>
          scoreSuggestion(route, b) - scoreSuggestion(route, a) || a.localeCompare(b)
      )
      .slice(0, 8);
  }, [route, productsMatchingNonRouteFilters, routeCatalog]);

  const filteredProducts = useMemo(() => {
    return productsMatchingNonRouteFilters.filter((item) => {
      const matchesSelectedRoute =
        !route.trim() || item.routePairs.some((pair) => matchesRoutePair(pair, route));

      return matchesSelectedRoute;
    });
  }, [productsMatchingNonRouteFilters, route]);

  const topThree = filteredProducts.slice(0, 3);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]
    );
  }

  function resetFilters() {
    setSearch("");
    setAirline("");
    setAircraft("");
    setCabin("");
    setRoute("");
    setSelectedTags([]);
  }

  return (
    <main className="app-shell min-h-screen overflow-hidden bg-[#06111b] text-white">
      <div className="airport-board-bg" aria-hidden="true">
        <div className="board-glow" />
        <div className="board-flicker" />
        <div className="board-vignette" />
        <div className="board-track board-track-one">
          {[...boardRows, ...boardRows].map((row, index) => (
            <div key={`one-${index}`} className="board-row">
              {row}
            </div>
          ))}
        </div>
        <div className="board-track board-track-two">
          {[...boardRows.slice().reverse(), ...boardRows.slice().reverse()].map((row, index) => (
            <div key={`two-${index}`} className="board-row">
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="content-layer relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="top-brand flex items-center gap-4">
            <img
              src="/images/ascend-logo.png"
              alt="Ascend Logo"
              width={90}
              height={90}
              className="brand-logo h-[90px] w-[90px] object-contain"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Ascend</p>
              <h1 className="brand-title text-3xl font-semibold sm:text-4xl">Cabin Optimizer</h1>
            </div>
          </div>

          <section className="mt-6 overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/80">
                  <SparklesIcon />
                  Premium cabin intelligence
                </div>

                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  One-way route search with live route suggestions.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  This version uses a single route field only, so users search one route at a time
                  without seeing outbound and return together.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-cyan-100 sm:text-base">
                  Airline, aircraft, cabin, and best-for filters still dynamically scope the route options.
                </p>

                <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                  Updated for a one-way routing flow so the UI no longer suggests two routes for the same search.
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{premiumProducts.length}</p>
                    <p className="mt-1 text-sm text-white/60">curated products</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{airlineOptions.length}</p>
                    <p className="mt-1 text-sm text-white/60">airlines</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{routeCatalog.length}</p>
                    <p className="mt-1 text-sm text-white/60">searchable one-way routes</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{filteredProducts.length}</p>
                    <p className="mt-1 text-sm text-white/60">matching results</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-cyan-400/10 bg-black/45 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <StarIcon />
                  What changed
                </p>

                <div className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                  <p>Removed the return route field completely.</p>
                  <p>Removed reverse-route auto-fill logic.</p>
                  <p>Routes now display one-way only in cards and suggestions.</p>
                  <p>Airline, aircraft, cabin, and tags still filter the route suggestion list.</p>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
                  Tip: type a city, airport code, or a full route like JFK to Doha.
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[28px] border border-cyan-400/10 bg-white/5 p-4 shadow-xl shadow-black/30 backdrop-blur-md sm:p-6">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="xl:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <SearchIcon />
                  Search cabins
                </label>
                <input
                  type="text"
                  placeholder="Product, airline, aircraft, route, best for..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <PlaneIcon />
                  Airline
                </label>
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="">All airlines</option>
                  {airlineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <PlaneIcon />
                  Aircraft
                </label>
                <select
                  value={aircraft}
                  onChange={(e) => setAircraft(e.target.value)}
                  className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="">All aircraft</option>
                  {aircraftOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <SeatIcon />
                  Cabin
                </label>
                <select
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="">All cabins</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <RouteAutosuggest
                label="Route"
                placeholder="e.g. JFK to Doha or Munich"
                value={route}
                onChange={setRoute}
                suggestions={routeSuggestions}
                onSelect={setRoute}
              />
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_auto]">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <StarIcon />
                  Best for
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className={`rounded-full px-3 py-2 text-sm transition ${
                      selectedTags.length === 0
                        ? "bg-cyan-300 text-slate-950"
                        : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    All
                  </button>

                  {curatedBestForOptions.map((option) => {
                    const isActive = selectedTags.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleTag(option)}
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          isActive
                            ? "bg-cyan-400 text-slate-950"
                            : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2 text-xs text-white/45">You can select multiple options at once.</p>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full rounded-2xl border border-cyan-400/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 xl:w-auto"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </section>

          {filteredProducts.length > 0 && (
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/50">Top matches</p>
                  <h2 className="mt-1 text-2xl font-semibold">Best shortlist right now</h2>
                </div>
                <p className="text-sm text-white/55">
                  Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {topThree.map((item) => (
                  <article
                    key={`${item.id}-featured`}
                    className="overflow-hidden rounded-[24px] border border-cyan-400/10 bg-gradient-to-b from-white/10 to-white/5"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src={item.image} alt={item.productName} className="block h-full w-full object-cover" />
                      <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
                        <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-semibold text-slate-950">
                          #{item.rank}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${cabinAccent[item.cabinType]}`}>
                          {item.cabinType}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/45">
                        <span>{item.airlineCode}</span>
                        <span>•</span>
                        <span>{item.airline}</span>
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold">{item.productName}</h3>
                      <p className="mt-1 text-sm text-white/55">{item.aircraft}</p>
                      <p className="mt-2 text-sm text-cyan-200/80">{formatRoute(item.routePairs[0])}</p>
                      <p className="mt-4 text-sm leading-6 text-white/70">{item.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.bestFor.map((value) => (
                          <span
                            key={value}
                            className="rounded-full border border-cyan-400/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                          >
                            Best for {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[24px] border border-cyan-400/10 bg-white/5 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.07]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      #{item.rank}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${cabinAccent[item.cabinType]}`}
                    >
                      {item.cabinType}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight">{item.productName}</h3>
                      <p className="mt-1 text-sm text-white/55">
                        {item.airline} · {item.aircraft}
                      </p>
                    </div>
                    <div className="rounded-full border border-cyan-400/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70">
                      {item.airlineCode}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-black/20 p-4">
                    <div className="flex items-start gap-3">
                      <RouteIcon />
                      <div className="w-full">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                          Available routes
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.routePairs.map((pair) => (
                            <span
                              key={formatRoute(pair)}
                              className="rounded-full border border-cyan-400/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/85"
                            >
                              {formatRoute(pair)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.bestFor.map((value) => (
                      <span key={value} className="rounded-full border border-cyan-400/10 px-3 py-1 text-xs text-white/70">
                        {value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-4">
                      <div className="flex items-start gap-3">
                        <SeatIcon />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Seat insight</p>
                          <p className="mt-2 text-sm leading-6 text-white/75">{item.seatInsight}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-4">
                      <div className="flex items-start gap-3">
                        <NoteIcon />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Why it stands out</p>
                          <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href={item.aerolopaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                    >
                      <MapIcon />
                      Open AeroLOPA
                    </a>

                    <a
                      href={item.seatmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <SeatIcon />
                      Open SeatMaps
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {filteredProducts.length === 0 && (
            <section className="mt-8 rounded-[28px] border border-dashed border-cyan-400/10 bg-white/5 px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold">No cabins matched those filters</h2>
              <p className="mt-3 text-sm text-white/60">
                Try broader route text like city names or airport codes, or remove one selected tag.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                Reset and show all cabins
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}