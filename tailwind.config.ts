import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          2: "var(--accent-2)",
          soft: "var(--accent-soft)",
        },
        heritage: "var(--heritage)",
        sage: "var(--sage)",
        amber: "var(--amber)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(11,12,14,0.02), 0 8px 24px -12px rgba(11,12,14,0.10)",
        card: "0 1px 0 rgba(11,12,14,0.02), 0 24px 48px -24px rgba(11,12,14,0.12), 0 2px 6px -2px rgba(11,12,14,0.06)",
        lifted:
          "0 1px 0 rgba(11,12,14,0.02), 0 32px 64px -28px rgba(11,12,14,0.20), 0 6px 16px -6px rgba(11,12,14,0.10)",
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0.16, 1, 0.3, 1)",
        morph: "cubic-bezier(0.65, 0, 0.35, 1)",
        nudge: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        decompress: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        drift1: {
          "0%, 100%": { transform: "translate3d(-15%, -10%, 0) scale(1)" },
          "50%": { transform: "translate3d(5%, 5%, 0) scale(1.1)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate3d(20%, 30%, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-10%, 10%, 0) scale(0.95)" },
        },
        drift3: {
          "0%, 100%": { transform: "translate3d(30%, -20%, 0) scale(0.9)" },
          "50%": { transform: "translate3d(10%, 0, 0) scale(1.05)" },
        },
      },
      animation: {
        drift1: "drift1 28s ease-in-out infinite",
        drift2: "drift2 34s ease-in-out infinite",
        drift3: "drift3 24s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
