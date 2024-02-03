import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "senthrap-splash": "url('/assets/senthrap-splash-1.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        senthrap: {
          neutral: {
            "100": "#FFFDE3",
          },
          blue: {
            "10": "#D0E4EC",
            "50": "#60B0E1",
            "100": "#6DC1F5",
            "200": "#5CABDD",
          },
          yellow: {
            "100": "#FFFABE",
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
