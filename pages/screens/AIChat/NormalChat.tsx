import React, { SyntheticEvent, useState } from "react"
import OpenAI from "openai"
import Image from "next/image"
import Header from "../Components/Header"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ClipLoader } from "react-spinners"

require("dotenv").config({ path: "../.env.local" })

function Chat() {
  interface Message {
    role: "system" | "user" | "assistant"
    content: string
    name?: string
  }

  const { user } = useUser()
  const { navigateToChatSuccess } = useNavigation()

  const isAxiosError = (error: any): error is import("axios").AxiosError => {
    return (error as import("axios").AxiosError)?.isAxiosError === true
  }

  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "user",
      content: "You are Megatron!",
      //"Hello, I'm in need of someone to talk to, and fortunately, you are also a friendly mental health doctor. I could use some support and guidance right now. Can we chat about how I'm feeling and explore some ways to improve my mental well-being? But just be casual with just like a friend.",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [isEndingSession, setIsEndingSession] = useState(false)

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const summarizeConversation = async (
    conversationHistory: Message[]
  ): Promise<string> => {
    const fullText = conversationHistory.map((msg) => msg.content).join("\n")
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are a helpful mental heath assistant who gives specific and helpful suggestions and also write in paragraph form. Please summarize the following text:\n${fullText}\n\nSummary:`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      n: 1,
    })

    console.log(response.choices[0]?.message?.content?.trim() ?? "")
    return response.choices[0]?.message?.content?.trim() ?? ""
  }
  const endSession = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsEndingSession(true)

    if (!user) {
      console.error("User not authenticated")
      setIsEndingSession(false)
      return
    }

    try {
      const summary = await summarizeConversation(conversationHistory)

      const fetchResponse = await fetch("/api/uploadSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary_content: summary,
          user_id: user.sub,
        }),
      })

      if (fetchResponse.ok) {
        console.log("Summary uploaded successfully")
        console.log(fetchResponse)
        navigateToChatSuccess()
      } else {
        console.error("Failed to upload summary")
      }
    } catch (error) {
      console.error("Error:", (error as Error).message)
    } finally {
      setIsEndingSession(false)
    }
  }

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault()
    setInputMessage("")
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
    <section className="flex flex-col h-screen bg-senthrap-new-white-bg">
      <Header />
      <main className="flex flex-col justify-end items-center overflow-y-auto h-full">
        <div className="chat-container mx-2 py-4 overflow-y-auto">
          <div className="flex justify-center items-center mb-6">
            <div className="text-center">
              {"I'm here for you. Feel free to talk to me."}
            </div>
          </div>
          <div className="flex flex-col">
            {conversationHistory
              .filter((message) => message.role !== "system")
              .map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.role === "user"
                      ? "bg-senthrap-new-blue-light border border-bg-senthrap-new-blue-stroke text-senthrap-new-blue-dark font-medium text-right ml-auto max-w-[80%]"
                      : "bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left max-w-[80%]"
                  } rounded-lg p-2 mb-2`}
                >
                  <span>{message.content}</span>
                </div>
              ))}
            <div className="self-center">
              <ClipLoader
                color={"#ffffff"}
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <button
              onClick={endSession}
              className={`py-3 px-6 rounded-lg mb-2 ${
                isEndingSession ? "bg-gray-300" : "bg-senthrap-yellow-100"
              }`}
              disabled={isEndingSession}
            >
              {isEndingSession ? (
                <ClipLoader
                  color={"#ffffff"}
                  loading={isLoading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "End Session"
              )}
            </button>
          </div>
        </div>
        <form
          className="mb-4 flex items-center justify-center w-screen"
          onSubmit={handleSendMessage}
        >
          <input
            className="text-senthrap-new-blue-dark border border-bg-senthrap-new-white-stroke w-5/6 mx-2 p-4 rounded-lg outline-none"
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="How are you feeling?"
            value={inputMessage}
          />
          <div className="w-1/6 flex justify-center">
            <button className="mr-2" type="submit">
              <Image
                src="/assets/svg's/lets-icons_send-hor.svg"
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
