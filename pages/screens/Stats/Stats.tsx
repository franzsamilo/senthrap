import React, { useEffect, useState } from "react"
import Header from "../Components/Header"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { DocumentData } from "firebase/firestore"
import { moodMap } from "@/constant/enums/moodMap"
import Modal from "react-modal"
import HistoryModal from "./HistoryModal"

interface MoodData {
  mood_value: string
  mood_log_upload_time: string
  mood_log_content: string
  user_id: string
}

function Stats() {
  const [data, setData] = useState<MoodData[]>()
  const [happyCount, setHappyCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [sadCount, setSadCount] = useState(0)
  const [angryCount, setAngryCount] = useState(0)

  const [lastFelt, setLastFelt] = useState("")
  const [latestMoodLog, setLatestMoodLog] = useState("")

  const [isMoodLogHistoryOpen, setIsMoodLogHistoryOpen] = useState(false)

  function handleMoodLogHistory() {
    if (!isMoodLogHistoryOpen) {
      setIsMoodLogHistoryOpen(true)
    } else {
      setIsMoodLogHistoryOpen(false)
    }
  }

  let userData: MoodData[] = []
  const { user } = useUser()
  useEffect(() => {
    // Fetch data from API route on page load
    fetch(`/api/fetchMoods`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Filter the data based on the user ID
        const filteredData = data.data.filter(
          (entry: MoodData) => entry.user_id === user?.sub
        )
        // Set the filtered data to the state
        setData(filteredData)
      })
      .catch((error) => console.error("Error:", error))
  }, [user])

  useEffect(() => {
    if (data) {
      const counts = {
        happy: 0,
        neutral: 0,
        sad: 0,
        angry: 0,
      }
      data.forEach((entry) => {
        switch (entry.mood_value) {
          case moodMap.HAPPY:
            counts.happy++
            break
          case moodMap.NEUTRAL:
            counts.neutral++
            break
          case moodMap.SAD:
            counts.sad++
            break
          case moodMap.ANGRY:
            counts.angry++
            break
          default:
            break
        }

        const latestData = data.reduce((latest, current) => {
          const latestTime = new Date(latest.mood_log_upload_time).getTime()
          const currentTime = new Date(current.mood_log_upload_time).getTime()
          return currentTime > latestTime ? current : latest
        }, data[0])

        setLastFelt(latestData.mood_value)
        setLatestMoodLog(latestData.mood_log_content)
      })
      setHappyCount(counts.happy)
      setNeutralCount(counts.neutral)
      setSadCount(counts.sad)
      setAngryCount(counts.angry)
    }
  }, [data])

  return (
    <>
      <HistoryModal
        closeFunction={handleMoodLogHistory}
        isOpen={isMoodLogHistoryOpen}
      />
      <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100">
        <Header />
        <div className="flex flex-col justify-between items-center mt-8">
          <Image
            src="/assets/senthrap-logo-no-bg.png"
            alt="Heart Senthrap"
            width={50}
            height={25}
          />
          <h1 className="font-bold text-4xl text-senthrap-neutral-100">
            Stats
          </h1>
          <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-5/6 rounded-xl">
            <h2 className="text-white font-extrabold text-2x">
              What you felt earlier:
            </h2>
            <div className="min-h-4 h-auto">
              <p className="text-senthrap-blue-200 font-extrabold text-xl">
                {lastFelt.toUpperCase()}
              </p>
              <p className="text-senthrap-blue-200 font-semibold ">
                {latestMoodLog}
              </p>
              <p></p>
            </div>
          </div>
          <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-5/6 rounded-xl">
            <h2 className="text-white font-extrabold text-2x">Mood Count:</h2>
            <div className="flex flex-row justify-between items-center px-4">
              <div className="flex-col flex items-center">
                <Image
                  src="/assets/svg's/mood-happy.svg"
                  alt="Mood Icon"
                  width={42}
                  height={42}
                />
                <p className=" text-senthrap-blue-200 font-bold">
                  {happyCount}
                </p>
              </div>
              <div className="flex-col flex items-center">
                <Image
                  src="/assets/svg's/mood-neutral.svg"
                  alt="Mood Icon"
                  width={38}
                  height={38}
                />
                <p className="text-senthrap-blue-200 font-bold">
                  {neutralCount}
                </p>
              </div>
              <div className="flex-col flex items-center">
                <Image
                  src="/assets/svg's/mood-sad.svg"
                  alt="Mood Icon"
                  width={42}
                  height={42}
                />
                <p className="text-senthrap-blue-200 font-bold">{sadCount}</p>
              </div>
              <div className="flex-col flex items-center">
                <Image
                  src="/assets/svg's/mood-angry.svg"
                  alt="Mood Icon"
                  width={42}
                  height={42}
                />
                <p className="text-senthrap-blue-200 font-bold">{angryCount}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-8 w-full">
            <button
              className="border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 w-5/12 rounded-xl ml-8 mr-2 items-center justify-center"
              onClick={handleMoodLogHistory}
            >
              <h3 className="text-white font-bold text-2xl">
                Mood Log History
              </h3>
            </button>
            <button className="border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 w-5/12 rounded-xl mr-8 ml-2 items-center justify-center">
              <h3 className="text-white font-bold text-2xl">Summary History</h3>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stats
