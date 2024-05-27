import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import CurrentDateCalendar from "@/pages/screens/Components/Calendar"
import HomeMoodLogChecker from "@/pages/screens/Components/HomeMoodLogChecker"
import NavigationBar from "@/pages/screens/Components/NavigationBar"
import NewHome from "@/pages/screens/Home/NewHome"
import { useRouter } from "next/router"

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

// Mock the @auth0/nextjs-auth0/client module
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: () => ({ user: { picture: "", name: "" } }),
}))

describe("Calendar Component", () => {
  beforeAll(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(), // Mock the push method
    }))
  })

  test("renders Calendar component without crashing", () => {
    render(<CurrentDateCalendar />)
    expect(
      screen.getByRole("button", { name: "View Entries >" })
    ).toBeInTheDocument()
    expect(screen.getByText("Su")).toBeInTheDocument()
    expect(screen.getByText("Mo")).toBeInTheDocument()
    expect(screen.getByText("Tu")).toBeInTheDocument()
    expect(screen.getByText("We")).toBeInTheDocument()
    expect(screen.getByText("Th")).toBeInTheDocument()
    expect(screen.getByText("Fr")).toBeInTheDocument()
    expect(screen.getByText("Sa")).toBeInTheDocument()
    expect(
      screen.getByText(
        new Date().toDateString().split(" ").slice(1, 2).join(" ") +
          " " +
          new Date().toDateString().split(" ").slice(3, 4).join(" ")
      )
    ).toBeInTheDocument()
    const days = new Date(2000, new Date().getMonth(), 0).getDate()
    for (let i = 1; i <= days; i++) {
      expect(screen.getByText(i)).toBeInTheDocument()
    }
  })

  test("renders Mood Log Checker component without crashing", () => {
    render(<HomeMoodLogChecker />)
    expect(screen.getByText("How are you today?")).toBeInTheDocument()
    expect(screen.getByText("Mood")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon1" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon2" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon3" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon4" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon5" })
    ).toBeInTheDocument()

    expect(screen.getByText("Activity")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("What did you do today?")
    ).toBeInTheDocument()

    expect(screen.getByText("Symptoms")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("What are you feeling?")
    ).toBeInTheDocument()
    expect(screen.getByText("Notes")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Why do you feel that way?")
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })

  test("renders Navigation Bar component without crashing", () => {
    render(<NavigationBar />)
    expect(
      screen.getByRole("button", { name: "Calendar Icon" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Chat Icon" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Add Icon" })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Community Icon" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mood Icon" })
    ).toBeInTheDocument()
  })
})
