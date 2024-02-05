import React, { useState } from "react"
import Header from "../Components/Header"
import Image from "next/image"
import LatestActivityLogs from "./LatestActivityLogs"
import AddActivityLog from "./AddActivityLog"

function ActivityLog() {
  const [openAddActitivyLog, setOpenAddActivityLog] = useState(false)

  return (
    <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl text-senthrap-neutral-100 mt-8">
          Activity Log
        </h1>
        <div>
          {!openAddActitivyLog && <LatestActivityLogs />}
          {openAddActitivyLog && (
            <div className="mt-6 flex flex-col items-center border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 rounded-lg px-6">
              <AddActivityLog />
              <div className="mt-6 mb-3 flex flex-row items-center">
                <div className="mx-3 bg-senthrap-blue-200 hover:to-blue-500 rounded-xl ">
                  <button
                    onClick={() => setOpenAddActivityLog(false)}
                    className="text-white hover:text-senthrap-blue-10 px-6 py-2 font-medium"
                  >
                    Cancel
                  </button>
                </div>
                <div className="mx-3 bg-senthrap-blue-100 hover:bg-senthrap-blue-200 rounded-xl">
                  <button
                    onClick={() => null}
                    className="text-white hover:text-senthrap-blue-10 px-6 py-2 font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="mt-auto ml-auto mb-12 mr-16"
        onClick={() => setOpenAddActivityLog(true)}
      >
        <Image
          src="/assets/svg's/add-activity-log-button.svg"
          alt="Mood Icon"
          width={70}
          height={70}
        />
      </button>
    </div>
  )
}

export default ActivityLog
