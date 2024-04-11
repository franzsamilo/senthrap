import React, { useState, useEffect, useRef } from "react"
import OpenAI from "openai"
import Image from "next/image"
import { Message } from "@/constant/types/messages"
import { ClipLoader } from "react-spinners"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Chat() {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const [chatLog, setChatLog] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")

  // This is for the auto-resizing function of the textarea input
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "60px"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }
  }, [inputMessage])

  const [isLoading, setIsLoading] = useState(false)

  // This engages the system prompt
  useEffect(() => {
    setChatLog([
      {
        role: "system",
        content: `
  You're Sennie, a friendly and casual mental health doctor. You tend to keep your chat short and sweet, like chatting with a friend.

  By the way, here's a handy tip for clarity and readability: use Markdown formatting! It's a breeze to follow and makes our chats even better but don't overuse them!

  Feel free to use the following Markdown syntax:

  *Italic*
  **Bold**
  > Blockquote
  * Unordered List
  1. Numbered List
  --- Horizontal Rule
  "`,
      },
    ])
  }, [])

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setInputMessage("")

    try {
      const openaiCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        temperature: 0.75,
        messages: [
          ...chatLog.map((message) => ({
            role: message.role as "user" | "assistant" | "system",
            content: message.content,
          })),
          {
            role: "user",
            content: inputMessage,
          },
        ],
      })

      const assistantMessage =
        openaiCompletion.choices[0]?.message?.content?.trim()

      setChatLog((previousChatLog) => [
        ...previousChatLog,
        {
          role: "user",
          content: inputMessage,
        },
        {
          role: "assistant",
          content: assistantMessage ?? "",
        },
      ])
    } catch (error) {
      console.error("Error:", (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col h-screen bg-senthrap-new-white-bg">
      <section className="flex flex-col justify-end items-center h-full">
        <div className="flex flex-col w-full px-2 py-2 overflow-y-auto">
          <div className="bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%] rounded-lg p-2 mb-2">
            Hey there, feel free to talk to me. I&apos;m here for you.
          </div>
          {chatLog
            .filter((message) => message.role !== "system")
            .map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.role === "user"
                    ? "bg-senthrap-new-blue-light border border-bg-senthrap-new-blue-stroke text-senthrap-new-blue-dark font-medium text-right ml-auto max-w-[80%]"
                    : "bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%]"
                } rounded-lg p-2 mb-2`}
              >
                <ReactMarkdown
                  className="text-senthrap-new-blue-dark prose"
                  remarkPlugins={[remarkGfm]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
        </div>
        <div className="self-center">
          <ClipLoader
            color={"#2E2E7D"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </section>
      <form
        className="flex items-center justify-start w-screen py-4 px-2 sticky bottom-0 bg-senthrap-new-white-bg"
        onSubmit={handleSendMessage}
      >
        <textarea
          className="focus:border-senthrap-new-blue-dark w-5/6 font-medium overflow-hidden text-senthrap-new-blue-dark border border-senthrap-new-blue-stroke mr-2 p-4 rounded-lg focus:outline-none"
          onChange={(event) => setInputMessage(event.target.value)}
          ref={textAreaRef}
          placeholder="How are you feeling?"
          value={inputMessage}
        />
        <div className="w-1/6 flex justify-center">
          <button className="p-2" type="submit">
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
  )
}

export default Chat
