import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Image from "next/image"

function Home() {
  const { user } = useUser()
  const router = useRouter()

  function auth0Logout() {
    router.push("/api/auth/logout")
  }

  function goToChat() {
    router.push("/screens/AIChat/Chat")
  }

  function goToMoodLog() {
    router.push("/screens/MoodLog/MoodLog")
  }

  function goToActivityLog() {
    router.push("/screens/ActivityLog/ActivityLog")
  }

  return (
    <div className="flex flex-col">
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
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-senthrap-blue-100 mx-12"
        onClick={goToChat}
      >
        Go to Chat
      </button>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-senthrap-blue-100 mt-4 mx-12"
        onClick={goToMoodLog}
      >
        Go to Mood Log
      </button>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main text-white bg-senthrap-blue-100 mt-4 mx-12"
        onClick={goToActivityLog}
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
