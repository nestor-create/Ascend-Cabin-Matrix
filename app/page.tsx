"use client";

import { useMemo, useState } from "react";

/* ================= TYPES ================= */

type RoutePair = {
  from: string;
  to: string;
};

type Product = {
  id: string;
  productName: string;
  airline: string;
  aircraft: string;
  routePairs: RoutePair[];
};

/* ================= DATA ================= */

const rawProducts = [
  {
    id: "1",
    productName: "Allegris First",
    airline: "Lufthansa",
    aircraft: "A350-900",
    routes: [
      "Munich → New York JFK",
      "Munich → Shanghai",
      "Munich → Tokyo Haneda",
      "Munich → Bengaluru",
    ],
  },
  {
    id: "2",
    productName: "Allegris Business",
    airline: "Lufthansa",
    aircraft: "A350-900 / 787-9",
    routes: [
      "Munich → New York JFK",
      "Frankfurt → Los Angeles",
      "Frankfurt → Kuala Lumpur",
      "Frankfurt → Shanghai",
      "Frankfurt → New York JFK",
    ],
  },
  {
    id: "3",
    productName: "Qsuite",
    airline: "Qatar Airways",
    aircraft: "A350 / 777",
    routes: [
      "Doha → New York JFK",
      "Doha → London Heathrow",
      "Doha → Sydney",
      "Doha → Paris",
    ],
  },
  {
    id: "4",
    productName: "La Première",
    airline: "Air France",
    aircraft: "777-300ER",
    routes: [
      "Paris CDG → New York JFK",
      "Paris CDG → Los Angeles",
      "Paris CDG → Tokyo Haneda",
      "Paris CDG → Singapore",
    ],
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

const products = rawProducts.map((p) => ({
  ...p,
  routePairs: toPairs(p.routes),
}));

/* ================= PAGE ================= */

export default function Page() {
  const [outbound, setOutbound] = useState("");
  const [returnRoute, setReturnRoute] = useState("");

  /* ALL ROUTES FOR DROPDOWN */
  const allRoutes = useMemo(() => {
    return Array.from(
      new Set(
        products.flatMap((p) =>
          p.routePairs.map((r) => `${r.from} → ${r.to}`)
        )
      )
    );
  }, []);

  const outboundOptions = allRoutes.filter((r) =>
    r.toLowerCase().includes(outbound.toLowerCase())
  );

  const returnOptions = allRoutes.filter((r) =>
    r.toLowerCase().includes(returnRoute.toLowerCase())
  );

  /* FILTER PRODUCTS */
  const filtered = products.filter((p) => {
    if (!outbound && !returnRoute) return true;

    return p.routePairs.some(
      (r) =>
        (!outbound ||
          `${r.from} → ${r.to}`.toLowerCase().includes(outbound.toLowerCase())) &&
        (!returnRoute ||
          `${r.from} → ${r.to}`.toLowerCase().includes(returnRoute.toLowerCase()))
    );
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Ascend Cabin Optimizer</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Compare Business and First class product across premium aircraft and layouts-with aerolopa+seatmaps all in one place
        </p>
      </div>

      {/* SEARCH */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        {/* OUTBOUND */}
        <div>
          <input
            value={outbound}
            onChange={(e) => setOutbound(e.target.value)}
            placeholder="Outbound route (e.g. Munich → Shanghai)"
            className="w-full p-3 rounded bg-white/10"
          />
          <div className="mt-2 space-y-1 max-h-40 overflow-auto">
            {outboundOptions.slice(0, 8).map((r) => (
              <div
                key={r}
                onClick={() => setOutbound(r)}
                className="cursor-pointer text-sm text-white/70 hover:text-white"
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* RETURN */}
        <div>
          <input
            value={returnRoute}
            onChange={(e) => setReturnRoute(e.target.value)}
            placeholder="Return route (e.g. Shanghai → Munich)"
            className="w-full p-3 rounded bg-white/10"
          />
          <div className="mt-2 space-y-1 max-h-40 overflow-auto">
            {returnOptions.slice(0, 8).map((r) => (
              <div
                key={r}
                onClick={() => setReturnRoute(r)}
                className="cursor-pointer text-sm text-white/70 hover:text-white"
              >
                {r}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="border border-white/10 p-5 rounded-lg">
            <h2 className="text-xl font-semibold">{p.productName}</h2>
            <p className="text-sm text-white/60 mt-1">
              {p.airline} · {p.aircraft}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.routePairs.slice(0, 6).map((r, i) => (
                <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                  {r.from} → {r.to}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 border border-white/10 rounded-2xl p-8 text-center bg-white/5">
        <h2 className="text-2xl font-semibold mb-3">
          Ready to book?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto">
          Experience 24/7 access to travel concierge and save an average of 35% on Business and First Class.
        </p>
        <a
          href="https://joinascend.com"
          target="_blank"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold"
        >
          Apply for membership at joinascend.com
        </a>
      </div>

    </main>
  );
}