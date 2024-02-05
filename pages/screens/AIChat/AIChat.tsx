import React, { useState } from "react"
import OpenAI from "openai"
import Image from "next/image"
import Header from "../Components/Header"

require("dotenv").config({ path: "../.env.local" })

function Chat() {
  interface Message {
    role: "system" | "user" | "assistant"
    content: string
    name?: string
  }

  const isAxiosError = (error: any): error is import("axios").AxiosError => {
    return (error as import("axios").AxiosError)?.isAxiosError === true
  }

  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content:
        "Hello, I'm in need of someone to talk to, and fortunately, you are also a friendly mental health doctor. I could use some support and guidance right now. Can we chat about how I'm feeling and explore some ways to improve my mental well-being? But just be casual with just like a friend.",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    const inputMessages = [
      ...conversationHistory.filter(
        (message) => message.role === "system" || message.role === "user"
      ),
      { role: "user", content: inputMessage, name: "user" },
    ]

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: inputMessages.map((message) => ({
          role: message.role as "system" | "user" | "assistant",
          content: message.content,
          name: message.role === "user" ? "user" : "assistant",
        })),
      })

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "user",
          content: inputMessage,
          name: "user",
        },
        {
          role: "assistant",
          content: completion.choices[0]?.message?.content?.trim() ?? "",
          name: "assistant",
        },
      ])

      console.log("Updated Conversation History:", conversationHistory)
    } catch (error) {
      console.error("Error:", (error as Error).message)
      if (isAxiosError(error) && error.response?.status === 429) {
        setTimeout(() => {
          handleSendMessage(event)
        }, 1000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex flex-col h-screen">
      <Header></Header>
      <main className="flex flex-col justify-end items-center bg-senthrap-blue-100 h-full">
        <div className="chat-container mx-2 overflow-y-auto h-[calc(100vh-10rem)] py-4">
          <div className="flex justify-center items-center mb-6">
            <div className="text-center">
              {"I'm here for you. Feel free to talk to me."}
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto">
            {conversationHistory
              .filter((message) => message.role !== "system")
              .map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.role === "user"
                      ? "bg-gray-200 text-right ml-auto max-w-[80%]"
                      : "bg-gray-300 text-left max-w-[80%]"
                  } rounded-lg p-2 mb-2`}
                >
                  <span>{message.content}</span>
                </div>
              ))}
            {isLoading && <div className="self-center">Loading...</div>}
          </div>
        </div>
        <form
          className="mb-4 flex items-center justify-center w-screen"
          onSubmit={handleSendMessage}
        >
          <input
            className="w-5/6 mx-2 bg-senthrap-neutral-100 p-4 rounded-lg outline-none"
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <div className="w-1/6 flex justify-center">
            <button className="mr-2" type="submit">
              <Image
                src="/assets/svg's/material-symbols_send.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
            </button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default Chat
