import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { IoArrowBackSharp } from "react-icons/io5"
import MoodData from "@/pages/api/src/schemas/MoodData"
import { moodMap } from "@/constant/enums/moodMap"
import Image from "next/image"

interface HistoryModalProps {
  isOpen: boolean
  closeFunction: () => void
  data: MoodData[]
}

export default function HistoryModal(props: HistoryModalProps) {
  const { isOpen, closeFunction, data } = props

  const [latestData, setLatestData] = useState<MoodData[]>([])
  useEffect(() => {
    const latestData = data
      .sort((a, b) => {
        const timeA = new Date(a.mood_log_upload_time).getTime()
        const timeB = new Date(b.mood_log_upload_time).getTime()
        return timeB - timeA
      })
      .slice(0, 5)
    setLatestData(latestData)
  }, [data])

  function moodIconCheck(mood: string) {
    if (mood === moodMap.HAPPY) {
      return "/assets/svg's/mood-happy.svg"
    }
    if (mood === moodMap.NEUTRAL) {
      return "/assets/svg's/mood-neutral.svg"
    }
    if (mood === moodMap.SAD) {
      return "/assets/svg's/mood-sad.svg"
    }
    if (mood === moodMap.ANGRY) {
      return "/assets/svg's/mood-angry.svg"
    }
    return "/assets/heart-loading.gif"
  }

  return (
    <Modal isOpen={isOpen} className="overflow-hidden">
      <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100 border-8 border-senthrap-blue-50 p-4">
        <div className="flex flex-row items-center justify-between">
          <button onClick={closeFunction}>
            <IoArrowBackSharp className="w-8 h-8 text-white" />
          </button>
          <h1 className="font-bold text-3xl text-senthrap-neutral-100 self-center">
            Mood Log History
          </h1>
          <p></p>
        </div>
        <div className="flex flex-col border-4 rounded-lg bg-senthrap-blue-50 border-senthrap-blue-200 mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {latestData.map((item, index) => (
            <div
              key={index}
              className="flex-col flex py-2 justify-between p-2 border-4 border-senthrap-blue-200 m-3 bg-white rounded-lg items-center"
            >
              <div className="border-4 w-7/12 rounded-lg items-center px-4 border-senthrap-blue-200 justify-center flex flex-row">
                <p className="font-bold font-xs">
                  {new Date(item.mood_log_upload_time).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <div className="min-w-24">
                  <Image
                    src={moodIconCheck(item.mood_value)}
                    alt="Loading.."
                    width={50}
                    height={50}
                  />
                </div>
                <div className="items-center p-4">
                  <p className="font-semibold">{item.mood_log_content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
