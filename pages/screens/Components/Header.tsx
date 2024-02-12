import React from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { IoHomeOutline } from "react-icons/io5"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useRouter } from "next/router"

function Header() {
  const { user } = useUser()
  const { navigateToHome } = useNavigation()
  const router = useRouter()

  const isHomeScreen = router.pathname === "/screens/Home/Home"

  return (
    <div className="flex flex-row justify-between border-b-2 bg-senthrap-blue-100 border-senthrap-blue-200 shadow-md">
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
    </div>
  )
}

export default Header
