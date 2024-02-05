import React, { useState } from "react"
import OpenAI from "openai"
import { AxiosError } from "axios"

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
        "I need someone to talk to and luckily you are also a friendly mental health doctor.",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const openai = new OpenAI({
    apiKey: "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",
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
    <main className="flex flex-col justify-end items-center h-screen mx-2">
      <div className="chat-container">
        {isLoading && <div>Loading...</div>}
        {conversationHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.role === "user" ? "user-message" : "assistant-message"
            }`}
          >
            <span>{message.name}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <form
        className="my-6 flex items-center justify-center w-screen"
        onSubmit={handleSendMessage}
      >
        <input
          className="w-5/6 mx-2"
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <div className="w-1/6 flex justify-center">
          <button className="mr-2" type="submit">
            Send
          </button>
        </div>
      </form>
    </main>
  )
}

export default Chat
