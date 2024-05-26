import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Entries from "../pages/screens/Entries/Entries"
import { useFetchEntries } from "../pages/api/src/Hooks/useFetchEntries" // Adjusted to match relative path

jest.mock("../pages/api/src/Hooks/useFetchEntries", () => ({
  useFetchEntries: jest.fn(),
}))

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: () => ({ user: { picture: "", name: "" } }),
}))

jest.mock("../pages/screens/Components/NavigationBar", () => {
  const MockNavigationBar = () => <div>NavigationBar</div>
  MockNavigationBar.displayName = "MockNavigationBar"
  return MockNavigationBar
})

jest.mock("../pages/screens/Components/Entry", () => {
  const MockEntry = ({
    mood,
    activities,
    symptoms,
    notes,
    advice,
    date,
  }: {
    mood: string
    activities: string
    symptoms: string
    notes: string
    advice: string
    date: string
  }) => (
    <div>
      <div>{mood}</div>
      <div>{activities}</div>
      <div>{symptoms}</div>
      <div>{notes}</div>
      <div>{advice}</div>
      <div>{date}</div>
    </div>
  )
  MockEntry.displayName = "MockEntry"
  return MockEntry
})

// Mock the NewHeader component
jest.mock("../pages/screens/Components/NewHeader", () => {
  const MockNewHeader = () => <div>NewHeader</div>
  MockNewHeader.displayName = "MockNewHeader"
  return MockNewHeader
})

describe("Entries component", () => {
  const mockEntries = [
    {
      entry_date: "2024-05-26T00:00:00Z",
      entry_mood: "Happy",
      entry_activity: "Running",
      entry_symptoms: "None",
      entry_content: "Had a great day running.",
      entry_advice: "Keep up the good work!",
    },
    {
      entry_date: "2024-05-27T00:00:00Z",
      entry_mood: "Sad",
      entry_activity: "Reading",
      entry_symptoms: "Headache",
      entry_content: "Felt a bit down today.",
      entry_advice: "Take some rest.",
    },
  ]

  beforeAll(() => {
    ;(useFetchEntries as jest.Mock).mockReturnValue(mockEntries)
  })

  test("renders Entries component without crashing", () => {
    render(<Entries />)

    expect(screen.getByText("NewHeader")).toBeInTheDocument()
    expect(screen.getByText("Entries")).toBeInTheDocument()
    expect(screen.getByText("Happy")).toBeInTheDocument()
    expect(screen.getByText("Running")).toBeInTheDocument()
    expect(screen.getByText("Had a great day running.")).toBeInTheDocument()
    expect(screen.getByText("Keep up the good work!")).toBeInTheDocument()
    expect(screen.getByText("May 26, 2024")).toBeInTheDocument()
    expect(screen.getByText("Sad")).toBeInTheDocument()
    expect(screen.getByText("Reading")).toBeInTheDocument()
    expect(screen.getByText("Felt a bit down today.")).toBeInTheDocument()
    expect(screen.getByText("Take some rest.")).toBeInTheDocument()
    expect(screen.getByText("May 27, 2024")).toBeInTheDocument()
    expect(screen.getByText("NavigationBar")).toBeInTheDocument()
  })
})
