import React, { SyntheticEvent } from "react"
import Header from "../Components/Header"
import Image from "next/image"
import { moodMap } from "@/constant/enums/moodMap"
import { useUser } from "@auth0/nextjs-auth0/client"
import useNavigation from "../../api/src/Hooks/Navigation"

function MoodLog() {
  const [emoji, setEmoji] = React.useState("?")
  const [content, setContent] = React.useState("")
  const { user } = useUser()
  const { navigateToMoodUploadSuccess } = useNavigation()

  function handleEmojiClick(emojiKey: keyof typeof moodMap) {
    setEmoji(moodMap[emojiKey])
  }

  function moodToEmoji(mood: string) {
    if (mood === "happy") {
      return "happy"
    } else if (mood === "neutral") {
      return "im ok"
    } else if (mood === "sad") {
      return "sad"
    } else if (mood === "angry") {
      return "angry"
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    if (!user) {
      console.error("User not authenticated")
      return
    }

    const response = await fetch("/api/uploadMood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood_log_emoji_value: emoji,
        mood_log_content: content,
        user_id: user.sub,
      }),
    })

    if (response.ok) {
      console.log("Mood log uploaded successfully")
      navigateToMoodUploadSuccess()
    } else {
      console.error("Failed to upload mood log")
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-senthrap-blue-100">
      <Header />
      <div className="flex flex-col items-center justify-between mt-8">
        <Image
          src="/assets/senthrap-logo-no-bg.png"
          alt="Heart Senthrap"
          width={50}
          height={25}
        />
        <h1 className="font-bold text-4xl text-senthrap-neutral-100">
          Mood Log
        </h1>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 py-1 px-5 rounded-xl">
          <p className="text-white font-extrabold text-2xl">
            How do you feel now?
          </p>
          <div className="flex flex-row justify-between items-center mt-4">
            <button onClick={() => handleEmojiClick("HAPPY")}>
              <Image
                src="/assets/svg's/mood-happy.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
            <button onClick={() => handleEmojiClick("NEUTRAL")}>
              <Image
                src="/assets/svg's/mood-neutral.svg"
                alt="Mood Icon"
                width={38}
                height={38}
              />
            </button>
            <button onClick={() => handleEmojiClick("SAD")}>
              <Image
                src="/assets/svg's/mood-sad.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
            <button onClick={() => handleEmojiClick("ANGRY")}>
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
            <p className="text-senthrap-blue-50 font-extrabold text-sm ml-1">
              {moodToEmoji(emoji) ? moodToEmoji(emoji) : "..."}
            </p>
          </div>
        </div>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-fit rounded-xl">
          <textarea
            className="focus:outline-none p-5 min-h-80 h-auto min-w-72 bg-senthrap-blue-10 text-senthrap-blue-50 font-medium text-sm placeholder-white w-full"
            placeholder="Why do you feel that way?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="bg-senthrap-blue-200 text-white font-bold rounded-lg py-2 px-28 mt-6 w-full text-2xl hover:bg-white hover:text-senthrap-blue-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MoodLog
