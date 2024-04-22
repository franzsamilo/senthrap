import React, { useState } from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { IoHomeOutline, IoAperture, IoCloseOutline } from "react-icons/io5"

function NavigationBar() {
  const { navigateToChat, navigateToNewHome } = useNavigation()

  const router = useRouter()

  const allowedPaths = ["/", "/screens/Home/Home"]

  return (
    <div className="bg-senthrap-new-blue-light bottom-0 h-14 fixed w-full justify-between flex-row flex px-7">
      <button onClick={navigateToNewHome}>
        <Image
          src="/assets/svg's/navbar/CalendarIcon.svg"
          alt="Calendar Icon"
          width={30}
          height={30}
        />
      </button>
      <button onClick={navigateToChat} className="mt-2">
        <Image
          src="/assets/svg's/navbar/ChatIcon.svg"
          alt="Chat Icon"
          width={35}
          height={30}
        />
      </button>
      <button onClick={() => alert("This feature will be added soon.")}>
        <Image
          src="/assets/svg's/navbar/CircleWithCrossIcon.svg"
          alt="Add Icon"
          width={30}
          height={30}
        />
      </button>
      <button onClick={() => alert("This feature will be added soon.")}>
        <Image
          src="/assets/svg's/navbar/CommunityIcon.svg"
          alt="Community Icon"
          width={30}
          height={30}
        />
      </button>
      <button onClick={() => alert("This feature will be added soon.")}>
        <Image
          src="/assets/svg's/navbar/UserIcon.svg"
          alt="Mood Icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  )
}

export default NavigationBar
