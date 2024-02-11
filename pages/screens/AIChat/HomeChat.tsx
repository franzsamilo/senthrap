import React, { useState } from "react"
import { useRouter } from "next/router"

function HomeChat() {
  const router = useRouter()
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false)

  function goToChat() {
    setIsLoadingChat(true)
    router
      .push("/screens/AIChat/NormalChat")
      .then(() => {
        setIsLoadingChat(false)
      })
      .catch((error) => {
        console.error("Navigation error:", error)
        setIsLoadingChat(false)
      })
  }

  function goToHome() {
    router.push("/screens/Home/Home")
  }

  function goToAdvice() {
    setIsLoadingAdvice(true)
    router
      .push("/screens/AIChat/AdviceChat")
      .then(() => {
        setIsLoadingAdvice(false)
      })
      .catch((error) => {
        console.error("Navigation error", error)
        setIsLoadingAdvice(false)
      })
  }

  return (
    <div className="bg-senthrap-blue-100 h-full">
      <button onClick={goToHome} className="p-4">
        Go Back to Home
      </button>
      <main className="flex flex-col justify-center items-center h-screen">
        <button
          onClick={goToChat}
          className={`m-2 px-4 py-2 rounded ${
            isLoadingChat
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={isLoadingChat}
        >
          {isLoadingChat ? "Loading..." : "I need to talk to someone."}
        </button>
        {/* <button
          onClick={goToAdvice}
          className={`m-2 px-4 py-2 rounded ${
            isLoadingAdvice
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white"
          }`}
          disabled={isLoadingAdvice}
        >
          {isLoadingAdvice ? "Loading..." : "I need some advice."}
        </button> */}
      </main>
    </div>
  )
}

export default HomeChat
