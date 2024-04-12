import React from "react"
import Image from "next/image"
import Dropdown from "./Dropdown"

export default function HomeMoodLogChecker() {
  const [content, setContent] = React.useState("")
  const options = [
    { value: "React", label: "React" },
    { value: "Vue", label: "Vue" },
    { value: "Angular", label: "Angular" },
    { value: "Java", label: "Java" },
    { value: "Java", label: "Java" },
    { value: "Java", label: "Java" },
    { value: "Java", label: "Java" },
    { value: "Java", label: "Java" },
  ]

  return (
    <div className="bg-senthrap-new-yellow-heavy py-12 w-10/12 flex flex-col items-center justify-center mx-8 rounded-2xl border border-senthrap-new-yellow-stroke">
      <div className="items-center justify-between flex flex-row">
        <p className="font-bold text-senthrap-new-blue-dark text-xl">
          How are you today?
        </p>
      </div>
      <div className="flex flex-row justify-between w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">Mood</p>
        <div className="flex flex-row justify-between">
          <button>
            <Image
              src="/assets/svg's/moods/Mood1.svg"
              alt="Mood Icon1"
              width={20}
              height={20}
            />
          </button>
          <button>
            <Image
              src="/assets/svg's/moods/Mood2.svg"
              alt="Mood Icon2"
              width={20}
              height={20}
            />
          </button>
          <button>
            <Image
              src="/assets/svg's/moods/Mood3.svg"
              alt="Mood Icon3"
              width={20}
              height={20}
            />
          </button>
          <button>
            <Image
              src="/assets/svg's/moods/Mood4.svg"
              alt="Mood Icon4"
              width={20}
              height={20}
            />
          </button>
          <button>
            <Image
              src="/assets/svg's/moods/Mood5.svg"
              alt="Mood Icon5"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">
          Activity
        </p>
        <Dropdown options={options} className="max-h-auto max-w-40" />
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">
          Symptoms
        </p>
        <Dropdown options={[]} />
      </div>
      <div className="flex-row flex pt-4 justify-between items-center w-3/5">
        <p className="font-bold text-senthrap-new-blue-dark text-base">Notes</p>
      </div>
      <div>
        <textarea
          className="focus:outline-none p-5 min-h-80 h-auto min-w-72 bg-senthrap-new-yellow-light border border-senthrap-new-yellow-stroke rounded-md font-medium text-sm placeholder-senthrap-new-blue-dark text-senthrap-new-blue-dark w-full resize-none"
          placeholder="Why do you feel that way?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="border border-senthrap-new-yellow-stroke bg-senthrap-new-yellow-light rounded-2xl mt-4">
        <p className="font-bold text-senthrap-new-blue-dark text-base px-8 py-2">
          Submit
        </p>
      </button>
    </div>
  )
}
