import React from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"

function Header() {
  const { user } = useUser()

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
      <div className="my-4 mr-4">
        <button>
          <Image
            src="/assets/svg's/nav-menu-button.svg"
            alt="Mood Icon"
            width={52}
            height={47}
          />
        </button>
      </div>
    </div>
  )
}

export default Header
