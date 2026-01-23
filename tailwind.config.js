/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Landing page colors
        "obsidian": "#05070a",
        "midnight": "#0a1118",
        "neon-mint": "#00ffcc",
        "deep-slate": "#1a242f",
        // Auth pages colors
        "primary": "#42f5b3",
        "background-light": "#f5f8f7",
        "background-dark": "#0A0A0A",
        "obsidian-dark": "#111111",
        "border-obsidian": "#222222",
        // Dashboard colors (consolidated)
        "obsidian-black": "#050505",
        "obsidian-grey": "#121815",
        "obsidian-green": "#162a24",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "neon-mint-dark": "#18a574",
      },
      fontFamily: {
        "sans": ["Plus Jakarta Sans", "sans-serif"],
        "display": ["Space Grotesk", "Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
