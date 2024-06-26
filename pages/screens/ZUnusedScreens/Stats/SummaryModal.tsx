import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { IoArrowBackSharp } from "react-icons/io5"
import { moodMap } from "@/constant/enums/moodMap"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import ConversationSummariesData from "@/pages/api/src/schemas/ConversationSummariesData"

interface SummaryModalProps {
  isOpen: boolean
  closeFunction: () => void
}

export default function SummaryModal(props: SummaryModalProps) {
  const { isOpen, closeFunction } = props

  const [data, setData] = useState<ConversationSummariesData[]>([])

  const latestData = data
    .sort((a, b) => {
      const timeA = new Date(a.summary_date_and_time).getTime()
      const timeB = new Date(b.summary_date_and_time).getTime()
      return timeB - timeA
    })
    .slice(0, 7)

  const { user } = useUser()
  useEffect(() => {
    fetch(`/api/fetchSummaries`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const filteredData = data.data.filter(
          (entry: ConversationSummariesData) => entry.user_id === user?.sub
        )

        setData(filteredData)
      })
      .catch((error) => console.error("Error:", error))
  }, [user])

  return (
    <Modal isOpen={isOpen} className="overflow-hidden">
      <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100 border-8 border-senthrap-blue-50 p-4">
        <div className="flex flex-row items-center justify-between">
          <button onClick={closeFunction}>
            <IoArrowBackSharp className="w-8 h-8 text-white" />
          </button>
          <h1 className="font-bold text-3xl text-senthrap-neutral-100 self-center">
            Mood Summary History
          </h1>
          <p></p>
        </div>
        <div className="flex flex-col bg-white border-4 rounded-lg border-senthrap-blue-200 mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {latestData.map((item, index) => (
            <div
              key={index}
              className="flex-col flex py-2 justify-between p-2 border-4 border-senthrap-blue-200 m-3 bg-white rounded-lg items-center"
            >
              <div className="border-4 w-7/12 rounded-lg items-center px-4 border-senthrap-blue-200 justify-center flex flex-row">
                <p className="font-bold font-xs">
                  {new Date(item.summary_date_and_time).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <div className="items-center p-4">
                  <p className="font-semibold">{item.summary_content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
