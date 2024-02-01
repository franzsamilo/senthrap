import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Home from "./screens/Home/Home"
import Image from "next/image"

function Index() {
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  function auth0Login() {
    router.push("/api/auth/login")
  }

  if (user) {
    return <Home />
  }

  return (
    <div className="bg-senthrap-splash bg-cover bg-center h-screen w-screen ">
      <div className="flex flex-col items-center h-full text-center">
        <div className="mx-12 mt-12">
          <p className="text-4xl font-bold text-senthrap-yellow-100 drop-shadow-md		">
            WELCOME TO SENTHRAP
          </p>
          <p className="text-senthrap-yellow-100 text-lg italic">
            a mental health app
          </p>
        </div>
        <div className=" items-center justify-center my-auto">
          <Image
            src="/assets/senthrap-logo-no-bg.png"
            alt="Heart Senthrap"
            width={160}
            height={80}
            className="mb-[70px]"
          />
        </div>
        <button
          className="bg-senthrap-neutral-100 rounded-md py-1 w-2/3 mb-12 hover:bg-senthrap-yellow-100 hover:text-senthrap-blue-100"
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
