import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";

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
  extend: {
      colors: {
        "primary": 'rgba(var(--primary), <alpha-value>)',
        "primary-foreground": 'rgba(var(--primary-foreground), <alpha-value>)',
        "secondary": 'rgba(var(--secondary), <alpha-value>)',
        "secondary-foreground": 'rgba(var(--secondary-foreground), <alpha-value>)',
        "success": 'rgba(var(--success), <alpha-value>)',
        "success-foreground": 'rgba(var(--success-foreground), <alpha-value>)',
        "warning": 'rgba(var(--warning), <alpha-value>)',
        "warning-foreground": 'rgba(var(--warning-foreground), <alpha-value>)',
        "danger": 'rgba(var(--danger), <alpha-value>)',
        "danger-foreground": 'rgba(var(--danger-foreground), <alpha-value>)',

        "focus": 'rgba(var(--focus), <alpha-value>)',

        "background": 'rgba(var(--background), <alpha-value>)',
        "foreground": 'rgba(var(--foreground), <alpha-value>)',
        "border-color": 'rgba(var(--border-color), <alpha-value>)',
        "content-background": 'rgba(var(--content-background), <alpha-value>)',
        "input-border-color": 'rgba(var(--input-border-color), <alpha-value>)',
        "divider-color": 'rgba(var(--divider-color), <alpha-value>)',
        'admin-bg-color': 'rgba(var(--admin-bg-color), <alpha-value>)',
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
  plugins: [tailwindForms({strategy: "class"})],
} satisfies Config;

export default config;