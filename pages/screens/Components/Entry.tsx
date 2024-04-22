import React, { useState } from "react"
import Image from "next/image"

interface EntryProps {
  mood: number
  date: string
  activities: string[]
  symptoms: string[]
  notes: string
  advice: string
}

export default function Entry(props: EntryProps) {
  function moodDisplayHandler(mood: number) {
    switch (mood) {
      case 1:
        return (
          <Image
            src="/assets/svg's/moods/Mood1.svg"
            alt="1"
            width={20}
            height={20}
          />
        )
      case 2:
        return (
          <Image
            src="/assets/svg's/moods/Mood2.svg"
            alt="2"
            width={20}
            height={20}
          />
        )
      case 3:
        return (
          <Image
            src="/assets/svg's/moods/Mood3.svg"
            alt="3"
            width={20}
            height={20}
          />
        )
      case 4:
        return (
          <Image
            src="/assets/svg's/moods/Mood4.svg"
            alt="4"
            width={20}
            height={20}
          />
        )
      case 5:
        return (
          <Image
            src="/assets/svg's/moods/Mood5.svg"
            alt="5"
            width={20}
            height={20}
          />
        )
      default:
        return (
          <Image
            src="/assets/svg's/moods/Mood5.svg"
            alt="5"
            width={20}
            height={20}
          />
        )
    }
  }

  const { mood, date, activities, symptoms, notes, advice } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleTab = () => setIsOpen(!isOpen)

  return (
    <div>
      <button
        className={`p-4 flex justify-between items-center text-senthrap-new-blue-dark w-9/12 font-bold bg-senthrap-new-yellow-heavy  border-senthrap-new-yellow-stroke ${
          !isOpen ? "border rounded-2xl" : "border-t rounded-t-2xl"
        }`}
        onClick={toggleTab}
      >
        {date}
        {isOpen ? (
          <Image
            src="/assets/svg's/entryicons/up.svg"
            alt="close"
            width={16}
            height={16}
          />
        ) : (
          <Image
            src="/assets/svg's/entryicons/down.svg"
            alt="open"
            width={16}
            height={16}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={`tab-content p-4 w-9/12 rounded-b-2xl  bg-senthrap-new-yellow-heavy border-senthrap-new-yellow-stroke`}
        >
          <div className="flex flex-row justify-between w-3/5">
            <p className="text-base text-senthrap-new-blue-dark font-bold">
              Mood:
            </p>
            {moodDisplayHandler(mood)}
          </div>
          <div className="flex flex-row justify-between w-3/5">
            <p className="text-base text-senthrap-new-blue-dark font-bold">
              Activities:
            </p>
            <p className="text-base text-senthrap-new-blue-dark font-medium">
              {activities.join(", ")}
            </p>
          </div>
          <div className="flex flex-row justify-between w-3/5">
            <p className="text-base text-senthrap-new-blue-dark font-bold">
              Symptoms:
            </p>
            <p className="text-base text-senthrap-new-blue-dark font-medium">
              {symptoms.join(", ")}
            </p>
          </div>
          <div className="flex flex-col justify-between w-3/5">
            <p className="text-base text-senthrap-new-blue-dark font-bold">
              Notes:
            </p>
            <p className="text-base text-senthrap-new-blue-dark font-medium">
              {notes}
            </p>
          </div>
          <div className="flex flex-col justify-between w-3/5">
            <p className="text-base text-senthrap-new-blue-dark font-bold">
              Advice from SENTHRAP:
            </p>
            <p className="text-base text-senthrap-new-blue-dark font-medium">
              {advice}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
