"use client";

import { useEffect, useState } from "react";

export default function HealthPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Could not reach the server.");
      }
    }
    checkHealth();

    const tick = () => setNow(new Date().toLocaleTimeString());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-6 max-w-lg mx-auto">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Health Check</h1>
        <p className="text-inkSoft text-sm mt-1">Live status of the app and its API.</p>
      </div>

      <div className="bg-white rounded-card shadow-card border border-line divide-y divide-line">
        <Row label="Server Status" value={error ? "Down" : "Running"} tone={error ? "coral" : "mint"} />
        <Row
          label="API Working"
          value={error ? "No" : data ? "Yes" : "Checking…"}
          tone={error ? "coral" : data ? "mint" : "inkSoft"}
        />
        <Row label="Current Time" value={now || "—"} tone="ink" mono />
      </div>

      {data?.serverTime && (
        <p className="text-xs text-inkSoft font-mono">
          Server responded at {new Date(data.serverTime).toLocaleTimeString()}
        </p>
      )}
    </section>
  );
}

function Row({ label, value, tone, mono }) {
  const toneClasses = {
    mint: "text-mint",
    coral: "text-coral",
    ink: "text-ink",
    inkSoft: "text-inkSoft",
  };

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono" : ""} ${toneClasses[tone]}`}>
        {value}
      </span>
    </div>
  );
}
