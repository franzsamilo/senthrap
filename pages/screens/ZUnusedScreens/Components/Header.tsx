import React, { useState } from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { IoHomeOutline, IoAperture, IoCloseOutline } from "react-icons/io5"
import RadialMenu from "./RadialMenu"

function Header() {
  const { user } = useUser()
  const { navigateToHome } = useNavigation()
  const router = useRouter()
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false)
  const allowedPaths = ["/", "/screens/Home/Home"]
  const isHomeScreen = allowedPaths.includes(router.pathname)

  function toggleRadialMenu() {
    setIsRadialMenuOpen(!isRadialMenuOpen)
  }

  return (
    <div className="flex flex-row justify-between border-b-2 bg-senthrap-blue-100 border-senthrap-blue-200 shadow-md">
      {isRadialMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10" />
      )}
      <div className="my-4 ml-4 flex flex-row items-center">
        <Image
          src={user?.picture || ""}
          alt={user?.name || ""}
          width={54}
          height={48}
          className="rounded-lg"
        />
        <p className="text-senthrap-neutral-100 text-2xl font-bold ml-5 italic">
          Hello, {user?.name ? user.name.split(" ")[0] : "friend"}!
        </p>
      </div>
      {!isHomeScreen && (
        <div className="mr-6 mt-6">
          <button
            onClick={navigateToHome}
            className="drop-shadow-lg text-white hover:text-senthrap-blue-50 rounded-full flex justify-center items-center"
          >
            <IoHomeOutline className="w-10 h-10 " />
          </button>
        </div>
      )}

      {isHomeScreen && (
        <div className="mr-6 mt-6">
          <button
            onClick={toggleRadialMenu}
            className="drop-shadow-lg text-white hover:text-senthrap-blue-50 rounded-full flex justify-center items-center"
          >
            <IoAperture className="w-10 h-10 " />
          </button>
        </div>
      )}

      {isRadialMenuOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleRadialMenu()
            }}
          >
            <IoCloseOutline className="text-red-500 w-16 h-16 absolute top-0 right-0 mt-5 mr-5" />
          </button>
          <RadialMenu />
        </div>
      )}
    </div>
  )
}

export default Header
