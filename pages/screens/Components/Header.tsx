import React from "react"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"

function Header() {
  const { user } = useUser()

  return (
    <div className="flex flex-row mx-8 mt-8 justify-between">
      <Image
        src={user?.picture || ""}
        alt={user?.name || ""}
        width={54}
        height={48}
        className="rounded-lg"
      />
      <button>
        <Image
          src="/assets/svg's/nav-menu-button.svg"
          alt="Mood Icon"
          width={52}
          height={47}
        />
      </button>
    </div>
  )
}

export default Header
