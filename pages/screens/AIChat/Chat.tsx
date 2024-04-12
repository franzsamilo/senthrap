import React, { useState, useEffect, useRef, SyntheticEvent } from "react"
import OpenAI from "openai"
import Image from "next/image"
import { Message } from "@/constant/types/messages"
import { ClipLoader } from "react-spinners"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useUser } from "@auth0/nextjs-auth0/client"

function Chat() {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const { user } = useUser()
  const { navigateToChatSuccess } = useNavigation()

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

  // This is a loading state for "End Session"
  const [isEndingSession, setIsEndingSession] = useState(false)

  // This engages the system prompt - if you wanna edit the prompt do it here
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

  // This serves as a precaution for not saving conversation
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()

      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  // Summarizing chat logs via "End Session" button
  const summarizeConversation = async (chatLog: Message[]): Promise<string> => {
    const fullText = chatLog.map((msg) => msg.content).join("\n")
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          // This part you can also customize the prompt on how it would summarize
          content: `You are a helpful mental health assistant who gives specific and helpful suggestions and also writes in paragraph form. Please summarize the following text:\n
            ${fullText}\n`,
        },
      ],
      // 0 means more technical; 1 means more creative/free
      temperature: 0.5,
      // limit on how many it will tokens/characters it will read before summarizing
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
      const summary = await summarizeConversation(chatLog)

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

  return (
    <main className="flex flex-col h-screen bg-senthrap-new-white-bg">
      <section className="flex flex-col justify-end items-center h-full">
        <div className="flex flex-col w-full px-2 py-2 overflow-y-auto">
          <Image
            src="/assets/senthrap-logo-no-bg.png"
            alt="SAM PUT SENNIE IMAGE HERE"
            width={32}
            height={32}
            className="rounded-full mb-2 bg-senthrap-new-blue-light"
          />
          <div className="bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%] rounded-lg p-2 mb-2">
            Hey there, feel free to talk to me. I&apos;m here for you.
          </div>
          {chatLog
            .filter((message) => message.role !== "system")
            .map((message, index) => (
              <div key={index}>
                {message.role === "user" ? (
                  <div className="flex flex-col items-end">
                    <Image
                      src={user?.picture || ""}
                      alt={user?.name || ""}
                      width={32}
                      height={32}
                      className="rounded-full mb-2"
                    />
                    <ReactMarkdown
                      className="bg-senthrap-new-blue-light border border-bg-senthrap-new-blue-stroke text-senthrap-new-blue-dark font-medium text-right ml-auto max-w-[80%] rounded-lg p-2 mb-2"
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <Image
                      src="/assets/senthrap-logo-no-bg.png"
                      alt="SAM PUT SENNIE IMAGE HERE"
                      width={32}
                      height={32}
                      className="rounded-full mb-2 bg-senthrap-new-blue-light"
                    />
                    <ReactMarkdown
                      className="bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%] rounded-lg p-2 mb-2"
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
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
        <button
          onClick={endSession}
          className={` ${
            isEndingSession
              ? ""
              : "rounded-lg text-xs py-2 px-4 border border-senthrap-new-blue-dark file:rounded-lg mb-2 font-medium text-senthrap-new-blue-dark bg-senthrap-new-blue-light"
          }`}
          disabled={isEndingSession}
        >
          {isEndingSession ? (
            <ClipLoader
              color={"#000000"}
              loading={isEndingSession}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "End Session"
          )}
        </button>
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
