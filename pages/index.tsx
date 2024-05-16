import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Home from "./screens/ZUnusedScreens/Home/Home"
import NewHome from "./screens/Home/NewHome"
import Image from "next/image"
import loadinganimation from "../public/assets/heart-loading.gif"

function Index() {
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Image src={loadinganimation} alt="hi" className=" mt-[10%]" />
      </div>
    )
  if (error) return <div>{error.message}</div>

  function auth0Login() {
    router.push("/api/auth/login")
  }

  if (user) {
    return <NewHome />
  }

  return (
    <div className="bg-senthrap-splash bg-cover bg-center h-screen w-screen pt-12 ">
      <div className="flex flex-col items-center h-full text-center justify-between">
        <div className="mx-12">
          <p className="text-5xl font-bold text-senthrap-new-yellow-light drop-shadow-2xl">
            WELCOME TO SENTHRAP
          </p>
          <p className="text-senthrap-new-yellow-light text-lg italic">
            a mental health app
          </p>
        </div>
        <div className="items-center justify-center">
          <Image
            src="/assets/senthrap-text-logo.png"
            alt="Heart Senthrap"
            width={200}
            height={100}
          />
        </div>
        <button
          className="bg-senthrap-new-yellow-light rounded-md py-1 w-2/3 mb-12 hover:bg-white hover:text-white shadow-2xl"
          onClick={auth0Login}
        >
          <p className="text-senthrap-blue-100 text-xl font-bold">
            Get Started
          </p>
        </button>
      </div>
    </div>
  )
}

export default Index
