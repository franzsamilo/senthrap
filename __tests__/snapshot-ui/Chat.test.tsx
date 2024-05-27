import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Chat from "../../pages/screens/AIChat/Chat"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: () => ({ user: { picture: "", name: "" } }),
}))

describe("Chat component", () => {
  beforeAll(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }))
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
})
