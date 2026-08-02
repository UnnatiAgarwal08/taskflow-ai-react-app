"use client";

import { useTasks } from "@/context/TaskContext";
import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Dashboard</h1>
        <p className="text-inkSoft text-sm mt-1">A quick look at where things stand.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8 bg-white rounded-card shadow-card border border-line p-6">
        {/* Signature: conic-gradient progress ring */}
        <div
          className="relative h-36 w-36 rounded-full shrink-0"
          style={{
            background: `conic-gradient(#1FAE7A ${pct}%, #E1E5EC 0)`,
          }}
        >
          <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="font-display font-bold text-2xl text-ink">{pct}%</span>
            <span className="text-xs text-inkSoft">complete</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 w-full">
          <DashboardCard label="Total Tasks" value={total} tone="ink" />
          <DashboardCard label="Completed" value={completed} tone="mint" />
          <DashboardCard label="Pending" value={pending} tone="accent" />
        </div>
      </div>
    </section>
  );
}
