import React, { useState } from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { IoHomeOutline, IoAperture, IoCloseOutline } from "react-icons/io5"

function NavigationBar() {
  const {
    navigateToActivityLog,
    navigateToChat,
    navigateToMoodLog,
    navigateToStats,
    navigateToHome,
  } = useNavigation()
  const { user } = useUser()
  const router = useRouter()
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false)
  const allowedPaths = ["/", "/screens/Home/Home"]
  const isHomeScreen = allowedPaths.includes(router.pathname)

  return (
    <div className="bg-senthrap-new-blue-light bottom-0 h-14 fixed w-full justify-between flex-row flex px-7">
      <button onClick={navigateToHome}>
        <Image
          src="/assets/svg's/navbar/CalendarIcon.svg"
          alt="Calendar Icon"
          width={30}
          height={30}
        />
      </button>
      <button onClick={navigateToChat}>
        <Image
          src="/assets/svg's/navbar/ChatIcon.svg"
          alt="Chat Icon"
          width={30}
          height={30}
        />
      </button>
      <button>
        <Image
          src="/assets/svg's/navbar/CircleWithCrossIcon.svg"
          alt="Add Icon"
          width={30}
          height={30}
        />
      </button>
      <button>
        <Image
          src="/assets/svg's/navbar/CommunityIcon.svg"
          alt="Community Icon"
          width={30}
          height={30}
        />
      </button>
      <button>
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
