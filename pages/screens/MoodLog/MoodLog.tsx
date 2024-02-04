import React from "react"
import Header from "../Components/Header"
import Image from "next/image"
import { emojiMap } from "@/constant/enums/emojiMap"

function MoodLog() {
  const [emoji, setEmoji] = React.useState("?")

  function handleEmojiClick(emojiKey: keyof typeof emojiMap) {
    setEmoji(emojiMap[emojiKey])
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-senthrap-blue-100">
      <Header />
      <main></main>
      <div className="flex flex-col items-center justify-between mt-8">
        <h1 className="font-bold text-4xl text-senthrap-neutral-100">
          Mood Log
        </h1>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 py-1 px-5 rounded-xl">
          <p className="text-white font-extrabold text-2xl">
            How do you feel now?
          </p>
          <div className="flex flex-row justify-between items-center mt-4">
            <button onClick={() => handleEmojiClick("happy")}>
              <Image
                src="/assets/svg's/mood-happy.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
            <button onClick={() => handleEmojiClick("neutral")}>
              <Image
                src="/assets/svg's/mood-neutral.svg"
                alt="Mood Icon"
                width={38}
                height={38}
              />
            </button>
            <button onClick={() => handleEmojiClick("sad")}>
              <Image
                src="/assets/svg's/mood-sad.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
            <button onClick={() => handleEmojiClick("angry")}>
              <Image
                src="/assets/svg's/mood-angry.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
          </div>
          <div className="flex flex-row mt-2">
            <p className="text-white font-extrabold text-sm">You are feeling</p>
            <p className="text-senthrap-blue-50 font-extrabold text-sm mx-2">
              {emoji}
            </p>
          </div>
        </div>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-fit rounded-xl">
          <textarea
            className="focus:outline-none p-5 min-h-80 h-auto min-w-72 bg-senthrap-blue-10 text-white text-sm placeholder-white w-full"
            placeholder="Why do you feel that way?"
          />
        </div>
        <div className="mt-8">
          <button className="bg-senthrap-blue-200 text-white font-bold rounded-lg py-2 px-28 mt-6 w-full text-2xl hover:bg-white hover:text-senthrap-blue-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoodLog
