import React from "react"
import { useRouter } from "next/router"

function HomeChat() {
  const router = useRouter()

  function goToChat() {
    router.push("/screens/AIChat/AIChat")
  }

  function goToHome() {
    router.push("/screens/Home/Home")
  }

  return (
    <div className="bg-senthrap-blue-100 h-full">
      <button onClick={goToHome} className="p-4">
        Go Back to Home
      </button>
      <main className="flex flex-col justify-center items-center h-screen">
        <button
          onClick={goToChat}
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          I need to talk to someone.
        </button>
        {/* <button className="m-2 px-4 py-2 bg-green-500 text-white rounded">
        I need some advice.
      </button> */}
      </main>
    </div>
  )
}

export default HomeChat
