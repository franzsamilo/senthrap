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
        "senthrap-gradient": "linear-gradient(90deg, #5CABDD 0%, #60B0E1 100%)",
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
          // new colors
          "new-blue": {
            "light": "#E1F1FF",
            "stroke": "#BEBED9",
            "dark": "#2E2E7D"
          },
          "new-yellow": {
            "light": "#FDFFE1",
            "stroke": "#D5D9BE",
            "heavy": "#FFFAD6"
          },
          "new-white": {
            "bg": "#FEFFE7",
            "stroke": "E8E9D2"
          }
        },
      },
    },
  },
  plugins: [],
}
export default config
