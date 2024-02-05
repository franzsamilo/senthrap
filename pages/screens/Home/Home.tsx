import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import Header from "../Components/Header"
import RadialMenu from "../Components/RadialMenu"

function Home() {
  const { user } = useUser()

  return (
    <div className="flex flex-col min-h-screen w-screen  bg-senthrap-blue-100">
      <div className=" font-bold items-center">
        <Header />
        <p className="m-4 text-white">{user?.email}</p>
        <div className="mt-24">
          <RadialMenu />
        </div>
      </div>
    </div>
  )
}

export default Home
