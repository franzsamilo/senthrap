import React from "react"
import Image from "next/image"
import useNavigation from "../../../constant/Hooks/Navigation"

function MoodUploadSuccess() {
  const { navigateToHome, navigateToMoodLog } = useNavigation()

  return (
    <div className="flex flex-col h-screen w-screen bg-senthrap-blue-100 items-center">
      <Image
        src="/assets/senthrap-logo-no-bg.png"
        alt="Heart Senthrap"
        width={300}
        height={150}
        className="mt-8"
      />
      <h1 className="text-5xl text-white italic font-extrabold mb-28 mt-14 text-center">
        Mood Upload Success!
      </h1>
      <button
        className="bg-senthrap-blue-200 text-white font-bold rounded-lg py-2 px-12 mt-6 w-3/4 text-xl hover:bg-white hover:text-senthrap-blue-200"
        onClick={navigateToHome}
      >
        Go back to Home
      </button>
      <button
        className="bg-senthrap-blue-200 text-white font-bold rounded-lg py-2 px-12 mt-6 w-3/4 text-xl hover:bg-white hover:text-senthrap-blue-200"
        onClick={navigateToMoodLog}
      >
        Go back to Mood Log
      </button>
    </div>
  )
}

export default MoodUploadSuccess
