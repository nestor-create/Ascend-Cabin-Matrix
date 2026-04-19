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

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
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
    seatInsight: "Fully enclosed next-generation first class suite with strong privacy, refined finishes, and a flagship long-haul experience.",
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
    seatInsight: "Suite-style business class seat with door, direct aisle access, and a more private next-generation Korean Air layout.",
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
    seatInsight: "1-2-1 seat configuration with direct aisle access. Features The Loft lounge at the back of the aircraft.",
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
    seatInsight: "Front-row Mint Studio offers more space and a larger suite-style experience than standard Mint seats.",
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
  Business: "border-[#39BDD0]/25 bg-[#122A33] text-[#9EE4EF]",
  First: "border-[#C8A24A]/25 bg-[#2A2417] text-[#EDD79C]",
};

const curatedBestForOptions = ["Privacy", "Couples", "Space", "Luxury", "Sleep", "Network"];

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
    if (!map.has(key)) map.set(key, pair);
  }
  return Array.from(map.values());
}

function dedupeStrings(values: string[]) {
  const map = new Map<string, string>();
  for (const value of values) {
    const key = normalizeText(value);
    if (!map.has(key)) map.set(key, value);
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

function PlaceAutosuggest({
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
      if (!wrapperRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const shouldShow = open && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8DA8B1]">
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
        className="w-full rounded-xl border border-white/8 bg-[#071219] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#53D6E8]/45"
      />

      {shouldShow && (
        <div className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-xl border border-white/8 bg-[#071118]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                onSelect(suggestion);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white/88 transition hover:bg-white/8"
            >
              <span>{suggestion}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#77D4E3]/50">Available</span>
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
  const [outboundPlace, setOutboundPlace] = useState("");
  const [returnPlace, setReturnPlace] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

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

  const productsMatchingNonPlaceFilters = useMemo(() => {
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

      const matchesAirline = airline === "" || item.airline === airline;
      const matchesAircraft = aircraft === "" || item.aircraft === aircraft;
      const matchesCabin = cabin === "" || item.cabinType === cabin;
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.bestFor.includes(tag));

      return matchesSearch && matchesAirline && matchesAircraft && matchesCabin && matchesTags;
    });
  }, [search, airline, aircraft, cabin, selectedTags]);

  const filteredOutboundPlaces = useMemo(() => {
    return dedupeStrings(
      productsMatchingNonPlaceFilters.flatMap((item) => item.routePairs.map((pair) => pair.from))
    ).sort((a, b) => a.localeCompare(b));
  }, [productsMatchingNonPlaceFilters]);

  const filteredReturnPlaces = useMemo(() => {
    let baseProducts = productsMatchingNonPlaceFilters;

    if (outboundPlace.trim()) {
      baseProducts = baseProducts.filter((item) =>
        item.routePairs.some((pair) => normalizeText(pair.from).includes(normalizeText(outboundPlace)))
      );
    }

    return dedupeStrings(baseProducts.flatMap((item) => item.routePairs.map((pair) => pair.to))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [productsMatchingNonPlaceFilters, outboundPlace]);

  const outboundPlaceOptions = useMemo(() => {
    const base = outboundPlace.trim() ? filteredOutboundPlaces : placeCatalog;
    return [...base]
      .filter((place) => (outboundPlace.trim() ? scoreSuggestion(outboundPlace, place) > 0 : true))
      .sort(
        (a, b) =>
          scoreSuggestion(outboundPlace, b) - scoreSuggestion(outboundPlace, a) || a.localeCompare(b)
      );
  }, [outboundPlace, filteredOutboundPlaces, placeCatalog]);

  const returnPlaceOptions = useMemo(() => {
    const base = returnPlace.trim()
      ? filteredReturnPlaces
      : filteredReturnPlaces.length
      ? filteredReturnPlaces
      : placeCatalog;

    return [...base]
      .filter((place) => (returnPlace.trim() ? scoreSuggestion(returnPlace, place) > 0 : true))
      .sort(
        (a, b) =>
          scoreSuggestion(returnPlace, b) - scoreSuggestion(returnPlace, a) || a.localeCompare(b)
      );
  }, [returnPlace, filteredReturnPlaces, placeCatalog]);

  const filteredProducts = useMemo(() => {
    return productsMatchingNonPlaceFilters.filter((item) => {
      const matchesOutbound =
        !outboundPlace.trim() ||
        item.routePairs.some((pair) => normalizeText(pair.from).includes(normalizeText(outboundPlace)));

      const matchesReturn =
        !returnPlace.trim() ||
        item.routePairs.some((pair) => normalizeText(pair.to).includes(normalizeText(returnPlace)));

      return matchesOutbound && matchesReturn;
    });
  }, [productsMatchingNonPlaceFilters, outboundPlace, returnPlace]);

  const compareProducts = useMemo(() => {
    return filteredProducts.filter((p) => selectedCompareIds.includes(p.id)).slice(0, 3);
  }, [filteredProducts, selectedCompareIds]);

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
    setOutboundPlace("");
    setReturnPlace("");
    setSelectedTags([]);
  }

  function toggleCompare(id: string) {
    setSelectedCompareIds((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      if (current.length >= 3) return [...current.slice(1), id];
      return [...current, id];
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#051019] text-white [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,138,157,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(31,59,140,0.14),transparent_26%)]" />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/8 bg-[#07131a]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/ascend-logo.png"
                alt="Ascend Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#8BA4AF]">Ascend</p>
                <h1 className="text-lg font-semibold tracking-[-0.03em] sm:text-xl">
                  Cabin Optimizer
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                Compare premium cabins faster
              </div>
              <a
                href="https://joinascend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#59D4E7] px-4 py-2 text-sm font-semibold text-[#041019] transition hover:brightness-110"
              >
                Apply
              </a>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-4 shadow-xl shadow-black/20 backdrop-blur-md lg:sticky lg:top-[84px]">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#9ADFEA]">
              <FilterIcon />
              Filters
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8BA4AF]">
                  <SearchIcon />
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Product, airline, aircraft..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-[#071219] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#53D6E8]/45"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8BA4AF]">
                  <PlaneIcon />
                  Airline
                </label>
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-[#071219] px-3 py-2.5 text-sm text-white outline-none focus:border-[#53D6E8]/45"
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
                <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8BA4AF]">
                  <PlaneIcon />
                  Aircraft
                </label>
                <select
                  value={aircraft}
                  onChange={(e) => setAircraft(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-[#071219] px-3 py-2.5 text-sm text-white outline-none focus:border-[#53D6E8]/45"
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
                <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8BA4AF]">
                  <SeatIcon />
                  Cabin
                </label>
                <select
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-[#071219] px-3 py-2.5 text-sm text-white outline-none focus:border-[#53D6E8]/45"
                >
                  <option value="">All cabins</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>

              <PlaceAutosuggest
                label="Outbound"
                placeholder="e.g. Abu Dhabi, Atlanta"
                value={outboundPlace}
                onChange={setOutboundPlace}
                suggestions={outboundPlaceOptions}
                onSelect={setOutboundPlace}
              />

              <PlaceAutosuggest
                label="Return"
                placeholder="e.g. London Heathrow, Singapore"
                value={returnPlace}
                onChange={setReturnPlace}
                suggestions={returnPlaceOptions}
                onSelect={setReturnPlace}
              />

              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8BA4AF]">
                  <StarIcon />
                  Best for
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      selectedTags.length === 0
                        ? "bg-[#59D4E7] text-[#041019]"
                        : "border border-white/8 bg-white/5 text-white/72 hover:bg-white/10"
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
                        className={`rounded-full px-3 py-1.5 text-xs transition ${
                          isActive
                            ? "bg-[#42C4D8] text-[#041019]"
                            : "border border-white/8 bg-white/5 text-white/72 hover:bg-white/10"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Reset filters
              </button>
            </div>
          </aside>

          <section className="min-w-0 space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Products</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{premiumProducts.length}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Airlines</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{airlineOptions.length}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Places</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{placeCatalog.length}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Matches</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{filteredProducts.length}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#59D4E7]/20 bg-[#0E242D] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[#9FE5EF]">
                    <SparklesIcon />
                    Premium cabin intelligence
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    Ascend Cabin Optimizer
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">
                    Compare Business &amp; First Class products across airlines, aircraft, and layouts — with AeroLOPA + seat maps all in one place.
                  </p>
                </div>

                <a
                  href="https://joinascend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#59D4E7] px-5 text-sm font-semibold text-[#041019] transition hover:brightness-110"
                >
                  Apply for membership
                </a>
              </div>
            </div>

            {compareProducts.length > 0 && (
              <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(10,20,29,0.88),rgba(8,17,25,0.82))] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Compare</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Side by side</h3>
                  </div>
                  <p className="text-sm text-white/55">Up to 3 products</p>
                </div>

                <div className={`grid gap-4 ${compareProducts.length === 1 ? "md:grid-cols-1" : compareProducts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                  {compareProducts.map((item) => (
                    <article key={`compare-${item.id}`} className="rounded-2xl border border-white/8 bg-[#08141C]/90 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold tracking-[-0.02em]">{item.productName}</h4>
                          <p className="mt-1 text-sm text-white/56">
                            {item.airline} · {item.aircraft}
                          </p>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${cabinAccent[item.cabinType]}`}>
                          {item.cabinType}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3 text-sm">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Best for</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.bestFor.map((value) => (
                              <span key={value} className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-white/75">
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Seat insight</p>
                          <p className="mt-2 leading-6 text-white/74">{item.seatInsight}</p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          <a
                            href={item.aerolopaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#59D4E7] px-4 py-2.5 text-sm font-semibold text-[#041019] transition hover:brightness-110"
                          >
                            <MapIcon />
                            AeroLOPA
                          </a>
                          <a
                            href={item.seatmapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                          >
                            <SeatIcon />
                            SeatMaps
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8BA4AF]">Results</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Cabin products</h3>
              </div>
              <p className="text-sm text-white/55">
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              {filteredProducts.map((item) => {
                const matchingRoutes = item.routePairs.filter((pair) => {
                  const outboundOk =
                    !outboundPlace.trim() ||
                    normalizeText(pair.from).includes(normalizeText(outboundPlace));
                  const returnOk =
                    !returnPlace.trim() ||
                    normalizeText(pair.to).includes(normalizeText(returnPlace));
                  return outboundOk && returnOk;
                });

                const visibleRoutes =
                  matchingRoutes.length > 0
                    ? dedupeRoutePairs(
                        matchingRoutes.filter((pair) => normalizeText(pair.from) <= normalizeText(pair.to))
                      )
                    : dedupeRoutePairs(
                        item.routePairs.filter((pair) => normalizeText(pair.from) <= normalizeText(pair.to))
                      );

                const isCompared = selectedCompareIds.includes(item.id);

                return (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,22,31,0.9),rgba(8,17,25,0.88))] transition duration-200 hover:-translate-y-1 hover:border-white/14"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#051019] via-transparent to-transparent" />

                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full bg-[#59D4E7] px-3 py-1 text-xs font-semibold text-[#041019]">
                          #{item.rank}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${cabinAccent[item.cabinType]}`}>
                          {item.cabinType}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompare(item.id)}
                        className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-medium transition ${
                          isCompared
                            ? "border-[#59D4E7] bg-[#59D4E7] text-[#041019]"
                            : "border-white/10 bg-black/40 text-white backdrop-blur hover:bg-black/55"
                        }`}
                      >
                        {isCompared ? "Added" : "Compare"}
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/42">
                            <span>{item.airlineCode}</span>
                            <span>•</span>
                            <span>{item.airline}</span>
                          </div>
                          <h4 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em]">
                            {item.productName}
                          </h4>
                          <p className="mt-1 text-sm text-white/55">{item.aircraft}</p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                        <div className="flex items-start gap-3">
                          <RouteIcon />
                          <div className="w-full">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
                              Route pairs
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {visibleRoutes.slice(0, 6).map((pair) => (
                                <span
                                  key={formatRoute(pair)}
                                  className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-[#A3E6F0]"
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
                          <span key={value} className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/70">
                            {value}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                          <div className="flex items-start gap-3">
                            <SeatIcon />
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
                                Seat insight
                              </p>
                              <p className="mt-2 text-sm leading-6 text-white/75">{item.seatInsight}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                          <div className="flex items-start gap-3">
                            <NoteIcon />
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
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
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#59D4E7] px-4 py-3 text-sm font-semibold text-[#041019] transition hover:brightness-110"
                        >
                          <MapIcon />
                          Open AeroLOPA
                        </a>

                        <a
                          href={item.seatmapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          <SeatIcon />
                          Open SeatMaps
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <section className="rounded-[28px] border border-dashed border-white/10 bg-white/5 px-6 py-14 text-center">
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">No cabins matched those filters</h2>
                <p className="mt-3 text-sm text-white/60">
                  Try broader place text like Atlanta, Amsterdam, Paris CDG, New York JFK, or remove one selected tag.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-[#59D4E7] px-5 py-3 text-sm font-semibold text-[#041019]"
                >
                  Reset and show all cabins
                </button>
              </section>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}