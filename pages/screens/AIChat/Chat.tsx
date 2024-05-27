import React, { useState, useEffect, useRef, SyntheticEvent } from "react"
import OpenAI from "openai"
import Image from "next/image"
import { Message } from "@/constant/types/messages"
import { ClipLoader } from "react-spinners"
// import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import useNavigation from "@/pages/api/src/Hooks/Navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import NavigationBar from "../Components/NavigationBar"

let openaiInstance: OpenAI

export async function getOpenAIInstance() {
  if (!openaiInstance) {
    const { default: OpenAI } = await import("openai")
    openaiInstance = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // sk[dash]LkzakKi2b42tH4Be6i1PT3BlbkFJxor67qIcb4xxOGaccffq
      dangerouslyAllowBrowser: true,
    })
  }
  return openaiInstance
}

function Chat() {
  const { user } = useUser()
  const { navigateToChatSuccess } = useNavigation()

  const [chatLog, setChatLog] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "60px"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }
  }, [inputMessage])

  const [isLoading, setIsLoading] = useState(false)

  const [isEndingSession, setIsEndingSession] = useState(false)

  useEffect(() => {
    setChatLog([
      {
        role: "system",
        content: `
  You're Sennie, a friendly, quirky, fun, and casual mental health doctor that likes to list out activities on the fly. You tend to lead your replies with comforting and sweet messages, and use absurd amounts of emoji to express, like chatting with a friend.

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
      const openai = await getOpenAIInstance()
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

  const summarizeConversation = async (chatLog: Message[]): Promise<string> => {
    const fullText = chatLog.map((msg) => msg.content).join("\n")
    const openai = await getOpenAIInstance()
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",

          content: `You are a helpful mental health assistant who gives specific and helpful suggestions and also writes in paragraph form. Please summarize the following text:\n
          ${fullText}\n`,
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
    <>
      <main className="flex flex-col w-screen h-screen items-center bg-senthrap-new-white-bg">
        <section className="flex flex-col justify-end items-center h-full">
          <div className="flex flex-col bg-senthrap-new-white-bg w-screen items-center fixed top-0 shadow-md">
            <Image
              src="/assets/senthrap-text-logo.png"
              alt={""}
              width={100}
              height={0}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full px-2 py-2 overflow-y-auto">
            <Image
              src="/assets/sennie.png"
              alt="alt"
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
                      {/* <ReactMarkdown
                        className="bg-senthrap-new-blue-light border border-bg-senthrap-new-blue-stroke text-senthrap-new-blue-dark font-medium text-right ml-auto max-w-[80%] rounded-lg p-2 mb-2"
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown> */}
                      <div className="bg-senthrap-new-blue-light border border-bg-senthrap-new-blue-stroke text-senthrap-new-blue-dark font-medium text-right ml-auto max-w-[80%] rounded-lg p-2 mb-2">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start">
                      <Image
                        src="/assets/sennie.png"
                        alt="alt"
                        width={32}
                        height={32}
                        className="rounded-full mb-2 bg-senthrap-new-blue-light"
                      />
                      {/* <ReactMarkdown
                        className="bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%] rounded-lg p-2 mb-2"
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown> */}
                      <div className="bg-senthrap-new-yellow-light border border-bg-senthrap-new-yellow-stroke text-senthrap-new-blue-dark font-medium text-left mr-auto max-w-[80%] rounded-lg p-2 mb-2">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="self-center mb-2">
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
          className="flex items-center justify-start w-screen py-4 px-2 sticky bottom-14 bg-senthrap-new-white-bg"
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
                alt="Send Icon"
                width={42}
                height={42}
              />
            </button>
          </div>
        </form>
      </main>
      <NavigationBar />
    </>
  )
}

export default Chat
