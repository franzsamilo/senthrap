import React, { SyntheticEvent, useState } from "react"
import Image from "next/image"
import Dropdown from "./Dropdown"
import DropdownRow from "@/constant/schemas/DropdownRow"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function HomeMoodLogChecker() {
  const { user } = useUser()

  const [content, setContent] = useState("")
  const [mood, setMood] = useState<Number>(0)
  const [selectedActivity, setSelectedActivity] = useState<DropdownRow[]>([])
  const [selectedSymptoms, setSelectedSymptoms] = useState<DropdownRow[]>([])

  const options = [
    { value: "React", label: "React" },
    { value: "Vue", label: "Vue" },
    { value: "Angular", label: "Angular" },
    { value: "Java", label: "Java" },
  ]

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    if (!user) {
      console.error("User not authenticated")
      return
    }

    const response = await fetch("/api/uploadEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entry_mood: mood,
        entry_activity: selectedActivity.map((activity) => activity.value),
        entry_symptoms: selectedSymptoms.map((symptom) => symptom.value),
        entry_content: content,
        user_id: user.sub,
      }),
    })

    if (response.ok) {
      console.log("Entry uploaded successfully")
    } else {
      console.error("Failed to upload entry")
    }
  }

  return (
    <div className="bg-senthrap-new-yellow-heavy py-12 w-10/12 flex flex-col items-center mx-8 rounded-2xl border border-senthrap-new-yellow-stroke mb-12">
      <p className="font-bold text-senthrap-new-blue-dark text-xl mb-4">
        How are you today?
      </p>
      <div></div>
      <div className="flex flex-row justify-between w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">Mood</p>
        <div className="flex flex-row">
          <button
            onClick={() => {
              setMood(1)
            }}
            className="mr-1"
          >
            <Image
              src="/assets/svg's/moods/Mood1.svg"
              alt="Mood Icon1"
              width={25}
              height={25}
            />
          </button>
          <button
            onClick={() => {
              setMood(2)
            }}
            className="mr-1"
          >
            <Image
              src="/assets/svg's/moods/Mood2.svg"
              alt="Mood Icon2"
              width={25}
              height={25}
            />
          </button>
          <button
            onClick={() => {
              setMood(3)
            }}
            className="mr-1"
          >
            <Image
              src="/assets/svg's/moods/Mood3.svg"
              alt="Mood Icon3"
              width={25}
              height={25}
            />
          </button>
          <button
            onClick={() => {
              setMood(4)
            }}
            className="mr-1"
          >
            <Image
              src="/assets/svg's/moods/Mood4.svg"
              alt="Mood Icon4"
              width={25}
              height={25}
            />
          </button>
          <button
            onClick={() => {
              setMood(5)
            }}
            className="mr-1"
          >
            <Image
              src="/assets/svg's/moods/Mood5.svg"
              alt="Mood Icon5"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">
          Activity
        </p>
        <Dropdown
          selected={selectedActivity}
          setSelected={setSelectedActivity}
          options={options}
          className="max-h-auto max-w-40"
        />
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base mr-3">
          Symptoms
        </p>
        <Dropdown
          selected={selectedSymptoms}
          setSelected={setSelectedSymptoms}
          options={options}
          className="max-h-auto max-w-40"
        />
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base mb-4">
          Notes
        </p>
      </div>
      <div>
        <textarea
          className="focus:outline-none p-5 min-h-72 h-auto min-w-72 bg-senthrap-new-yellow-light border placeholder-slate-500 border-senthrap-new-yellow-stroke rounded-md font-medium text-sm  text-senthrap-new-blue-dark w-full resize-none"
          placeholder="Why do you feel that way?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="border border-senthrap-new-yellow-stroke bg-senthrap-new-yellow-light rounded-2xl mt-4"
        onClick={handleSubmit}
      >
        <p className="font-bold text-senthrap-new-blue-dark text-base px-8 py-2">
          Submit
        </p>
      </button>
    </div>
  )
}
