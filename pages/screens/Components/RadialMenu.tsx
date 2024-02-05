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

function RadialMenu() {
  const [menuToggleActive, setMenuToggleActive] = useState(false)

  function rotateMenu() {
    return menuToggleActive ? "rotate-[315deg]" : ""
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-senthrap-gradient">
      <div className="flex justify-center items-center relative w-80 h-80 bg-[#0f0]">
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
              <button>
                {i === 0 && <IoHomeOutline className="w-12 h-12" />}
                {i === 1 && <IoChatboxEllipsesOutline className="w-12 h-12" />}
                {i === 2 && <IoCalendarOutline className="w-12 h-12" />}
                {i === 3 && <IoHappyOutline className="w-12 h-12" />}
                {i === 4 && <IoAnalyticsOutline className="w-12 h-12" />}
                {i === 5 && <IoPersonCircleOutline className="w-12 h-12" />}
                {i === 6 && <IoSettingsOutline className="w-12 h-12" />}
                {i === 7 && <IoLogOutOutline className="w-12 h-12" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RadialMenu
