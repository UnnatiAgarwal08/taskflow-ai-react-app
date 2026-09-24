"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-400">
      Loading 3D experience...
    </div>
  ),
});

export default function FeAA2Page() {
  const [status, setStatus] = useState("pending");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          TaskFlow 3D Experience
        </h1>

        <p className="mt-2 text-slate-400">
          Interactive 3D task visualization.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setStatus("pending")}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
          >
            Pending
          </button>

          <button
            onClick={() => setStatus("completed")}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium hover:bg-green-500"
          >
            Completed
          </button>

          <button
            onClick={() => setStatus("overdue")}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-500"
          >
            Overdue
          </button>
        </div>

        <div className="mt-8 h-[500px] overflow-hidden rounded-2xl border border-slate-800">
          <ThreeScene status={status} />
        </div>
      </div>
    </main>
  );
}