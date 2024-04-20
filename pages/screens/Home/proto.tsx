import React from "react"
import Header from "../Components/Header"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useRouter } from "next/router"
import Image from "next/image"
import CurrentDateCalendar from "../Components/Calendar"
import HomeMoodLogChecker from "../Components/HomeMoodLogChecker"
import NavigationBar from "../Components/NavigationBar"

function Home() {
  const {
    navigateToActivityLog,
    navigateToChat,
    navigateToMoodLog,
    navigateToStats,
  } = useNavigation()

  const router = useRouter()

  function auth0Logout() {
    router.push("/api/auth/logout")
  }

  return (
    <div className="bg-senthrap-new-yellow-light">
      <div className=" justify-center items-center flex flex-col mb-8">
        <p className="font-bold text-senthrap-new-blue-dark text-xl pt-4">
          LOGO
        </p>
        <CurrentDateCalendar />
        <HomeMoodLogChecker />
        <NavigationBar />
      </div>
    </div>
  )
}

export default Home
