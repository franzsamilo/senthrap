import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Home from "./screens/Home/Home"
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
    return <Home />
  }

  return (
    <div className="bg-senthrap-splash bg-cover bg-center h-screen w-screen pt-12 ">
      <div className="flex flex-col items-center h-full text-center justify-between">
        <div className="mx-12">
          <p className="text-4xl font-bold text-senthrap-neutral-100 drop-shadow-md">
            WELCOME TO SENTHRAP
          </p>
          <p className="text-senthrap-neutral-100 text-lg italic">
            a mental health app
          </p>
        </div>
        <div className="items-center justify-center">
          <Image
            src="/assets/senthrap-logo-no-bg.png"
            alt="Heart Senthrap"
            width={200}
            height={100}
          />
        </div>
        <button
          className="bg-senthrap-neutral-100 rounded-md py-1 w-2/3 mb-12 hover:bg-senthrap-blue-100 hover:text-white"
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
