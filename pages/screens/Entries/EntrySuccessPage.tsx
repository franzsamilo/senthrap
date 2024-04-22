import React from "react"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import Image from "next/image"

function EntrySuccessPage() {
  const { navigateToNewHome } = useNavigation()

  return (
    <div className="flex flex-col bg-senthrap-new-white-bg items-center min-h-screen">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/senthrap-text-logo.png"
          alt={""}
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="text-senthrap-new-blue-dark text-7xl font-bold italic mt-24">
          Entry
        </p>
        <p className="text-senthrap-new-blue-dark text-7xl font-bold italic">
          Success!
        </p>
      </div>
      <div className="flex items-center justify-center mt-64">
        <button
          onClick={navigateToNewHome}
          className="bg-senthrap-new-blue-dark text-senthrap-new-white-bg font-bold py-6 px-12 text-3xl rounded-lg"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  )
}

export default EntrySuccessPage
