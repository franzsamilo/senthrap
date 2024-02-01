import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import Home from "./screens/Home/Home"

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
    <div>
      <button
        className="px-10 py-2 rounded-full font-semibold hover:text-main"
        onClick={auth0Login}
      >
        Login
      </button>
    </div>
  )
}

export default Index
