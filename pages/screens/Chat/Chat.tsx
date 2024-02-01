// import React from "react"

// function Chat() {
//   return <></>
// }

// export default Chat

import React, { useState } from "react"
import OpenAI from "openai"

function Chat() {
  const [step, setStep] = useState(0)
  const [moodLog, setMoodLog] = useState("")

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const handleOptionClick = (option: string) => {
    // Update the step based on the selected option
    if (option === "needToTalk") {
      setStep(1)
    } else if (option === "needAdvice") {
      setStep(2)
    }
  }

  const handleMoodLogSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setStep(2)
    // Logic to submit the mood log
  }

  const handleEndSession = () => {
    // Logic to end the session
  }

  const handleChatPrompt = async (prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      })
    } catch (error) {
      console.error("Error:", (error as Error).message)
    }
  }

  const handleChat = () => {
    // use prompt of user as the new content of system
    // check how other ppl integrate chatgpt into their AI chat
  }

  switch (step) {
    case 0:
      return (
        <>
          <h1>Welcome to our chat service</h1>
          <button onClick={() => handleOptionClick("needToTalk")}>
            I need to talk to someone.
          </button>
          <button onClick={() => handleOptionClick("needAdvice")}>
            I need some advice.
          </button>
        </>
      )
    case 1:
      return (
        <>
          <form onSubmit={handleMoodLogSubmit}>
            <label htmlFor="mood">
              Before you start, can you share how you&apos;re feeling right now?
            </label>
            <input
              id="mood"
              value={moodLog}
              onChange={(e) => setMoodLog(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )
    case 2:
      return (
        <>
          <p>AI: Greeting and acting as a mental health doctor...</p>
          {/* AI interaction logic */}
          <button onClick={handleEndSession}>End Session</button>
        </>
      )
    default:
      return <p>Something went wrong.</p>
  }
}

export default Chat
