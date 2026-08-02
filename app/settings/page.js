"use client";

import { useEffect, useState } from "react";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
        checked ? "bg-accent" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("taskflow.darkMode");
    if (stored) setDarkMode(stored === "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("taskflow.darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <section className="flex flex-col gap-6 max-w-lg mx-auto">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Settings</h1>
        <p className="text-inkSoft text-sm mt-1">Adjust how TaskFlow looks and behaves.</p>
      </div>

      <div className="bg-white rounded-card shadow-card border border-line divide-y divide-line">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-medium text-ink">Dark Mode</p>
            <p className="text-xs text-inkSoft mt-0.5">Switch to a darker color scheme.</p>
          </div>
          <Toggle checked={darkMode} onChange={setDarkMode} label="Toggle dark mode" />
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-medium text-ink">Notifications</p>
            <p className="text-xs text-inkSoft mt-0.5">Get reminded about upcoming deadlines.</p>
          </div>
          <Toggle checked={notifications} onChange={setNotifications} label="Toggle notifications" />
        </div>
      </div>
    </section>
  );
}
