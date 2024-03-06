import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT : "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT : "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        success: {
          DEFAULT : "var(--success)",
          foreground: "var(--success-foreground)",
        },
        danger: {
          DEFAULT : "var(--danger)",
          foreground: "var(--danger-foreground)",
        },
        warning: {
          DEFAULT : "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        focus: "var(--focus)",
      }
    }
  },
  plugins: [],
} satisfies Config;

export default config;