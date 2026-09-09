import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mota: {
          darkest: "#020914",
          dark: "#041326",
          navy: "#082142",
          card: "rgba(8, 33, 66, 0.65)",
          border: "rgba(56, 189, 248, 0.18)",
          borderHover: "rgba(56, 189, 248, 0.45)",
          cyan: "#38bdf8",
          sky: "#0ea5e9",
          ice: "#bae6fd",
          frost: "#f0f9ff",
          accent: "#00b4d8",
          whatsapp: "#25D366"
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.3)',
        'glow-sm': '0 0 15px 0px rgba(56, 189, 248, 0.25)',
        'frost-card': '0 8px 32px 0 rgba(0, 10, 30, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
