import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [heroui()],
} satisfies Config;
