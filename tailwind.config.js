/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "#F2F4F8",      // cool paper background
        paperDark: "#0F1220",  // dark mode background
        ink: "#101828",        // primary text
        inkSoft: "#4B5468",    // secondary text
        line: "#E1E5EC",       // hairline borders
        accent: "#5B5FEF",     // electric indigo - primary actions
        accentSoft: "#EEF0FF", // accent tint
        mint: "#1FAE7A",       // completed / success
        mintSoft: "#E4F7EF",
        coral: "#FF6B6B",      // high priority
        amber: "#F5A524",      // medium priority
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 12px rgba(16, 24, 40, 0.06)",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
