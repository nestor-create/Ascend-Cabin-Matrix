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

const COLORS = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceSoft: "#F7F8FA",
  border: "#E6E8EC",
  borderStrong: "#D8DCE2",
  text: "#152533",
  textMuted: "#667085",
  textFaint: "#98A2B3",
  accent: "#6C4DF6",
  accentHover: "#5B3FEA",
  accentSoft: "#F1EEFF",
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2 16l20-4-20-4 5 4-5 4Z" />
      <path d="M7 12h9" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M7 13V6a2 2 0 1 1 4 0v7" />
      <path d="M7 13h8a2 2 0 0 1 2 2v3" />
      <path d="M5 21v-4a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
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
    seatInsight: "Private suite with closing doors and a fully lie-flat bed, engineered for maximum privacy on long-haul routes.",
    description: "Lufthansa's newest flagship First Class suite under the Allegris product family — the most refined hard product the airline has ever offered.",
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
    description: "Lufthansa's new Allegris Business Class offers more seat variety than any other carrier — a genuine upgrade to the cabin experience.",
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
    seatInsight: "Extra-wide 1-2-1 business class suite with direct aisle access, a sliding door, and exceptional personal space throughout.",
    description: "ANA's flagship business class suite, widely regarded as one of the world's best for solo travellers seeking space and privacy.",
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
    seatInsight: "Enclosed suite with closing doors and innovative double-bed configuration — centre pairs convert to a shared space for couples.",
    description: "Qatar Airways' award-winning flagship business class, setting the benchmark for privacy and flexibility in the cabin.",
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
    seatInsight: "One of the largest private suites in commercial aviation, with a separate ottoman, wardrobe, and convertible double bed.",
    description: "Singapore Airlines' Suites product on the A380 is widely considered the pinnacle of commercial aviation luxury.",
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
    routes: ["Abu Dhabi → London Heathrow", "Abu Dhabi → Toronto", "Abu Dhabi → Paris", "Abu Dhabi → Singapore"],
    bestFor: ["Space", "Luxury"],
    seatInsight: "A380 first class with a separate armchair and fully flat bed in a distinct suite — truly apartment-scale dimensions in the sky.",
    description: "Etihad's iconic A380 First Apartment remains one of the most spacious first class experiences available on any airline.",
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
    seatInsight: "Enclosed suite with strong acoustic and visual privacy, a residential-style design, and a wide fully flat bed.",
    description: "ANA's flagship first class suite on selected 777-300ER flights — the quietest and most residential first class in its class.",
    image: "/images/the-suite.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/nh-ana/boeing-777-300er/",
    aerolopaUrl: "https://www.aerolopa.com/nh",
  },
  {
    id: "8",
    rank: 8,
    productName: "Game Changer First",
    airline: "Emirates",
    airlineCode: "EK",
    aircraft: "777-300ER",
    cabinType: "First",
    routes: ["Dubai → Brussels", "Dubai → Geneva", "Dubai → Tokyo Haneda"],
    bestFor: ["Privacy", "Solo"],
    seatInsight: "Fully enclosed suite with floor-to-ceiling privacy walls, zero-gravity seating, and a premium personal minibar.",
    description: "Emirates' newest first class product, delivering complete visual privacy and a futuristic design language unlike anything else in the sky.",
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
    seatInsight: "Highly exclusive first class with just four suites per aircraft, refined French service, and a spacious fully flat bed.",
    description: "Air France's La Première is one of the most exclusive first class products available — only four seats per flight.",
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
    routes: ["London Heathrow → New York JFK", "London Heathrow → Los Angeles", "London Heathrow → Dubai", "London Heathrow → San Francisco"],
    bestFor: ["Privacy", "Network"],
    seatInsight: "1-2-1 layout with closing doors and direct aisle access for every seat — a substantial improvement over older Club World.",
    description: "British Airways' modern Club Suite is a strong option for LHR-routed itineraries on an unrivalled global network.",
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
    routes: ["Los Angeles → Sydney", "New York JFK → London Heathrow", "Detroit → Tokyo Haneda", "Atlanta → Johannesburg"],
    bestFor: ["Privacy", "Consistency"],
    seatInsight: "Suite-style seat with a sliding door and direct aisle access — Delta's most private business class product.",
    description: "Delta One Suite is the most consistent enclosed business class product on US carriers for transatlantic and transpacific routes.",
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
    routes: ["Hong Kong → London Heathrow", "Hong Kong → Sydney", "Hong Kong → Vancouver", "Hong Kong → San Francisco"],
    bestFor: ["Privacy", "Storage"],
    seatInsight: "Next-generation suite with a closing door, generous storage throughout, and Cathay's signature attention to ergonomics.",
    description: "Cathay Pacific's newest flagship business class suite — a significant upgrade in privacy and material quality over the prior product.",
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
    routes: ["Tokyo Haneda → San Francisco", "Tokyo Haneda → New York JFK", "Tokyo Haneda → London Heathrow", "Tokyo Haneda → Dallas/Fort Worth"],
    bestFor: ["Comfort", "Solo"],
    seatInsight: "Direct aisle access for every seat with a thoughtful 1-2-1 layout and Japan Airlines' renowned soft product.",
    description: "JAL's Sky Suite is consistently rated among the best business class experiences for comfort and service quality.",
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
    routes: ["Taipei → New York JFK", "Taipei → Los Angeles", "Taipei → San Francisco", "Taipei → Paris", "Taipei → London Heathrow"],
    bestFor: ["Comfort", "Sleep"],
    seatInsight: "Reverse herringbone seating with direct aisle access, exceptional bed length, and a strong reputation for sleep quality.",
    description: "EVA Air's Royal Laurel is among the highest-rated business class cabins for sleep, particularly on Pacific routes.",
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
    routes: ["Seoul Incheon → New York JFK", "Seoul Incheon → Los Angeles", "Seoul Incheon → Atlanta", "Seoul Incheon → Paris CDG", "Seoul Incheon → London Heathrow", "Seoul Incheon → Frankfurt"],
    bestFor: ["Privacy", "Luxury"],
    seatInsight: "Fully enclosed next-generation first class suite with strong visual and acoustic privacy and highly refined finishes.",
    description: "Korean Air's Kosmo Suites 2.0 is a flagship first class product that outperforms many European equivalents in hard product quality.",
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
    seatInsight: "Suite-style business class with a sliding door, direct aisle access, and the most private layout in Korean Air's fleet.",
    description: "Korean Air's Prestige Suite 2.0 is an underrated business class product available across a wide global network.",
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
    routes: ["London Heathrow → New York JFK", "London Heathrow → Los Angeles", "London Heathrow → San Francisco", "London Heathrow → Delhi"],
    bestFor: ["Couples", "Social"],
    seatInsight: "1-2-1 layout with direct aisle access and a unique social lounge at the rear of the upper class cabin.",
    description: "Virgin Atlantic's Upper Class Suite stands apart for its social design and distinctive cabin atmosphere on transatlantic routes.",
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
    routes: ["New York JFK → Paris CDG", "New York JFK → London Heathrow", "New York JFK → Amsterdam", "Boston → Paris CDG"],
    bestFor: ["Space", "Solo"],
    seatInsight: "The front-row Mint Studio offers a larger enclosed suite with more storage and a distinctly premium feel over standard Mint seats.",
    description: "JetBlue's Mint Studio is the best value premium transatlantic product for solo travellers on core North Atlantic routes.",
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
    routes: ["Sydney → Singapore", "Sydney → London Heathrow", "Melbourne → Dallas/Fort Worth", "Perth → London Heathrow"],
    bestFor: ["Comfort", "Practicality"],
    seatInsight: "Direct aisle access 1-2-1 layout with a practical design, generous storage, and Qantas' well-regarded service.",
    description: "Qantas' Business Suite is a reliable, comfortable choice on key Australia–Europe and Australia–North America routes.",
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
    routes: ["Istanbul → San Francisco", "Istanbul → New York JFK", "Istanbul → Los Angeles", "Istanbul → Tokyo Haneda"],
    bestFor: ["Network", "Value"],
    seatInsight: "Modern long-haul seat with direct aisle access and improved privacy, backed by Turkish Airlines' extensive hub connections.",
    description: "Turkish Airlines' preferred long-haul business product — a strong value option on one of the world's widest networks.",
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
    routes: ["Chicago O'Hare → London Heathrow", "Philadelphia → London Heathrow", "Dallas/Fort Worth → Brisbane", "Dallas/Fort Worth → Auckland"],
    bestFor: ["Privacy", "New Product"],
    seatInsight: "New suite-style business class with closing doors, a wider seat, and a significantly improved hard product over older Flagship Business.",
    description: "American Airlines' newest Flagship Suite is a material upgrade, expanding to more routes through 2025–26.",
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
    routes: ["San Francisco → Singapore", "Newark → London Heathrow", "Washington Dulles → Tokyo Haneda", "San Francisco → Sydney"],
    bestFor: ["Consistency", "Network"],
    seatInsight: "Direct aisle access 1-2-1 layout with a consistent product across a large widebody fleet and extensive global network.",
    description: "United's Polaris is the most consistent premium long-haul product on US carriers, particularly for Star Alliance routing.",
    image: "/images/united-polaris.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ua-united/",
    aerolopaUrl: "https://www.aerolopa.com/ua",
  },
];

const curatedBestForOptions = ["Privacy", "Couples", "Space", "Luxury", "Sleep", "Network"];

const cabinBadgeStyle: Record<CabinType, string> = {
  First: "border-[#E6E8EC] bg-[#F7F8FA] text-[#152533]",
  Business: "border-[#E6E8EC] bg-white text-[#152533]",
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

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
        <RouteIcon />
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        className="h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none placeholder:text-[#98A2B3] focus:border-[#D8DCE2]"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-md border border-[#E6E8EC] bg-white p-1 shadow-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                onSelect(suggestion);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-[#152533] hover:bg-[#F7F8FA]"
            >
              <span>{suggestion}</span>
              <span className="text-[10px] text-[#98A2B3]">Available</span>
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
    let base = productsMatchingNonPlaceFilters;

    if (outboundPlace.trim()) {
      base = base.filter((item) =>
        item.routePairs.some((pair) => normalizeText(pair.from).includes(normalizeText(outboundPlace)))
      );
    }

    return dedupeStrings(base.flatMap((item) => item.routePairs.map((pair) => pair.to))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [productsMatchingNonPlaceFilters, outboundPlace]);

  const outboundPlaceOptions = useMemo(() => {
    const base = outboundPlace.trim() ? filteredOutboundPlaces : placeCatalog;

    return [...base]
      .filter((place) => (outboundPlace.trim() ? scoreSuggestion(outboundPlace, place) > 0 : true))
      .sort((a, b) => scoreSuggestion(outboundPlace, b) - scoreSuggestion(outboundPlace, a) || a.localeCompare(b));
  }, [outboundPlace, filteredOutboundPlaces, placeCatalog]);

  const returnPlaceOptions = useMemo(() => {
    const base = returnPlace.trim()
      ? filteredReturnPlaces
      : filteredReturnPlaces.length
      ? filteredReturnPlaces
      : placeCatalog;

    return [...base]
      .filter((place) => (returnPlace.trim() ? scoreSuggestion(returnPlace, place) > 0 : true))
      .sort((a, b) => scoreSuggestion(returnPlace, b) - scoreSuggestion(returnPlace, a) || a.localeCompare(b));
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

  return (
    <main
      className="min-h-screen bg-white text-[#152533]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        .ascend-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23152533' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          appearance: none;
          padding-right: 32px;
        }
      `}</style>

      <nav className="sticky top-0 z-50 border-b border-[#E6E8EC] bg-white">
        <div className="flex h-[72px] items-center justify-center px-8">
          <img src="/images/ascend-logo.png" alt="Ascend" className="h-9 w-auto object-contain" />
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-8 py-10">
<header className="mb-8 border-b border-[#E6E8EC] px-[56px] pb-8 pt-10">
  <div className="max-w-[760px]">

    {/* PRIMARY TITLE */}
    <h1 className="text-[44px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#152533]">
      Ascend Cabin Optimizer
    </h1>

    {/* SECONDARY LINE */}
    <h2 className="mt-2 text-[44px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#152533]">
      Find your perfect seat in the sky
    </h2>

    {/* DESCRIPTION */}
    <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-[#667085]">
      Compare Business and First Class products across airlines, aircraft, and layouts with AeroLOPA
      and seat maps in one clean view.
    </p>

  </div>

          <div className="grid grid-cols-4 overflow-hidden rounded-lg border border-[#E6E8EC] bg-white">
            {[
              { n: premiumProducts.length, l: "Products" },
              { n: airlineOptions.length, l: "Airlines" },
              { n: placeCatalog.length, l: "Places" },
              { n: filteredProducts.length, l: "Showing" },
            ].map(({ n, l }, index) => (
              <div
                key={l}
                className="min-w-[84px] px-4 py-3 text-center"
                style={{ borderRight: index < 3 ? "1px solid #E6E8EC" : undefined }}
              >
                <div className="text-xl font-semibold text-[#152533]">{n}</div>
                <div className="mt-1 text-[11px] text-[#667085]">{l}</div>
              </div>
            ))}
          </div>
        </header>

        <section className="mb-8 rounded-lg border border-[#E6E8EC] bg-[#F7F8FA] p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
                <SearchIcon />
                Search cabins
              </label>

              <input
                type="text"
                placeholder="Product, airline, aircraft, route, best for…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none placeholder:text-[#98A2B3] focus:border-[#D8DCE2]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
                <PlaneIcon />
                Airline
              </label>

              <select
                value={airline}
                onChange={(event) => setAirline(event.target.value)}
                className="ascend-select h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none"
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
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
                <PlaneIcon />
                Aircraft
              </label>

              <select
                value={aircraft}
                onChange={(event) => setAircraft(event.target.value)}
                className="ascend-select h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none"
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
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
                <SeatIcon />
                Cabin
              </label>

              <select
                value={cabin}
                onChange={(event) => setCabin(event.target.value)}
                className="ascend-select h-10 w-full rounded-md border border-[#E6E8EC] bg-white px-3 text-sm text-[#152533] outline-none"
              >
                <option value="">All cabins</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <PlaceAutosuggest
              label="Outbound"
              placeholder="e.g. Abu Dhabi, Atlanta, Paris CDG, Dallas/Fort Worth"
              value={outboundPlace}
              onChange={setOutboundPlace}
              suggestions={outboundPlaceOptions}
              onSelect={setOutboundPlace}
            />

            <PlaceAutosuggest
              label="Return"
              placeholder="e.g. Amsterdam, London Heathrow, New York JFK, Singapore"
              value={returnPlace}
              onChange={setReturnPlace}
              suggestions={returnPlaceOptions}
              onSelect={setReturnPlace}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-medium text-[#667085]">
                <StarIcon />
                Best for
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="rounded-md border px-3 py-2 text-xs font-medium"
                  style={{
                    background: selectedTags.length === 0 ? COLORS.accent : COLORS.surface,
                    color: selectedTags.length === 0 ? COLORS.bg : COLORS.text,
                    borderColor: selectedTags.length === 0 ? COLORS.accent : COLORS.border,
                  }}
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
                      className="rounded-md border px-3 py-2 text-xs font-medium"
                      style={{
                        background: isActive ? COLORS.accent : COLORS.surface,
                        color: isActive ? COLORS.bg : COLORS.text,
                        borderColor: isActive ? COLORS.accent : COLORS.border,
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="h-10 rounded-md border border-[#E6E8EC] bg-white px-4 text-xs font-medium text-[#152533] hover:bg-[#F7F8FA]"
            >
              Reset filters
            </button>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((item) => {
            const matchingRoutes = item.routePairs.filter((pair) => {
              const outOk =
                !outboundPlace.trim() || normalizeText(pair.from).includes(normalizeText(outboundPlace));

              const retOk =
                !returnPlace.trim() || normalizeText(pair.to).includes(normalizeText(returnPlace));

              return outOk && retOk;
            });

            const visibleRoutes =
              matchingRoutes.length > 0
                ? dedupeRoutePairs(matchingRoutes.filter((pair) => normalizeText(pair.from) <= normalizeText(pair.to)))
                : dedupeRoutePairs(item.routePairs.filter((pair) => normalizeText(pair.from) <= normalizeText(pair.to)));

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-lg border border-[#E6E8EC] bg-white transition hover:shadow-sm"
              >
                <div className="relative h-48 overflow-hidden bg-[#F7F8FA]">
                  <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-md border border-[#E6E8EC] bg-white px-2 py-1 text-[11px] font-medium text-[#152533]">
                      #{item.rank}
                    </span>

                    <span
                      className={`rounded-md border px-2 py-1 text-[11px] font-medium ${cabinBadgeStyle[item.cabinType]}`}
                    >
                      {item.cabinType}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.01em] text-[#152533]">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-[#667085]">
                        {item.airline} · {item.aircraft}
                      </p>
                    </div>

                    <span className="rounded-md border border-[#E6E8EC] bg-[#F7F8FA] px-2 py-1 text-[11px] font-medium text-[#152533]">
                      {item.airlineCode}
                    </span>
                  </div>

                  <div className="mt-4 rounded-md border border-[#E6E8EC] bg-[#F7F8FA] p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#667085]">
                        <RouteIcon />
                      </span>

                      <div>
                        <p className="text-[11px] font-medium text-[#667085]">Route pairs</p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {visibleRoutes.map((pair) => (
                            <span
                              key={formatRoute(pair)}
                              className="rounded-md border border-[#E6E8EC] bg-white px-2 py-1 text-[11px] text-[#152533]"
                            >
                              {pair.from} ⇄ {pair.to}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.bestFor.map((value) => (
                      <span
                        key={value}
                        className="rounded-md border border-[#E6E8EC] bg-white px-2 py-1 text-[11px] text-[#667085]"
                      >
                        {value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="rounded-md border border-[#E6E8EC] bg-white p-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-[#667085]">
                          <SeatIcon />
                        </span>

                        <div>
                          <p className="text-[11px] font-medium text-[#667085]">Seat insight</p>
                          <p className="mt-2 text-sm leading-6 text-[#152533]">{item.seatInsight}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border border-[#E6E8EC] bg-white p-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-[#667085]">
                          <NoteIcon />
                        </span>

                        <div>
                          <p className="text-[11px] font-medium text-[#667085]">Why it stands out</p>
                          <p className="mt-2 text-sm leading-6 text-[#667085]">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                   <a
  href={item.aerolopaUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium !text-white transition hover:bg-[#5B3FEA]"
  style={{ background: COLORS.accent, color: "#FFFFFF" }}
>
  <MapIcon />
  <span className="text-white">AeroLOPA</span>
</a>

                    <a
                      href={item.seatmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#E6E8EC] bg-white px-4 text-sm font-medium text-[#152533] hover:bg-[#F7F8FA]"
                    >
                      <SeatIcon />
                      SeatMaps
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <section className="mt-4 rounded-lg border border-dashed border-[#D8DCE2] bg-[#F7F8FA] px-6 py-14 text-center">
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-[#152533]">
              No cabins matched those filters
            </h2>

            <p className="mt-3 text-sm text-[#667085]">
              Try broader place text like Atlanta, Amsterdam, Paris CDG, or New York JFK — or remove a selected tag.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 h-10 rounded-md px-4 text-sm font-medium text-white transition hover:bg-[#5B3FEA]"
              style={{ background: COLORS.accent }}
            >
              Reset and show all cabins
            </button>
          </section>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E6E8EC] pb-8 pt-6">
          <div className="text-sm font-medium text-[#152533]">Ascend</div>

          <div className="flex flex-wrap gap-5">
            {[
              { label: "joinascend.com", href: "https://www.joinascend.com/" },
              { label: "Case studies", href: "https://www.joinascend.com/#ac-proven-result" },
              { label: "Privacy policy", href: "https://www.joinascend.com/privacy-policy" },
              { label: "Terms of service", href: "https://www.joinascend.com/terms-of-service" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#667085] hover:text-[#152533]"
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}