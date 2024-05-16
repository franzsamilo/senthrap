import React from "react"
import Header from "../Components/Header"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useRouter } from "next/router"
import Image from "next/image"

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
    <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100">
      <div className="font-bold items-center">
        <Header />
        <div className="border-t-4 border-senthrap-blue-50 drop-shadow-lg flex flex-col">
          <div className="items-center flex flex-col">
            <Image
              src="/assets/senthrap-logo-no-bg.png"
              alt="Heart Senthrap"
              width={200}
              height={100}
            />
          </div>
          <div className="border-t-4 border-senthrap-blue-50 drop-shadow-lg mb-24" />
          <button
            onClick={navigateToChat}
            className="mt-4 py-2 px-auto mx-12 bg-white rounded-2xl text-2xl text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white "
          >
            Go to Chat
          </button>
          <button
            onClick={navigateToMoodLog}
            className="mt-4 py-2 px-auto mx-12 bg-white rounded-2xl text-2xl text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white"
          >
            Go to Mood Log
          </button>
          <button
            onClick={navigateToActivityLog}
            className="mt-4 py-2 px-auto mx-12 bg-white rounded-2xl text-2xl text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white"
          >
            Go to Activity Log
          </button>
          <button
            onClick={navigateToStats}
            className="mt-4 py-2 px-auto mx-12 bg-white rounded-2xl text-2xl text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white"
          >
            Go to Stats
          </button>
          <button
            className="mt-4 py-2 px-auto mx-12 bg-red-500 rounded-2xl text-2xl text-white hover:bg-red-800"
            onClick={auth0Logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
