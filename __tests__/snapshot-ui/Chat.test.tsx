import "openai/shims/node"
import React from "react"
import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Chat from "../../pages/screens/AIChat/Chat"
import { useRouter } from "next/router"
import { useUser } from "@auth0/nextjs-auth0/client"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}))

global.fetch = jest.fn().mockResolvedValue({ ok: true })

describe("Chat component", () => {
  const mockUser = {
    name: "John Doe",
    picture: "http://example.com/johndoe.jpg",
    sub: "auth0|123456",
  }

  const OLD_ENV = process.env

  beforeAll(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    })),
      (useUser as jest.Mock).mockImplementation(() => ({
        user: mockUser,
      })),
      (process.env = { ...OLD_ENV }),
      (process.env.NEXT_PUBLIC_OPENAI_API_KEY =
        "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")
  })

  afterAll(() => {
    jest.clearAllMocks(), (process.env = OLD_ENV)
  })

  test("renders Chat component without crashing", () => {
    render(<Chat />)

    expect(
      screen.getByPlaceholderText("How are you feeling?")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Hey there, feel free to talk to me. I'm here for you.")
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "End Session" })
    ).toBeInTheDocument()
  })

  test("does not end session if user is not authenticated", async () => {
    ;(useUser as jest.Mock).mockImplementationOnce(() => ({
      user: null,
    }))

    render(<Chat />)

    fireEvent.click(screen.getByRole("button", { name: "End Session" }))

    await waitFor(() => {
      expect(
        screen.queryByText("Attempting to end session...")
      ).not.toBeInTheDocument()
    })
  })

  test("sends a message and triggers loading state", async () => {
    render(<Chat />)

    const textarea = screen.getByPlaceholderText("How are you feeling?")
    fireEvent.change(textarea, { target: { value: "Hello, Sennie!" } })

    const sendButton = screen.getByRole("button", { name: /send/i })
    fireEvent.click(sendButton)

    await waitFor(
      () => expect(screen.getByTestId("loader")).toBeInTheDocument(),
      { timeout: 5000 }
    )

    await waitFor(
      () => expect(screen.queryByTestId("loader")).not.toBeInTheDocument(),
      { timeout: 5000 }
    )
  })

  test("summarizes conversation when ending session", async () => {
    render(<Chat />)

    fireEvent.change(screen.getByPlaceholderText("How are you feeling?"), {
      target: { value: "Hello, Sennie!" },
    })

    fireEvent.submit(screen.getByRole("button", { name: /send/i }))

    fireEvent.click(screen.getByRole("button", { name: "End Session" }))

    await waitFor(
      () => expect(screen.getByTestId("loader")).toBeInTheDocument(),
      { timeout: 5000 }
    )

    await waitFor(
      () => expect(screen.queryByTestId("loader")).not.toBeInTheDocument(),
      { timeout: 5000 }
    )
  })
})
