import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </main>
  )
}
