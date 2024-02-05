import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Image from "next/image"
import useNavigation from "../../api/src/Hooks/Navigation"

function Home() {
  const { user } = useUser()
  const router = useRouter()
  const { navigateToChat, navigateToMoodLog, navigateToActivityLog } =
    useNavigation()

  function auth0Logout() {
    router.push("/api/auth/logout")
  }

  function goToHomeChat() {
    router.push("/screens/AIChat/HomeChat")
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100">
      <div className="flex flex-row mt-4">
        <Image
          src={user?.picture || ""}
          alt={user?.name || ""}
          width={64}
          height={64}
          className="rounded-full"
        />
        <h1 className="text-xl ml-4 mt-4">{user?.name}</h1>
      </div>
      <p className="m-4">{user?.email}</p>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-black"
        onClick={goToHomeChat}
      >
        Go to Chat
      </button>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-senthrap-blue-200 mt-4 mx-12"
        onClick={navigateToMoodLog}
      >
        Go to Mood Log
      </button>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-senthrap-blue-200 mt-4 mx-12"
        onClick={navigateToActivityLog}
      >
        Go to Activity Log
      </button>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-black mt-4 mx-12"
        onClick={auth0Logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Home
