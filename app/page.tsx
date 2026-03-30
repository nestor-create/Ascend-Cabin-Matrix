"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CabinType = "Business" | "First";

type Product = {
  id: string;
  rank: number;
  productName: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  cabinType: CabinType;
  route: string;
  bestFor: string[];
  seatInsight: string;
  description: string;
  image: string;
  seatmapsUrl: string;
  aerolopaUrl: string;
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

const premiumProducts: Product[] = [
  {
    id: "1",
    rank: 1,
    productName: "Allegris First",
    airline: "Lufthansa",
    airlineCode: "LH",
    aircraft: "A350-900 / 787-9",
    cabinType: "First",
    route: "Munich → New York JFK",
    bestFor: ["Privacy", "Solo"],
    seatInsight: "Private suite with doors and a fully lie-flat bed, designed for maximum privacy.",
    description: "Lufthansa’s newest flagship first class suite under Allegris.",
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
    route: "Munich → San Francisco",
    bestFor: ["Privacy", "Choice"],
    seatInsight: "1-2-1 layout with multiple seat types including suites, extra privacy seats, and extra-long bed options.",
    description: "Lufthansa’s new Allegris business class with a more flexible premium seat concept.",
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
    route: "Tokyo Haneda → London Heathrow",
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
    route: "Doha → New York JFK",
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
    route: "Singapore → London Heathrow",
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
    route: "Abu Dhabi → London Heathrow",
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
    route: "Tokyo Haneda → New York JFK",
    bestFor: ["Privacy", "Luxury"],
    seatInsight: "Wide enclosed suite with strong privacy and a modern residential-style design.",
    description: "ANA’s premium first class suite product.",
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
    route: "Dubai → Brussels",
    bestFor: ["Privacy", "Solo"],
    seatInsight: "Fully enclosed suite with very high privacy and a more futuristic first class feel.",
    description: "Emirates’ newest fully enclosed first class suite.",
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
    route: "Paris CDG → Los Angeles",
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
    route: "London Heathrow → Washington Dulles",
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
    route: "Los Angeles → Sydney",
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
    route: "Hong Kong → London Heathrow",
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
    route: "Tokyo Haneda → San Francisco",
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
    route: "Taipei → New York JFK",
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
    route: "Seoul Incheon → Paris CDG",
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
    route: "London Heathrow → New York JFK",
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
    route: "New York JFK → Paris CDG",
    bestFor: ["Space", "Solo"],
    seatInsight: "Front-row Mint Studio offers more space and a larger suite-style experience than standard Mint seats.",
    description: "JetBlue’s spacious front-row Mint Studio product.",
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
    route: "Sydney → Singapore",
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
    route: "Istanbul → San Francisco",
    bestFor: ["Network", "Value"],
    seatInsight: "Modern long-haul seat with direct aisle access and improved privacy over older fleet types.",
    description: "Turkish Airlines’ long-haul business class cabin.",
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
    route: "Dallas Fort Worth → Brisbane",
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
    route: "San Francisco → Singapore",
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
  "AF 006  PARIS CDG         LOS ANGELES       11:35   D21   ON TIME ",
  "VS 003  LONDON LHR        NEW YORK JFK      12:15   E09   BOARDING",
  "CX 251  HONG KONG         LONDON LHR        12:55   F11   ON TIME ",
  "NH 211  TOKYO HND         LONDON LHR        13:40   G03   FINAL   ",
  "UA 001  SAN FRANCISCO     SINGAPORE         14:20   H05   ON TIME ",
  "AA 007  DALLAS FT WORTH   BRISBANE          15:00   J16   GATE OPEN",
  "TK 079  ISTANBUL          SAN FRANCISCO     15:45   K08   ON TIME ",
  "QF 001  SYDNEY            SINGAPORE         16:20   L14   BOARDING",
];

const cabinAccent: Record<CabinType, string> = {
  Business: "bg-sky-400/10 text-sky-200 ring-1 ring-inset ring-sky-400/20",
  First: "bg-amber-400/10 text-amber-200 ring-1 ring-inset ring-amber-400/20",
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [cabin, setCabin] = useState("");
  const [route, setRoute] = useState("");
  const [tag, setTag] = useState("");

  const airlineOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.airline))).sort(),
    []
  );

  const aircraftOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.aircraft))).sort(),
    []
  );

  const routeOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.route))).sort(),
    []
  );

  const tagOptions = useMemo(
    () => Array.from(new Set(premiumProducts.flatMap((item) => item.bestFor))).sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    return premiumProducts.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.productName.toLowerCase().includes(query) ||
        item.airline.toLowerCase().includes(query) ||
        item.aircraft.toLowerCase().includes(query) ||
        item.route.toLowerCase().includes(query) ||
        item.bestFor.some((value) => value.toLowerCase().includes(query));

      const matchesAirline = airline === "" || item.airline === airline;
      const matchesAircraft = aircraft === "" || item.aircraft === aircraft;
      const matchesCabin = cabin === "" || item.cabinType === cabin;
      const matchesRoute = route === "" || item.route === route;
      const matchesTag = tag === "" || item.bestFor.includes(tag);

      return matchesSearch && matchesAirline && matchesAircraft && matchesCabin && matchesRoute && matchesTag;
    });
  }, [search, airline, aircraft, cabin, route, tag]);

  const topThree = filteredProducts.slice(0, 3);

  function resetFilters() {
    setSearch("");
    setAirline("");
    setAircraft("");
    setCabin("");
    setRoute("");
    setTag("");
  }

  return (
    <main className="app-shell text-white">
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

      <div className="content-layer">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="top-brand">
            <Image
              src="/images/ascend-logo.png"
              alt="Ascend Logo"
              width={90}
              height={90}
              className="brand-logo"
            />
            <h1 className="brand-title">Ascend Cabin Matrix</h1>
          </div>

          <section className="overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/80">
                  <SparklesIcon />
                  Premium cabin intelligence
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Find the right premium cabin in seconds.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  Ascend Cabin Matrix helps advisors compare premium Business and First Class products by airline,
                  aircraft, privacy profile, route, and use case — with direct links to AeroLOPA and SeatMaps for quick seat validation.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{premiumProducts.length}</p>
                    <p className="mt-1 text-sm text-white/60">curated cabin products</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/10 bg-black/35 p-4">
                    <p className="text-2xl font-semibold">{airlineOptions.length}</p>
                    <p className="mt-1 text-sm text-white/60">airlines covered</p>
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
                  How to use this
                </p>

                <div className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                  <p>Search by product, airline, aircraft, or route when you already know the trip pattern.</p>
                  <p>Use route plus cabin filters to narrow down the best long-haul product for a client.</p>
                  <p>Open AeroLOPA for layout accuracy, then SeatMaps for a second public reference.</p>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
                  Best workflow: shortlist by route first, then compare privacy, cabin type, and aircraft before recommending.
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

            <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_1fr_auto]">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <RouteIcon />
                  Route
                </label>
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full rounded-2xl border border-cyan-400/10 bg-black/75 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="">All routes</option>
                  {routeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/60">
                  <StarIcon />
                  Best for
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTag("")}
                    className={`rounded-full px-3 py-2 text-sm transition ${
                      tag === ""
                        ? "bg-cyan-300 text-slate-950"
                        : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    All
                  </button>
                  {tagOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setTag(option)}
                      className={`rounded-full px-3 py-2 text-sm transition ${
                        tag === option
                          ? "bg-cyan-400 text-slate-950"
                          : "border border-cyan-400/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
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
                    <div className="relative h-56">
                      <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
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
                      <p className="mt-2 text-sm text-cyan-200/80">{item.route}</p>
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
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
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
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                          Current route serviced
                        </p>
                        <p className="mt-2 text-sm leading-6 text-cyan-100/85">{item.route}</p>
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
            ))}
          </section>

          {filteredProducts.length === 0 && (
            <section className="mt-8 rounded-[28px] border border-dashed border-cyan-400/10 bg-white/5 px-6 py-14 text-center">
              <h2 className="text-2xl font-semibold">No cabins matched those filters</h2>
              <p className="mt-3 text-sm text-white/60">Try clearing one or two filters, or use a broader search term.</p>
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