import React, { useState } from "react"
import {
  IoAddOutline,
  IoHomeOutline,
  IoChatboxEllipsesOutline,
  IoCalendarOutline,
  IoHappyOutline,
  IoAnalyticsOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5"
import { useRouter } from "next/router"

import useNavigation from "@/pages/api/src/Hooks/Navigation"

function RadialMenu() {
  const router = useRouter()
  const [menuToggleActive, setMenuToggleActive] = useState(false)

  function rotateMenu() {
    return menuToggleActive ? "rotate-[315deg]" : ""
  }

  function auth0Logout() {
    router.push("/api/auth/logout")
  }

  const {
    navigateToHome,
    navigateToChat,
    navigateToMoodLog,
    navigateToActivityLog,
  } = useNavigation()

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center relative w-80 h-80">
        <button
          className={`absolute w-24 h-24 bg-white flex justify-center items-center z-50 rounded-[50%] cursor-pointer drop-shadow-lg ${rotateMenu()} duration-[1250ms]`}
          onClick={() => setMenuToggleActive(!menuToggleActive)}
        >
          <IoAddOutline className="w-12 h-12" />
        </button>
        <ul className="flex justify-center items-center absolute w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <li
              key={i}
              style={{
                transform: menuToggleActive
                  ? `rotate(${(360 / 8) * i}deg)`
                  : `rotate(0deg) translateX(160px)`,
                transitionDelay: `calc(0.1s * ${i})`,
              }}
              className="absolute list-none origin-[160px] left-0 duration-[500ms] "
            >
              <div>
                {i === 0 && (
                  <button
                    onClick={navigateToHome}
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoHomeOutline className="w-8 h-8 " />
                  </button>
                )}
                {i === 1 && (
                  <button
                    onClick={navigateToChat}
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoChatboxEllipsesOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 2 && (
                  <button
                    onClick={navigateToActivityLog}
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoCalendarOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 3 && (
                  <button
                    onClick={navigateToMoodLog}
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoHappyOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 4 && (
                  <button
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2 "
                  >
                    <IoAnalyticsOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 5 && (
                  <button
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoPersonCircleOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 6 && (
                  <button
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-senthrap-blue-200 text-senthrap-blue-50 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoSettingsOutline className="w-8 h-8" />
                  </button>
                )}
                {i === 7 && (
                  <button
                    onClick={auth0Logout}
                    style={{ transform: `rotate(${(360 / -8) * i}deg)` }}
                    className="drop-shadow-lg bg-white hover:bg-red-700 text-red-700 hover:text-white rounded-full flex justify-center items-center px-2 py-2"
                  >
                    <IoLogOutOutline className="w-8 h-8 " />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RadialMenu
