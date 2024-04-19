import {type Config} from "tailwindcss";
import { presetTheme } from "@repo/tailwind-config/tw-config";

const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  presets: [presetTheme],
} satisfies Config

export default config
