// src/app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [ticker, setTicker] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      router.push(`/stock/${ticker.trim().toUpperCase()}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <h1 className="text-4xl font-bold mb-2">
        <span className="text-blue-600">S</span>
        <span className="text-red-500">t</span>
        <span className="text-yellow-500">o</span>
        <span className="text-blue-600">c</span>
        <span className="text-green-600">k</span>
        <span className="text-red-500">A</span>
        <span className="text-yellow-500">f</span>
        <span className="text-blue-600">f</span>
        <span className="text-green-600">i</span>
        <span className="text-red-500">r</span>
        <span className="text-yellow-500">m</span>
      </h1>
      <p className="mb-8 text-gray-600 italic">Long on a Stock? Affirm it!!!</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for a ticker (e.g. AMD)"
          className="rounded-full px-4 py-2 shadow border border-gray-300 focus:outline-none"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </main>
  );
}
