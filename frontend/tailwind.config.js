/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0f172a",
          950: "#020617",
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
        }
      },
      borderRadius: {
        'sm': '0.375rem',   // 6px (was 2px)
        DEFAULT: '0.5rem',  // 8px (was 4px)
        'md': '0.75rem',    // 12px (was 6px)
        'lg': '1rem',       // 16px (was 8px)
        'xl': '1.25rem',    // 20px (was 12px)
        '2xl': '1.5rem',    // 24px (was 16px)
        '3xl': '2rem',      // 32px (was 24px)
      },
      fontFamily: {
        sans: ["\"Plus Jakarta Sans\"", "Inter", "system-ui", "sans-serif"],
        devanagari: ["\"Noto Sans Devanagari\"", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
}
