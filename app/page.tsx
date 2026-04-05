"use client";

import { useMemo, useState } from "react";

/* ================= TYPES ================= */

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
  description: string;
};

/* ================= DATA ================= */

const rawProducts = [
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
      "Munich → Shanghai",
      "Munich → Tokyo Haneda",
    ],
    bestFor: ["Luxury", "Privacy"],
    description: "Lufthansa’s newest flagship First Class suite under Allegris.",
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
      "Frankfurt → Los Angeles",
      "Frankfurt → Kuala Lumpur",
      "Frankfurt → Shanghai",
    ],
    bestFor: ["Privacy", "Choice"],
    description: "Lufthansa’s new Allegris Business Class.",
  },
  {
    id: "3",
    rank: 3,
    productName: "Qsuite",
    airline: "Qatar Airways",
    airlineCode: "QR",
    aircraft: "A350 / 777",
    cabinType: "Business",
    routes: [
      "Doha → New York JFK",
      "Doha → London Heathrow",
      "Doha → Sydney",
    ],
    bestFor: ["Couples", "Privacy"],
    description: "Qatar Airways’ flagship business class suite.",
  },
];

/* ================= HELPERS ================= */

function splitRoute(route: string): RoutePair {
  const [from, to] = route.split("→").map((s) => s.trim());
  return { from, to };
}

function toPairs(routes: string[]): RoutePair[] {
  const pairs: RoutePair[] = [];
  routes.forEach((r) => {
    const p = splitRoute(r);
    pairs.push(p);
    pairs.push({ from: p.to, to: p.from });
  });
  return pairs;
}

const products: Product[] = rawProducts.map((p) => ({
  ...p,
  routePairs: toPairs(p.routes),
}));

/* ================= PAGE ================= */

export default function Page() {
  const [outbound, setOutbound] = useState("");
  const [returnCity, setReturnCity] = useState("");

  const allCities = useMemo(() => {
    return Array.from(
      new Set(products.flatMap((p) => p.routePairs.flatMap((r) => [r.from, r.to])))
    );
  }, []);

  const outboundOptions = allCities.filter((c) =>
    c.toLowerCase().includes(outbound.toLowerCase())
  );

  const returnOptions = allCities.filter((c) =>
    c.toLowerCase().includes(returnCity.toLowerCase())
  );

  const filtered = products.filter((p) => {
    if (!outbound && !returnCity) return true;

    return p.routePairs.some(
      (r) =>
        (!outbound || r.from.toLowerCase().includes(outbound.toLowerCase())) &&
        (!returnCity || r.to.toLowerCase().includes(returnCity.toLowerCase()))
    );
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-6xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Ascend Cabin Optimizer</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Compare Business and First class product across premium aircraft and layouts-with aerolopa+seatmaps all in one place
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <input
            value={outbound}
            onChange={(e) => setOutbound(e.target.value)}
            placeholder="Outbound city"
            className="w-full p-3 rounded bg-white/10"
          />
          <div className="mt-2 space-y-1">
            {outboundOptions.slice(0, 5).map((c) => (
              <div
                key={c}
                onClick={() => setOutbound(c)}
                className="cursor-pointer text-sm text-white/70 hover:text-white"
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div>
          <input
            value={returnCity}
            onChange={(e) => setReturnCity(e.target.value)}
            placeholder="Return city"
            className="w-full p-3 rounded bg-white/10"
          />
          <div className="mt-2 space-y-1">
            {returnOptions.slice(0, 5).map((c) => (
              <div
                key={c}
                onClick={() => setReturnCity(c)}
                className="cursor-pointer text-sm text-white/70 hover:text-white"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RESULTS ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="border border-white/10 p-5 rounded-lg">
            <h2 className="text-xl font-semibold">{p.productName}</h2>
            <p className="text-sm text-white/60 mt-1">
              {p.airline} · {p.aircraft}
            </p>

            <div className="mt-3 text-sm text-white/70">
              Routes:
              <div className="mt-2 flex flex-wrap gap-2">
                {p.routePairs.slice(0, 4).map((r, i) => (
                  <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                    {r.from} → {r.to}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-3 text-sm text-white/70">{p.description}</p>
          </div>
        ))}
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-16 border border-white/10 rounded-2xl p-8 text-center bg-white/5">
        <h2 className="text-2xl font-semibold mb-3">
          Ready to book?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto">
          Experience 24/7 access to a dedicated travel concierge and save an average of 35% on Business and First Class flights.
        </p>
        <a
          href="https://joinascend.com"
          target="_blank"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold"
        >
          Apply for Membership
        </a>
      </div>

    </main>
  );
}