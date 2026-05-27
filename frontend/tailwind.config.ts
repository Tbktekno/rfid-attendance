import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a", // slate-900
        mist: "#f8fafc", // slate-50
        pine: "#2563eb", // Primary blue to replace green
        ember: "#d97706",
        blush: "#ef4444", // red-500
        cloud: "#e2e8f0" // slate-200
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(10, 13, 16, 0.08)"
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        pulseLine: "pulseLine 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
