"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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

type Product = {
  id: string;
  rank: number;
  productName: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  cabinType: "Business" | "First";
  bestFor: string[];
  seatInsight: string;
  description: string;
  image: string;
  seatmapsUrl: string;
  aerolopaUrl: string;
};

const premiumProducts: Product[] = [
  {
    id: "1",
    rank: 1,
    productName: "Allegris First",
    airline: "Lufthansa",
    airlineCode: "LH",
    aircraft: "A350-900 / 787-9",
    cabinType: "First",
    bestFor: ["Privacy", "Solo"],
    seatInsight:
      "Private suite with doors and a fully lie-flat bed, designed for maximum privacy.",
    description:
      "Lufthansa’s newest flagship first class suite under Allegris.",
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
    bestFor: ["Privacy", "Choice"],
    seatInsight:
      "1-2-1 layout with multiple seat types including suites, extra privacy seats, and extra-long bed options.",
    description:
      "Lufthansa’s new Allegris business class with a more flexible premium seat concept.",
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
    bestFor: ["Space", "Solo"],
    seatInsight:
      "Extra-wide 1-2-1 business class seat with direct aisle access and exceptional personal space.",
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
    bestFor: ["Couples", "Privacy"],
    seatInsight:
      "Enclosed suite with doors and flexible seating for couples or groups.",
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
    bestFor: ["Space", "Luxury"],
    seatInsight:
      "A380 first class with a separate seat and bed concept, offering exceptional personal space.",
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
    bestFor: ["Privacy", "Luxury"],
    seatInsight:
      "Wide enclosed suite with strong privacy and a modern residential-style design.",
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
    bestFor: ["Privacy", "Solo"],
    seatInsight:
      "Fully enclosed suite with very high privacy and a more futuristic first class feel.",
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
    bestFor: ["Luxury", "Exclusivity"],
    seatInsight:
      "Highly exclusive first class experience with a spacious personal area and refined soft product.",
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
    bestFor: ["Privacy", "Network"],
    seatInsight:
      "1-2-1 layout with doors and direct aisle access across the cabin.",
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
    bestFor: ["Privacy", "Consistency"],
    seatInsight:
      "Suite-style seat with door and direct aisle access on key long-haul aircraft.",
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
    bestFor: ["Privacy", "Storage"],
    seatInsight:
      "Next-generation suite with door, improved storage, and a refined Cathay design.",
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
    bestFor: ["Comfort", "Solo"],
    seatInsight:
      "Direct aisle access layout with a strong balance of privacy and comfort.",
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
    bestFor: ["Comfort", "Sleep"],
    seatInsight:
      "Reverse herringbone seat with direct aisle access and a strong comfort reputation.",
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
    bestFor: ["Privacy", "Solo"],
    seatInsight:
      "Suite-style premium seat with direct aisle access on long-haul aircraft.",
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
    bestFor: ["Couples", "Social"],
    seatInsight:
      "1-2-1 seat configuration with direct aisle access. Features The Loft lounge at the back of the aircraft.",
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
    bestFor: ["Space", "Solo"],
    seatInsight:
      "Front-row Mint Studio offers more space and a larger suite-style experience than standard Mint seats.",
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
    bestFor: ["Comfort", "Practicality"],
    seatInsight:
      "Direct aisle access layout with a practical and comfortable long-haul design.",
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
    bestFor: ["Network", "Value"],
    seatInsight:
      "Modern long-haul seat with direct aisle access and improved privacy over older fleet types.",
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
    bestFor: ["Privacy", "New Product"],
    seatInsight:
      "New suite-style business class with doors on American’s latest premium configuration.",
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
    bestFor: ["Consistency", "Network"],
    seatInsight:
      "United’s flagship long-haul seat with direct aisle access and a consistent premium layout.",
    description: "United’s Polaris long-haul business class product.",
    image: "/images/united-polaris.jpg",
    seatmapsUrl: "https://seatmaps.com/airlines/ua-united/",
    aerolopaUrl: "https://www.aerolopa.com/ua",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [cabin, setCabin] = useState("");

  const airlineOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.airline))).sort(),
    []
  );

  const aircraftOptions = useMemo(
    () => Array.from(new Set(premiumProducts.map((item) => item.aircraft))).sort(),
    []
  );

  const filteredProducts = premiumProducts.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.airline.toLowerCase().includes(search.toLowerCase()) ||
      item.aircraft.toLowerCase().includes(search.toLowerCase());

    const matchesAirline = airline === "" || item.airline === airline;
    const matchesAircraft = aircraft === "" || item.aircraft === aircraft;
    const matchesCabin = cabin === "" || item.cabinType === cabin;

    return matchesSearch && matchesAirline && matchesAircraft && matchesCabin;
  });

  function resetFilters() {
    setSearch("");
    setAirline("");
    setAircraft("");
    setCabin("");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ascend Matrix Cabin
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400 sm:text-base">
            Explore premium Business and First Class cabins with quick access to
            AeroLOPA and SeatMaps.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                <SearchIcon />
                Search
              </label>
              <input
                type="text"
                placeholder="Product, airline, aircraft"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                <PlaneIcon />
                Airline
              </label>
              <select
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-500"
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
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                <PlaneIcon />
                Aircraft
              </label>
              <select
                value={aircraft}
                onChange={(e) => setAircraft(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-500"
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
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                <SeatIcon />
                Cabin
              </label>
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-500"
              >
                <option value="">All cabins</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>

            <button
              onClick={resetFilters}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-600"
            >
              <Image
                src={item.image}
                alt={item.productName}
                width={800}
                height={520}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                    #{item.rank}
                  </span>
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300">
                    {item.cabinType}
                  </span>
                </div>

                <h2 className="text-2xl font-semibold">{item.productName}</h2>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-zinc-200">
                    {item.airlineCode}
                  </span>
                  <span className="text-zinc-300">{item.airline}</span>
                </div>

                <p className="mt-1 text-sm text-zinc-500">{item.aircraft}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                    >
                      Best for {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-start gap-3">
                    <SeatIcon />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        Seat Insight
                      </p>
                      <p className="mt-1 text-sm text-zinc-300">
                        {item.seatInsight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-start gap-3">
                    <NoteIcon />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        Description
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <a
                    href={item.aerolopaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    <MapIcon />
                    AeroLOPA
                  </a>

                  <a
                    href={item.seatmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-white transition hover:border-zinc-500"
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
    </main>
  );
}