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

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
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
    aircraft: "A350-900",
    cabinType: "First",
    routes: [
      "Munich → New York JFK",
      "Munich → Newark",
      "Munich → Chicago",
      "Munich → Miami",
      "Munich → San Diego",
      "Munich → Tokyo Haneda",
      "Munich → Shanghai",
      "Munich → Bengaluru",
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
      "Munich → Newark",
      "Munich → Chicago",
      "Munich → Miami",
      "Munich → San Diego",
      "Munich → Tokyo Haneda",
      "Munich → Shanghai",
      "Munich → Bengaluru",
      "Frankfurt → New York JFK",
      "Frankfurt → Los Angeles",
      "Frankfurt → Austin",
      "Frankfurt → Toronto",
      "Frankfurt → Montreal",
      "Frankfurt → Rio de Janeiro",
      "Frankfurt → Bogota",
      "Frankfurt → Lagos",
      "Frankfurt → Malabo",
      "Frankfurt → Cape Town",
      "Frankfurt → Shanghai",
      "Frankfurt → Hyderabad",
      "Frankfurt → Hong Kong",
      "Frankfurt → Delhi",
      "Frankfurt → Nairobi",
      "Frankfurt → Mumbai",
      "Frankfurt → Detroit",
      "Frankfurt → Dallas/Fort Worth",
      "Frankfurt → Atlanta",
      "Frankfurt → Raleigh-Durham",
      "Frankfurt → Kuala Lumpur",
    ],
    bestFor: ["Privacy", "Choice"],
    seatInsight:
      "1-2-1 layout with multiple seat types including suites, extra privacy seats, and extra-long bed options.",
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
    seatInsight:
      "Large private suite concept on the A380 with one of the most spacious first class products in the sky.",
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
    routes: [
      "Abu Dhabi → London Heathrow",
      "Abu Dhabi → Toronto",
      "Abu Dhabi → Paris",
      "Abu Dhabi → Singapore",
    ],
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
      "Paris CDG → Abidjan",
      "Paris CDG → Atlanta",
      "Paris CDG → Boston",
      "Paris CDG → Dubai",
      "Paris CDG → Houston",
      "Paris CDG → Los Angeles",
      "Paris CDG → Miami",
      "Paris CDG → New York JFK",
      "Paris CDG → San Francisco",
      "Paris CDG → Sao Paulo",
      "Paris CDG → Singapore",
      "Paris CDG → Tel Aviv",
      "Paris CDG → Tokyo Haneda",
      "Paris CDG → Washington D.C.",
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
    productName: "Kosmo Suites 2.0",
    airline: "Korean Air",
    airlineCode: "KE",
    aircraft: "747-8",
    cabinType: "First",
    routes: [
      "Seoul Incheon → New York JFK",
      "Seoul Incheon → Los Angeles",
      "Seoul Incheon → Atlanta",
      "Seoul Incheon → Paris CDG",
      "Seoul Incheon → London Heathrow",
      "Seoul Incheon → Frankfurt",
    ],
    bestFor: ["Privacy", "Luxury"],
    seatInsight:
      "Fully enclosed next-generation first class suite with strong privacy, refined finishes, and a flagship long-haul experience.",
    description: "Korean Air’s Kosmo Suites 2.0 flagship First Class product.",
    image: "/images/korean-kosmo-suites-2.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ke-korean-air/",
    aerolopaUrl: "https://www.aerolopa.com/ke",
  },
  {
    id: "16",
    rank: 16,
    productName: "Prestige Suite 2.0",
    airline: "Korean Air",
    airlineCode: "KE",
    aircraft: "787-10 / 777-300ER / A350-900",
    cabinType: "Business",
    routes: [
      "Seoul Incheon → New York JFK",
      "Seoul Incheon → Los Angeles",
      "Seoul Incheon → San Francisco",
      "Seoul Incheon → Seattle",
      "Seoul Incheon → Vancouver",
      "Seoul Incheon → London Heathrow",
      "Seoul Incheon → Paris CDG",
      "Seoul Incheon → Frankfurt",
      "Seoul Incheon → Rome",
      "Seoul Incheon → Madrid",
      "Seoul Incheon → Sydney",
      "Seoul Incheon → Singapore",
      "Seoul Incheon → Tokyo Haneda",
    ],
    bestFor: ["Privacy", "Solo"],
    seatInsight:
      "Suite-style business class seat with door, direct aisle access, and a more private next-generation Korean Air layout.",
    description: "Korean Air’s newer Prestige Suite 2.0 Business Class product.",
    image: "/images/korean-prestige-suite-2.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ke-korean-air/",
    aerolopaUrl: "https://www.aerolopa.com/ke",
  },
  {
    id: "17",
    rank: 17,
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
    seatInsight:
      "1-2-1 seat configuration with direct aisle access. Features The Loft lounge at the back of the aircraft.",
    description: "Virgin Atlantic’s stylish and modern Upper Class suite.",
    image: "/images/virgin-upper-class.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/vs-virgin-atlantic/",
    aerolopaUrl: "https://www.aerolopa.com/vs",
  },
  {
    id: "18",
    rank: 18,
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
    seatInsight:
      "Front-row Mint Studio offers more space and a larger suite-style experience than standard Mint seats.",
    description: "JetBlue’s spacious front-row Mint Studio product on selected Mint-equipped transatlantic flights.",
    image: "/images/jetblue-mint-studio.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/b6-jetblue-airways/",
    aerolopaUrl: "https://www.aerolopa.com/b6",
  },
  {
    id: "19",
    rank: 19,
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
    id: "20",
    rank: 20,
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
    id: "21",
    rank: 21,
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
    id: "22",
    rank: 22,
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

function dedupeStrings(values: string[]) {
  const map = new Map<string, string>();

  for (const value of values) {
    const key = normalizeText(value);
    if (!map.has(key)) {
      map.set(key, value);
    }
  }

  return Array.from(map.values());
}

function toBidirectionalPairs(routes: string[]) {
  const pairs: RoutePair[] = [];

  for (const route of routes) {
    const parsed = splitRoute(route);
    if (!parsed) continue;

    pairs.push(parsed);
    pairs.push({ from: parsed.to, to: parsed.from });
  }

  return dedupeRoutePairs(pairs);
}

function formatRoute(pair: RoutePair) {
  return `${pair.from} → ${pair.to}`;
}

function scoreSuggestion(input: string, value: string) {
  const normalizedInput = normalizeText(input);
  const normalizedValue = normalizeText(value);

  if (!normalizedInput) return 0;
  if (normalizedValue.startsWith(normalizedInput)) return 100;
  if (normalizedValue.includes(normalizedInput)) return 80;
  return 0;
}

function routeMatchesInput(value: string, input: string) {
  if (!input.trim()) return true;
  return normalizeText(value).includes(normalizeText(input));
}

function arrayIncludesNormalized(values: string[], value: string) {
  const normalizedValue = normalizeText(value);
  return values.some((item) => normalizeText(item) === normalizedValue);
}

function dedupeSelected(values: string[]) {
  return dedupeStrings(values);
}

function routeKey(pair: RoutePair) {
  return `${normalizeText(pair.from)}__${normalizeText(pair.to)}`;
}

function pairMatchesSelections(pair: RoutePair, selectedFroms: string[], selectedTos: string[]) {
  const hasFromSelections = selectedFroms.length > 0;
  const hasToSelections = selectedTos.length > 0;

  const matchesFrom = !hasFromSelections || arrayIncludesNormalized(selectedFroms, pair.from);
  const matchesTo = !hasToSelections || arrayIncludesNormalized(selectedTos, pair.to);

  return matchesFrom && matchesTo;
}

function hasExactSelectedRoutePair(item: Product, selectedFroms: string[], selectedTos: string[]) {
  if (selectedFroms.length === 0 && selectedTos.length === 0) return true;
  return item.routePairs.some((pair) => pairMatchesSelections(pair, selectedFroms, selectedTos));
}

function getVisibleRoutePairs(item: Product, selectedFroms: string[], selectedTos: string[]) {
  const matched = item.routePairs.filter((pair) => pairMatchesSelections(pair, selectedFroms, selectedTos));

  const base = matched.length > 0 ? matched : item.routePairs;

  return dedupeRoutePairs(base.filter((pair) => normalizeText(pair.from) <= normalizeText(pair.to)));
}

function MultiPlaceAutosuggest({
  label,
  placeholder,
  value,
  onChange,
  suggestions,
  selectedValues,
  onSelect,
  onRemove,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
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

  const filteredSuggestions = suggestions.filter((suggestion) => !arrayIncludesNormalized(selectedValues, suggestion));
  const shouldShow = open && filteredSuggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
        <RouteIcon />
        {label}
      </label>

      <div className="rounded-2xl border border-cyan-400/10 bg-black/75 px-3 py-3">
        {selectedValues.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedValues.map((selected) => (
              <span
                key={selected}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-white/5 px-3 py-1.5 text-xs text-cyan-100/90"
              >
                {selected}
                <button
                  type="button"
                  onClick={() => onRemove(selected)}
                  className="rounded-full text-white/60 transition hover:text-white"
                  aria-label={`Remove ${selected}`}
                >
                  <XIcon />
                </button>
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>

      {shouldShow && (
        <div className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-cyan-400/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {filteredSuggestions.map((suggestion) => (
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
              <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/45">Add</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const premiumProducts: Product[] = rawProducts.map(({ routes, ...item }) => ({
  ...item,
  routePairs: toBidirectionalPairs(routes),
}));

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [cabin, setCabin] = useState("");
  const [outboundInput, setOutboundInput] = useState("");
  const [returnInput, setReturnInput] = useState("");
  const [selectedOutboundPlaces, setSelectedOutboundPlaces] = useState<string[]>([]);
  const [selectedReturnPlaces, setSelectedReturnPlaces] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const airlineOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.airline))).sort(),
    []
  );

  const aircraftOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.aircraft))).sort(),
    []
  );

  const placeCatalog = useMemo(() => {
    return dedupeStrings(
      premiumProducts.flatMap((item) => item.routePairs.flatMap((pair) => [pair.from, pair.to]))
    ).sort((a, b) => a.localeCompare(b));
  }, []);

  const baseProductsWithoutAirlineOrRouteOrTag = useMemo(() => {
    return premiumProducts.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        item.productName.toLowerCase().includes(query) ||
        item.airline.toLowerCase().includes(query) ||
        item.aircraft.toLowerCase().includes(query) ||
        item.routePairs.some(
          (pair) =>
            pair.from.toLowerCase().includes(query) ||
            pair.to.toLowerCase().includes(query) ||
            formatRoute(pair).toLowerCase().includes(query)
        ) ||
        item.bestFor.some((value) => value.toLowerCase().includes(query));

      const matchesAircraft = aircraft === "" || item.aircraft === aircraft;
      const matchesCabin = cabin === "" || item.cabinType === cabin;

      return matchesSearch && matchesAircraft && matchesCabin;
    });
  }, [search, aircraft, cabin]);

  const routeMatchedProducts = useMemo(() => {
    return baseProductsWithoutAirlineOrRouteOrTag.filter((item) =>
      hasExactSelectedRoutePair(item, selectedOutboundPlaces, selectedReturnPlaces)
    );
  }, [baseProductsWithoutAirlineOrRouteOrTag, selectedOutboundPlaces, selectedReturnPlaces]);

  const tagMatchedProductsForAirlineOptions = useMemo(() => {
    return routeMatchedProducts.filter((item) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.every((tag) => item.bestFor.includes(tag));
    });
  }, [routeMatchedProducts, selectedTags]);

  const airlineOptionsForSelect = useMemo(() => {
    const scoped =
      tagMatchedProductsForAirlineOptions.length > 0
        ? tagMatchedProductsForAirlineOptions
        : routeMatchedProducts.length > 0
        ? routeMatchedProducts
        : baseProductsWithoutAirlineOrRouteOrTag;

    return dedupeStrings(scoped.map((item) => item.airline)).sort((a, b) => a.localeCompare(b));
  }, [tagMatchedProductsForAirlineOptions, routeMatchedProducts, baseProductsWithoutAirlineOrRouteOrTag]);

  useEffect(() => {
    setAirline((current) => {
      if (!current) return current;
      if (!airlineOptionsForSelect.includes(current)) return "";
      return current;
    });
  }, [airlineOptionsForSelect]);

  const productsMatchingAirlineAndNonRoute = useMemo(() => {
    return baseProductsWithoutAirlineOrRouteOrTag.filter((item) => {
      const matchesAirline = airline === "" || item.airline === airline;
      return matchesAirline;
    });
  }, [baseProductsWithoutAirlineOrRouteOrTag, airline]);

  const filteredOutboundPlaces = useMemo(() => {
    return dedupeStrings(
      productsMatchingAirlineAndNonRoute.flatMap((item) => item.routePairs.map((pair) => pair.from))
    ).sort((a, b) => a.localeCompare(b));
  }, [productsMatchingAirlineAndNonRoute]);

  const filteredReturnPlaces = useMemo(() => {
    let base = productsMatchingAirlineAndNonRoute;

    if (selectedOutboundPlaces.length > 0) {
      base = base.filter((item) =>
        item.routePairs.some((pair) => arrayIncludesNormalized(selectedOutboundPlaces, pair.from))
      );
    }

    return dedupeStrings(base.flatMap((item) => item.routePairs.map((pair) => pair.to))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [productsMatchingAirlineAndNonRoute, selectedOutboundPlaces]);

  const outboundPlaceOptions = useMemo(() => {
    const base = outboundInput.trim() ? filteredOutboundPlaces : filteredOutboundPlaces.length ? filteredOutboundPlaces : placeCatalog;

    return [...base]
      .filter((place) => (outboundInput.trim() ? scoreSuggestion(outboundInput, place) > 0 : true))
      .sort(
        (a, b) =>
          scoreSuggestion(outboundInput, b) - scoreSuggestion(outboundInput, a) || a.localeCompare(b)
      );
  }, [outboundInput, filteredOutboundPlaces, placeCatalog]);

  const returnPlaceOptions = useMemo(() => {
    const base = returnInput.trim() ? filteredReturnPlaces : filteredReturnPlaces.length ? filteredReturnPlaces : placeCatalog;

    return [...base]
      .filter((place) => (returnInput.trim() ? scoreSuggestion(returnInput, place) > 0 : true))
      .sort(
        (a, b) =>
          scoreSuggestion(returnInput, b) - scoreSuggestion(returnInput, a) || a.localeCompare(b)
      );
  }, [returnInput, filteredReturnPlaces, placeCatalog]);

  const bestForRankingSource = useMemo(() => {
    return routeMatchedProducts.filter((item) => {
      const matchesAirline = airline === "" || item.airline === airline;
      return matchesAirline;
    });
  }, [routeMatchedProducts, airline]);

  const topBestForOptions = useMemo(() => {
    const counts = new Map<string, { count: number; bestRank: number }>();

    for (const item of bestForRankingSource) {
      for (const tag of item.bestFor) {
        const existing = counts.get(tag);

        if (existing) {
          existing.count += 1;
          existing.bestRank = Math.min(existing.bestRank, item.rank);
        } else {
          counts.set(tag, {
            count: 1,
            bestRank: item.rank,
          });
        }
      }
    }

    return Array.from(counts.entries())
      .map(([label, meta]) => ({
        label,
        count: meta.count,
        bestRank: meta.bestRank,
      }))
      .sort((a, b) => b.count - a.count || a.bestRank - b.bestRank || a.label.localeCompare(b.label))
      .slice(0, 5);
  }, [bestForRankingSource]);

  const filteredProducts = useMemo(() => {
    return productsMatchingAirlineAndNonRoute.filter((item) => {
      const matchesRoute = hasExactSelectedRoutePair(item, selectedOutboundPlaces, selectedReturnPlaces);
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.bestFor.includes(tag));

      return matchesRoute && matchesTags;
    });
  }, [productsMatchingAirlineAndNonRoute, selectedOutboundPlaces, selectedReturnPlaces, selectedTags]);


  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]
    );
  }

  function addOutboundPlace(value: string) {
    setSelectedOutboundPlaces((current) => dedupeSelected([...current, value]));
    setOutboundInput("");
  }

  function addReturnPlace(value: string) {
    setSelectedReturnPlaces((current) => dedupeSelected([...current, value]));
    setReturnInput("");
  }

  function removeOutboundPlace(value: string) {
    setSelectedOutboundPlaces((current) => current.filter((item) => normalizeText(item) !== normalizeText(value)));
  }

  function removeReturnPlace(value: string) {
    setSelectedReturnPlaces((current) => current.filter((item) => normalizeText(item) !== normalizeText(value)));
  }

  function resetFilters() {
    setSearch("");
    setAirline("");
    setAircraft("");
    setCabin("");
    setOutboundInput("");
    setReturnInput("");
    setSelectedOutboundPlaces([]);
    setSelectedReturnPlaces([]);
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
        
            </div>
          </div>

          <section className="mt-6 overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/80">
                  <SparklesIcon />
                  Premium cabin intelligence
                </div>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Ascend Cabin Optimizer
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-7 text-white/75 sm:text-xl">
                  Compare Business &amp; First Class products across airlines, aircraft, and layouts — with AeroLOPA + seat maps all in one place.
                </p>

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
                    <p className="text-2xl font-semibold">{placeCatalog.length}</p>
                    <p className="mt-1 text-sm text-white/60">searchable places</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{filteredProducts.length}</p>
                    <p className="mt-1 text-sm text-white/60">matching results</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-cyan-300/5 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
                  <StarIcon />
                  Ready to book?
                </div>

                <div className="mt-5 rounded-3xl border border-cyan-300/15 bg-white/5 p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/55">Premium savings</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    <span className="bg-gradient-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">
                      Save an average of 35% on Business and First Class
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-cyan-50/85">
                    while booking with a premium travel experience designed around flexibility, speed, and expert support.
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-white/70">
                  Experience 24/7 access to travel concierge.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/75">
                  Apply for membership to unlock personalized flight sourcing, premium fare monitoring, and concierge support at every step of your trip.
                </div>

                <a
                  href="https://joinascend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Apply for membership at joinascend.com
                </a>
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
                  placeholder="Product, airline, aircraft, route, place, best for..."
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
                  {airlineOptionsForSelect.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {airlineOptionsForSelect.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/45">
                      Matching airlines
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {airlineOptionsForSelect.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setAirline(option)}
                          className={`rounded-full px-2.5 py-1 text-xs transition ${
                            airline === option
                              ? "bg-cyan-300 text-slate-950"
                              : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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

            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <MultiPlaceAutosuggest
                label="Outbound"
                placeholder="Add one or more origins"
                value={outboundInput}
                onChange={setOutboundInput}
                suggestions={outboundPlaceOptions}
                selectedValues={selectedOutboundPlaces}
                onSelect={addOutboundPlace}
                onRemove={removeOutboundPlace}
              />

              <MultiPlaceAutosuggest
                label="Return"
                placeholder="Add one or more destinations"
                value={returnInput}
                onChange={setReturnInput}
                suggestions={returnPlaceOptions}
                selectedValues={selectedReturnPlaces}
                onSelect={addReturnPlace}
                onRemove={removeReturnPlace}
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

                  {topBestForOptions.map((option) => {
                    const isActive = selectedTags.includes(option.label);

                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => toggleTag(option.label)}
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          isActive
                            ? "bg-cyan-400 text-slate-950"
                            : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className="ml-2 text-[11px] opacity-75">{option.count}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2 text-xs text-white/45">
                  Top 5 best-for tags are calculated from the currently relevant matching airline seats.
                </p>
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

          <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((item) => {
              const visibleRoutes = getVisibleRoutePairs(item, selectedOutboundPlaces, selectedReturnPlaces);

              return (
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
                    </div>

                    <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-black/20 p-4">
                      <div className="flex items-start gap-3">
                        <RouteIcon />
                        <div className="w-full">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                            Route pairs
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {visibleRoutes.map((pair) => (
                              <span
                                key={routeKey(pair)}
                                className="rounded-full border border-cyan-400/10 bg-white/5 px-3 py-1 text-xs text-cyan-100/85"
                              >
                                {pair.from} ⇄ {pair.to}
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
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                              Seat insight
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/75">{item.seatInsight}</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-cyan-400/10 bg-black/20 p-4">
                        <div className="flex items-start gap-3">
                          <NoteIcon />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                              Why it stands out
                            </p>
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
              );
            })}
          </section>

          {filteredProducts.length === 0 && (
            <section className="mt-8 rounded-[28px] border border-dashed border-cyan-400/10 bg-white/5 px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold">No cabins matched those filters</h2>
              <p className="mt-3 text-sm text-white/60">
                Try broader place combinations, remove one best-for tag, or reset the route filters.
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