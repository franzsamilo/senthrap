import React, { SyntheticEvent, useState } from "react"
import Image from "next/image"
import Dropdown from "../ZUnusedScreens/Components/Dropdown"
import DropdownRow from "@/constant/schemas/DropdownRow"
import { useUser } from "@auth0/nextjs-auth0/client"
import OpenAI from "openai"
import useNavigation from "@/pages/api/src/Hooks/Navigation"

let openaiInstance: OpenAI

async function getOpenAIInstance() {
  if (!openaiInstance) {
    const { default: OpenAI } = await import("openai")
    openaiInstance = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  }
  return openaiInstance
}

export default function HomeMoodLogChecker() {
  const { user } = useUser()
  const { navigateToEntrySuccess } = useNavigation()
  const [content, setContent] = useState("")
  const [mood, setMood] = useState<Number>(0)
  const [activity, setActivity] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [advice, setAdvice] = useState("")

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    if (!user) {
      console.error("User not authenticated")
      return
    }

    try {
      const openai = await getOpenAIInstance()
      const openaiCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        temperature: 0.75,
        messages: [
          {
            role: "user",
            content: `You are a helpful mental health assistant who gives specific and helpful suggestions. Can you give a short advice in one sentence based on these information: \n
            Mood: ${mood}\n
            Activities: ${activity}\n
            Symptoms: ${symptoms}\n
            Content: ${content}\n`,
          },
        ],
      })
      const generatedAdvice =
        openaiCompletion.choices[0]?.message?.content?.trim() ?? ""
      setAdvice(generatedAdvice)
      console.log(advice)

      if (advice) {
        const response = await fetch("/api/uploadEntry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entry_mood: mood,
            entry_activity: activity,
            entry_symptoms: symptoms,
            entry_content: content,
            entry_advice: advice,
            user_id: user.sub,
          }),
        })

        if (response.ok) {
          console.log("Entry uploaded successfully")
          navigateToEntrySuccess()
        } else {
          console.error("Failed to upload entry")
        }
      } else {
        console.log("No advice found.")
      }
    } catch (error) {
      console.error("Error generating advice:", error)
      setAdvice("Take care of yourself and stay positive!")
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
            {mood === 1 ? (
              <Image
                src="/assets/svg's/moods/Mood1.svg"
                alt="Mood Icon1"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/svg's/moods/InvertMood1.svg"
                alt="Mood Icon1"
                width={25}
                height={25}
              />
            )}
          </button>
          <button
            onClick={() => {
              setMood(2)
            }}
            className="mr-1"
          >
            {mood === 2 ? (
              <Image
                src="/assets/svg's/moods/Mood2.svg"
                alt="Mood Icon2"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/svg's/moods/InvertMood2.svg"
                alt="Mood Icon2"
                width={25}
                height={25}
              />
            )}
          </button>
          <button
            onClick={() => {
              setMood(3)
            }}
            className="mr-1"
          >
            {mood === 3 ? (
              <Image
                src="/assets/svg's/moods/Mood3.svg"
                alt="Mood Icon3"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/svg's/moods/InvertMood3.svg"
                alt="Mood Icon3"
                width={25}
                height={25}
              />
            )}
          </button>
          <button
            onClick={() => {
              setMood(4)
            }}
            className="mr-1"
          >
            {mood === 4 ? (
              <Image
                src="/assets/svg's/moods/Mood4.svg"
                alt="Mood Icon4"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/svg's/moods/InvertMood4.svg"
                alt="Mood Icon4"
                width={25}
                height={25}
              />
            )}
          </button>
          <button
            onClick={() => {
              setMood(5)
            }}
            className="mr-1"
          >
            {mood === 5 ? (
              <Image
                src="/assets/svg's/moods/Mood5.svg"
                alt="Mood Icon5"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/svg's/moods/InvertMood5.svg"
                alt="Mood Icon5"
                width={25}
                height={25}
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">
          Activity
        </p>
      </div>
      <div>
        <textarea
          className="focus:outline-none p-5 min-h-27 h-auto min-w-72 bg-senthrap-new-yellow-light border placeholder-slate-500 border-senthrap-new-yellow-stroke rounded-md font-medium text-sm  text-senthrap-new-blue-dark w-full resize-none"
          placeholder="What did you do today?"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base mr-3">
          Symptoms
        </p>
      </div>
      <div>
        <textarea
          className="focus:outline-none p-5 min-h-27 h-auto min-w-72 bg-senthrap-new-yellow-light border placeholder-slate-500 border-senthrap-new-yellow-stroke rounded-md font-medium text-sm  text-senthrap-new-blue-dark w-full resize-none"
          placeholder="What are you feeling?"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
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
        className="border border-senthrap-new-yellow-stroke bg-senthrap-new-yellow-light  rounded-2xl mt-4"
        onClick={handleSubmit}
      >
        <p className="font-bold text-senthrap-new-blue-dark text-base px-8 py-2">
          Submit
        </p>
      </button>
    </div>
  )
}
