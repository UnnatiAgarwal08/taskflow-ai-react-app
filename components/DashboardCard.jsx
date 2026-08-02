export default function DashboardCard({ label, value, tone = "ink" }) {
  const toneClasses = {
    ink: "text-ink",
    accent: "text-accent",
    mint: "text-mint",
    coral: "text-coral",
  };

  return (
    <div className="bg-white rounded-card shadow-card border border-line px-5 py-4 flex-1 min-w-[140px]">
      <p className="text-xs uppercase tracking-wide text-inkSoft font-medium">
        {label}
      </p>
      <p className={`font-display text-3xl font-bold mt-1 ${toneClasses[tone]}`}>
        {value}
      </p>
    </div>
  );
}
