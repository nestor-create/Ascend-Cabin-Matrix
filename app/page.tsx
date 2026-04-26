"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 16l20-4-20-4 5 4-5 4Z" />
      <path d="M7 12h9" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 13V6a2 2 0 1 1 4 0v7" />
      <path d="M7 13h8a2 2 0 0 1 2 2v3" />
      <path d="M5 21v-4a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17h6" />
      <path d="M15 7h6" />
      <path d="M9 17a4 4 0 1 0 0-8h6a4 4 0 1 1 0 8" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M12 2l10 10-10 10L2 12 12 2Z" />
    </svg>
  );
}

// ─── Theme ────────────────────────────────────────────────────────────────────

const COLORS = {
  bg: "#0B1020",
  bgAlt: "#121933",
  panel: "rgba(18, 25, 51, 0.92)",
  panelSoft: "rgba(18, 25, 51, 0.72)",
  border: "rgba(108, 99, 230, 0.22)",
  borderStrong: "rgba(108, 99, 230, 0.38)",
  indigo: "#6C63E6",
  indigoSoft: "rgba(108, 99, 230, 0.10)",
  white: "#FFFFFF",
  whiteSoft: "rgba(255,255,255,0.72)",
  whiteMuted: "rgba(255,255,255,0.52)",
  whiteFaint: "rgba(255,255,255,0.32)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

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
    seatInsight:
      "Private suite with closing doors and a fully lie-flat bed, engineered for maximum privacy on long-haul routes.",
    description:
      "Lufthansa's newest flagship First Class suite under the Allegris product family — the most refined hard product the airline has ever offered.",
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
    description:
      "Lufthansa's new Allegris Business Class offers more seat variety than any other carrier — a genuine upgrade to the cabin experience.",
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
    seatInsight:
      "Extra-wide 1-2-1 business class suite with direct aisle access, a sliding door, and exceptional personal space throughout.",
    description:
      "ANA's flagship business class suite, widely regarded as one of the world's best for solo travellers seeking space and privacy.",
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
    seatInsight:
      "Enclosed suite with closing doors and innovative double-bed configuration — centre pairs convert to a shared space for couples.",
    description:
      "Qatar Airways' award-winning flagship business class, setting the benchmark for privacy and flexibility in the cabin.",
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
      "One of the largest private suites in commercial aviation, with a separate ottoman, wardrobe, and convertible double bed.",
    description:
      "Singapore Airlines' Suites product on the A380 is widely considered the pinnacle of commercial aviation luxury.",
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
    seatInsight:
      "A380 first class with a separate armchair and fully flat bed in a distinct suite — truly apartment-scale dimensions in the sky.",
    description:
      "Etihad's iconic A380 First Apartment remains one of the most spacious first class experiences available on any airline.",
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
    seatInsight:
      "Enclosed suite with strong acoustic and visual privacy, a residential-style design, and a wide fully flat bed.",
    description:
      "ANA's flagship first class suite on selected 777-300ER flights — the quietest and most residential first class in its class.",
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
    seatInsight:
      "Fully enclosed suite with floor-to-ceiling privacy walls, zero-gravity seating, and a premium personal minibar.",
    description:
      "Emirates' newest first class product, delivering complete visual privacy and a futuristic design language unlike anything else in the sky.",
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
    seatInsight:
      "Highly exclusive first class with just four suites per aircraft, refined French service, and a spacious fully flat bed.",
    description:
      "Air France's La Première is one of the most exclusive first class products available — only four seats per flight.",
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
    seatInsight:
      "1-2-1 layout with closing doors and direct aisle access for every seat — a substantial improvement over older Club World.",
    description:
      "British Airways' modern Club Suite is a strong option for LHR-routed itineraries on an unrivalled global network.",
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
    seatInsight:
      "Suite-style seat with a sliding door and direct aisle access — Delta's most private business class product.",
    description:
      "Delta One Suite is the most consistent enclosed business class product on US carriers for transatlantic and transpacific routes.",
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
    seatInsight:
      "Next-generation suite with a closing door, generous storage throughout, and Cathay's signature attention to ergonomics.",
    description:
      "Cathay Pacific's newest flagship business class suite — a significant upgrade in privacy and material quality over the prior product.",
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
    seatInsight:
      "Direct aisle access for every seat with a thoughtful 1-2-1 layout and Japan Airlines' renowned soft product.",
    description:
      "JAL's Sky Suite is consistently rated among the best business class experiences for comfort and service quality.",
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
    seatInsight:
      "Reverse herringbone seating with direct aisle access, exceptional bed length, and a strong reputation for sleep quality.",
    description:
      "EVA Air's Royal Laurel is among the highest-rated business class cabins for sleep, particularly on Pacific routes.",
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
      "Fully enclosed next-generation first class suite with strong visual and acoustic privacy and highly refined finishes.",
    description:
      "Korean Air's Kosmo Suites 2.0 is a flagship first class product that outperforms many European equivalents in hard product quality.",
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
      "Suite-style business class with a sliding door, direct aisle access, and the most private layout in Korean Air's fleet.",
    description:
      "Korean Air's Prestige Suite 2.0 is an underrated business class product available across a wide global network.",
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
      "1-2-1 layout with direct aisle access and a unique social lounge (The Loft) at the rear of the upper class cabin.",
    description:
      "Virgin Atlantic's Upper Class Suite stands apart for its social design and distinctive cabin atmosphere on transatlantic routes.",
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
      "The front-row Mint Studio offers a larger enclosed suite with more storage and a distinctly premium feel over standard Mint seats.",
    description:
      "JetBlue's Mint Studio is the best value premium transatlantic product for solo travellers on core North Atlantic routes.",
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
    seatInsight:
      "Direct aisle access 1-2-1 layout with a practical design, generous storage, and Qantas' well-regarded service.",
    description:
      "Qantas' Business Suite is a reliable, comfortable choice on key Australia–Europe and Australia–North America routes.",
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
    seatInsight:
      "Modern long-haul seat with direct aisle access and improved privacy, backed by Turkish Airlines' extensive hub connections.",
    description:
      "Turkish Airlines' preferred long-haul business product — a strong value option on one of the world's widest networks.",
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
    seatInsight:
      "New suite-style business class with closing doors, a wider seat, and a significantly improved hard product over older Flagship Business.",
    description:
      "American Airlines' newest Flagship Suite is a material upgrade, expanding to more routes through 2025–26.",
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
    seatInsight:
      "Direct aisle access 1-2-1 layout with a consistent product across a large widebody fleet and extensive global network.",
    description:
      "United's Polaris is the most consistent premium long-haul product on US carriers, particularly for Star Alliance routing.",
    image: "/images/united-polaris.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ua-united/",
    aerolopaUrl: "https://www.aerolopa.com/ua",
  },
];

// ─── Cabin styling ────────────────────────────────────────────────────────────

const cabinAccent: Record<CabinType, string> = {
  First: "bg-white/10 text-white ring-1 ring-inset ring-white/15",
  Business: "bg-[#6C63E6]/15 text-[#6C63E6] ring-1 ring-inset ring-[#6C63E6]/25",
};

const curatedBestForOptions = ["Privacy", "Couples", "Space", "Luxury", "Sleep", "Network"];

// ─── Utilities ────────────────────────────────────────────────────────────────

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

// ─── PlaceAutosuggest ─────────────────────────────────────────────────────────

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
      <label
        className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
        style={{ color: COLORS.indigo }}
      >
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
        className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-white/30"
        style={{
          border: `1px solid ${COLORS.border}`,
          background: COLORS.panelSoft,
          color: COLORS.white,
          borderRadius: 2,
        }}
      />
      {shouldShow && (
        <div
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto p-1.5 shadow-2xl shadow-black/60"
          style={{
            border: `1px solid ${COLORS.borderStrong}`,
            background: "#10162B",
            borderRadius: 2,
          }}
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                onSelect(suggestion);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#6C63E6]/10"
              style={{ color: COLORS.whiteSoft, borderRadius: 2 }}
            >
              <span>{suggestion}</span>
              <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: COLORS.indigo }}>
                Available
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

const premiumProducts: Product[] = rawProducts.map(({ routes, ...item }) => ({
  ...item,
  routePairs: toBidirectionalPairs(routes),
}));

// ─── Page ─────────────────────────────────────────────────────────────────────

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
      className="min-h-screen overflow-hidden text-white"
      style={{
        background: COLORS.bg,
        fontFamily: "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .font-serif-display { font-family: 'Playfair Display', Georgia, serif; }

        .board-bg {
          position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
        }
        .board-track {
          position: absolute; left: 0; right: 0;
          font-family: 'Courier New', Courier, monospace;
          font-size: 11px; letter-spacing: 0.06em;
          color: rgba(108, 99, 230, 0.08);
          white-space: pre; line-height: 2.4;
          user-select: none;
        }
        .board-track-one { top: 8%; animation: boardScroll1 80s linear infinite; }
        .board-track-two { top: 45%; animation: boardScroll2 95s linear infinite; }
        .board-track-three { top: 75%; animation: boardScroll1 110s linear infinite reverse; }
        @keyframes boardScroll1 { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes boardScroll2 { from { transform: translateY(-50%); } to { transform: translateY(0); } }

        .board-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108, 99, 230, 0.08) 0%, transparent 60%);
        }

        .board-vignette {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, #0B1020 0%, transparent 15%, transparent 85%, #0B1020 100%),
            linear-gradient(to right, #0B1020 0%, transparent 8%, transparent 92%, #0B1020 100%);
        }

        .ticker-track { display:flex; gap:0; white-space:nowrap; animation: tickerScroll 60s linear infinite; will-change: transform; }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .cabin-card { transition: transform 0.25s cubic-bezier(.22,.68,0,1.2), border-color 0.2s; }
        .cabin-card:hover { transform: translateY(-3px); }
        .cabin-card img { transition: transform 0.5s cubic-bezier(.22,.68,0,1.2); }
        .cabin-card:hover img { transform: scale(1.04); }

        .ascend-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236C63E6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          -webkit-appearance: none; appearance: none;
          padding-right: 32px;
        }
      `}</style>

      <div className="board-bg" aria-hidden="true">
        <div className="board-glow" />
        <div className="board-track board-track-one">
          {[...boardRows, ...boardRows, ...boardRows].map((row, i) => (
            <div key={`t1-${i}`}>{row}</div>
          ))}
        </div>
        <div className="board-track board-track-two">
          {[...boardRows.slice().reverse(), ...boardRows.slice().reverse(), ...boardRows.slice().reverse()].map(
            (row, i) => (
              <div key={`t2-${i}`}>{row}</div>
            )
          )}
        </div>
        <div className="board-track board-track-three">
          {[...boardRows, ...boardRows, ...boardRows].map((row, i) => (
            <div key={`t3-${i}`}>{row}</div>
          ))}
        </div>
        <div className="board-vignette" />
      </div>

      <div
        className="relative z-20 overflow-hidden border-b"
        style={{ borderColor: COLORS.border, background: "rgba(11, 16, 32, 0.96)", height: 34 }}
      >
        <div className="ticker-track flex h-full items-center">
          {[...premiumProducts, ...premiumProducts].map((item, i) => (
            <span
              key={`tick-${i}`}
              className="flex items-center gap-2 px-8 text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(255,255,255,0.40)", whiteSpace: "nowrap" }}
            >
              <DiamondIcon />
              <span style={{ color: COLORS.indigo, fontWeight: 500 }}>{item.airlineCode}</span>
              <span>{item.productName}</span>
              <span style={{ color: "rgba(255,255,255,0.20)" }}>·</span>
              <span>{item.cabinType}</span>
            </span>
          ))}
        </div>
      </div>

      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10"
        style={{
          height: 60,
          background: "rgba(11, 16, 32, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/images/ascend-logo.png"
            alt="Ascend"
            className="h-8 w-8 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div>
            <div
              className="font-serif-display text-base font-normal tracking-wide"
              style={{ color: COLORS.white, lineHeight: 1 }}
            >
              Ascend
            </div>
            <div
              className="text-[9px] font-medium uppercase tracking-[0.22em]"
              style={{ color: COLORS.indigo }}
            >
              Cabin Optimizer
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-[10px] uppercase tracking-[0.18em]" style={{ color: COLORS.whiteMuted }}>
          Premium cabin search
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1
              className="font-serif-display text-4xl font-normal leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
              style={{ color: COLORS.white }}
            >
              Find your <em style={{ color: COLORS.indigo, fontStyle: "italic" }}>perfect</em>
              <br />
              seat in the sky
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 font-light" style={{ color: COLORS.whiteSoft }}>
              Compare Business and First Class products across airlines, aircraft, and layouts — with
              AeroLOPA and seat maps in one view.
            </p>
          </div>

          <div
            className="flex gap-px overflow-hidden"
            style={{ border: `1px solid ${COLORS.border}`, borderRadius: 2 }}
          >
            {[
              { n: premiumProducts.length, l: "Products" },
              { n: airlineOptions.length, l: "Airlines" },
              { n: placeCatalog.length, l: "Places" },
              { n: filteredProducts.length, l: "Showing" },
            ].map(({ n, l }, i) => (
              <div
                key={l}
                className="flex min-w-[72px] flex-col items-center justify-center px-5 py-4"
                style={{
                  background: i % 2 === 0 ? "rgba(11,16,32,0.88)" : "rgba(18,25,51,0.88)",
                  borderRight: i < 3 ? `1px solid ${COLORS.border}` : undefined,
                }}
              >
                <span className="font-serif-display text-2xl font-normal" style={{ color: COLORS.white }}>
                  {n}
                </span>
                <span
                  className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em]"
                  style={{ color: COLORS.whiteFaint }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        <section
          className="mb-8 p-6 lg:p-8"
          style={{
            border: `1px solid ${COLORS.border}`,
            background: "linear-gradient(180deg, rgba(18,25,51,0.92) 0%, rgba(11,16,32,0.88) 100%)",
            borderRadius: 2,
          }}
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <label
                className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: COLORS.indigo }}
              >
                <SearchIcon />
                Search cabins
              </label>
              <input
                type="text"
                placeholder="Product, airline, aircraft, route, best for…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-white/30"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.panelSoft,
                  color: COLORS.white,
                  borderRadius: 2,
                }}
              />
            </div>

            <div>
              <label
                className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: COLORS.indigo }}
              >
                <PlaneIcon />
                Airline
              </label>
              <select
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="ascend-select w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.panelSoft,
                  color: COLORS.white,
                  borderRadius: 2,
                }}
              >
                <option value="">All airlines</option>
                {airlineOptions.map((option) => (
                  <option key={option} value={option} style={{ background: "#10162B" }}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: COLORS.indigo }}
              >
                <PlaneIcon />
                Aircraft
              </label>
              <select
                value={aircraft}
                onChange={(e) => setAircraft(e.target.value)}
                className="ascend-select w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.panelSoft,
                  color: COLORS.white,
                  borderRadius: 2,
                }}
              >
                <option value="">All aircraft</option>
                {aircraftOptions.map((option) => (
                  <option key={option} value={option} style={{ background: "#10162B" }}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: COLORS.indigo }}
              >
                <SeatIcon />
                Cabin
              </label>
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="ascend-select w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.panelSoft,
                  color: COLORS.white,
                  borderRadius: 2,
                }}
              >
                <option value="">All cabins</option>
                <option value="Business" style={{ background: "#10162B" }}>
                  Business
                </option>
                <option value="First" style={{ background: "#10162B" }}>
                  First
                </option>
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

          <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
            <div>
              <label
                className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: COLORS.indigo }}
              >
                <StarIcon />
                Best for
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-[0.10em] transition-all duration-150"
                  style={{
                    borderRadius: 2,
                    background: selectedTags.length === 0 ? COLORS.indigo : COLORS.indigoSoft,
                    color: COLORS.white,
                    border: `1px solid ${
                      selectedTags.length === 0 ? COLORS.indigo : "rgba(108, 99, 230, 0.25)"
                    }`,
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
                      className="px-4 py-2 text-xs font-medium uppercase tracking-[0.10em] transition-all duration-150"
                      style={{
                        borderRadius: 2,
                        background: isActive ? COLORS.indigo : COLORS.indigoSoft,
                        color: COLORS.white,
                        border: `1px solid ${isActive ? COLORS.indigo : "rgba(108, 99, 230, 0.25)"}`,
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs" style={{ color: COLORS.whiteFaint }}>
                You can select multiple options at once.
              </p>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-150 xl:w-auto"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.indigoSoft,
                  color: COLORS.whiteSoft,
                  borderRadius: 2,
                }}
              >
                Reset filters
              </button>
            </div>
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
                className="cabin-card group overflow-hidden"
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 2,
                  background: "linear-gradient(180deg, rgba(14,20,40,0.94) 0%, rgba(11,16,32,0.90) 100%)",
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.productName} className="block h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1020]/60 to-transparent" />
                  <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
                    <span
                      className="text-[10px] font-medium uppercase tracking-[0.12em]"
                      style={{
                        background: "rgba(11,16,32,0.85)",
                        color: COLORS.whiteSoft,
                        padding: "4px 9px",
                        borderRadius: 2,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      #{item.rank}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${cabinAccent[item.cabinType]}`}
                      style={{ padding: "4px 9px", borderRadius: 2, backdropFilter: "blur(4px)" }}
                    >
                      {item.cabinType}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3
                        className="font-serif-display text-lg font-normal leading-tight tracking-[-0.01em]"
                        style={{ color: COLORS.white }}
                      >
                        {item.productName}
                      </h3>
                      <p className="mt-1 text-xs" style={{ color: COLORS.whiteMuted }}>
                        {item.airline} · {item.aircraft}
                      </p>
                    </div>
                    <span
                      className="flex-shrink-0 text-[10px] font-medium uppercase tracking-[0.14em]"
                      style={{
                        border: `1px solid ${COLORS.border}`,
                        color: COLORS.indigo,
                        padding: "3px 8px",
                        borderRadius: 2,
                      }}
                    >
                      {item.airlineCode}
                    </span>
                  </div>

                  <div
                    className="mt-4 p-4"
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      background: "rgba(18,25,51,0.5)",
                      borderRadius: 2,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span style={{ color: COLORS.indigo, marginTop: 1, flexShrink: 0 }}>
                        <RouteIcon />
                      </span>
                      <div className="w-full">
                        <p
                          className="text-[10px] font-medium uppercase tracking-[0.20em]"
                          style={{ color: COLORS.whiteFaint }}
                        >
                          Route pairs
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {visibleRoutes.map((pair) => (
                            <span
                              key={formatRoute(pair)}
                              className="text-[11px]"
                              style={{
                                border: `1px solid ${COLORS.border}`,
                                background: COLORS.indigoSoft,
                                color: COLORS.whiteSoft,
                                padding: "3px 9px",
                                borderRadius: 2,
                              }}
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
                        className="text-[10px] font-medium uppercase tracking-[0.10em]"
                        style={{
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.whiteMuted,
                          padding: "3px 9px",
                          borderRadius: 2,
                        }}
                      >
                        {value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div
                      className="p-4"
                      style={{
                        border: `1px solid ${COLORS.border}`,
                        background: "rgba(18,25,51,0.5)",
                        borderRadius: 2,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span style={{ color: COLORS.indigo, marginTop: 1, flexShrink: 0 }}>
                          <SeatIcon />
                        </span>
                        <div>
                          <p
                            className="text-[10px] font-medium uppercase tracking-[0.20em]"
                            style={{ color: COLORS.whiteFaint }}
                          >
                            Seat insight
                          </p>
                          <p className="mt-2 text-sm font-light leading-6" style={{ color: COLORS.whiteSoft }}>
                            {item.seatInsight}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-4"
                      style={{
                        border: `1px solid ${COLORS.border}`,
                        background: "rgba(18,25,51,0.5)",
                        borderRadius: 2,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span style={{ color: COLORS.indigo, marginTop: 1, flexShrink: 0 }}>
                          <NoteIcon />
                        </span>
                        <div>
                          <p
                            className="text-[10px] font-medium uppercase tracking-[0.20em]"
                            style={{ color: COLORS.whiteFaint }}
                          >
                            Why it stands out
                          </p>
                          <p className="mt-2 text-sm font-light leading-6" style={{ color: COLORS.whiteMuted }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    <a
                      href={item.aerolopaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.10em] transition-colors duration-200"
                      style={{
                        background: COLORS.indigo,
                        color: COLORS.white,
                        padding: "11px 16px",
                        borderRadius: 2,
                      }}
                    >
                      <MapIcon />
                      AeroLOPA
                    </a>
                    <a
                      href={item.seatmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.10em] transition-colors duration-200"
                      style={{
                        border: `1px solid ${COLORS.border}`,
                        background: COLORS.indigoSoft,
                        color: COLORS.whiteSoft,
                        padding: "11px 16px",
                        borderRadius: 2,
                      }}
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
          <section
            className="mt-2 px-6 py-16 text-center"
            style={{
              border: `1px dashed ${COLORS.borderStrong}`,
              background: COLORS.indigoSoft,
              borderRadius: 2,
            }}
          >
            <h2
              className="font-serif-display text-2xl font-normal tracking-[-0.02em]"
              style={{ color: COLORS.white }}
            >
              No cabins matched those filters
            </h2>
            <p className="mt-3 text-sm font-light" style={{ color: COLORS.whiteMuted }}>
              Try broader place text like Atlanta, Amsterdam, Paris CDG, or New York JFK — or remove a
              selected tag.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200"
              style={{
                background: COLORS.indigo,
                color: COLORS.white,
                padding: "12px 24px",
                borderRadius: 2,
              }}
            >
              Reset and show all cabins
            </button>
          </section>
        )}

        <footer
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t px-1 pb-8 pt-6"
          style={{ borderColor: COLORS.border }}
        >
          <div className="font-serif-display text-sm font-normal" style={{ color: COLORS.whiteMuted }}>
            Ascend
          </div>
          <div className="flex flex-wrap gap-6">
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
                className="text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: COLORS.whiteFaint }}
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