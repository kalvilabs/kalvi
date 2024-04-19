import type { Config } from "tailwindcss";

export const presetTheme = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgba(var(--primary), <alpha-value>)",
          dark: "rgba(var(--primary-dark), <alpha-value>)",
          foreground: "rgba(var(--primary-foreground), <alpha-value>)",
          "foreground-dark":
            "rgba(var(--primary-foreground-dark), <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary), <alpha-value>)",
          dark: "rgba(var(--secondary-dark), <alpha-value>)",
          foreground: "rgba(var(--secondary-foreground-dark), <alpha-value>)",
          "foreground-dark": "rgba(var(--secondary-foreground), <alpha-value>)",
        },
        success: {
          DEFAULT: "rgba(var(--success), <alpha-value>)",
          dark: "rgba(var(--success-dark), <alpha-value>)",
          foreground: "rgba(var(--success-foreground), <alpha-value>)",
          "foreground-dark":
            "rgba(var(--success-foreground-dark), <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgba(var(--warning), <alpha-value>)",
          dark: "rgba(var(--warning-dark), <alpha-value>)",
          foreground: "rgba(var(--warning-foreground), <alpha-value>)",
          "foreground-dark":
            "rgba(var(--warning-foreground-dark), <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgba(var(--danger), <alpha-value>)",
          dark: "rgba(var(--danger-dark), <alpha-value>)",
          foreground: "rgba(var(--danger-foreground), <alpha-value>)",
          "foreground-dark":
            "rgba(var(--danger-foreground-dark), <alpha-value>)",
        },
        focus: "var(--primary)",
        background: {
          DEFAULT: "rgba(var(--background), <alpha-value>)",
          dark: "rgba(var(--background-dark), <alpha-value>)",
        },
        foreground : {
          DEFAULT: "rgba(var(--foreground), <alpha-value>)",
          dark: "rgba(var(--foreground-dark), <alpha-value>)",
        },
        border : {
          DEFAULT: "rgba(var(--border), <alpha-value>)",
          dark: "rgba(var(--border-dark), <alpha-value>)",
        },
        "input-border" : {
          DEFAULT: "rgba(var(--input-border), <alpha-value>)",
          dark: "rgba(var(--input-border-dark), <alpha-value>)",
        },
        content : {
          DEFAULT: "rgba(var(--content), <alpha-value>)",
          dark: "rgba(var(--content-dark), <alpha-value>)",
        },
        divider : {
          DEFAULT: "rgba(var(--divider), <alpha-value>)",
          dark: "rgba(var(--divider-dark), <alpha-value>)",
        }
      },
      spacing: {
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "48px",
        xxl: "80px"
      },
      borderRadius: {
        small: "6px",
        medium: "8px",
        large: "32px"
      }
    },
  },
  plugins: [ require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),],
} satisfies Config;
