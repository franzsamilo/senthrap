import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import Header from "../Components/Header"

function HomeChat() {
  const router = useRouter()
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false)
  const [showReminder, setShowReminder] = useState(true)

  useEffect(() => {
    if (showReminder) {
      setTimeout(() => {
        setShowReminder(false)
      }, 15000)
    }
  }, [showReminder])

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
    <div className="bg-senthrap-blue-100 flex flex-col  min-h-screen">
      <Header />
      <button
        onClick={goToChat}
        className={`mt-[60%] py-4 px-4 mx-12 rounded-2xl text-2xl font-semibold italic text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white ${
          isLoadingChat
            ? " cursor-not-allowed"
            : "bg-senthrap-blue-200 text-white"
        }`}
        disabled={isLoadingChat}
      >
        {isLoadingChat ? (
          <ClipLoader
            color={"#ffffff"}
            loading={isLoadingChat}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "I need to talk to someone."
        )}
      </button>
      <button
        onClick={goToAdvice}
        className={`mt-4 py-4 px-4 mx-12 rounded-2xl text-2xl font-semibold italic text-senthrap-blue-50 hover:bg-senthrap-blue-200 hover:text-white ${
          isLoadingAdvice ? " cursor-not-allowed" : "bg-green-500 text-white"
        }`}
        disabled={isLoadingAdvice}
      >
        {isLoadingAdvice ? (
          <ClipLoader
            color={"#ffffff"}
            loading={isLoadingAdvice}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "I need some advice."
        )}
      </button>
      {showReminder && (
        <div className="reminder fixed bottom-0 left-0 right-0 p-4 mx-8 mb-4 text-center font-medium bg-senthrap-blue-200 rounded-lg text-white text-lg">
          Hey, REMEMBER TO CLICK &quot;End Session&quot; in the next page to
          save your conversation to your account
          <button
            onClick={() => setShowReminder(false)}
            className="close-btn absolute top-0 right-0 p-1"
          >
            x
          </button>
        </div>
      )}
    </div>
  )
}

export default HomeChat
