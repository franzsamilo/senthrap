// IMPORTANT, USE THIS FOR YOUR BASIS OF SENDING DATA TO FIREBASE
import React from "react"
import { SyntheticEvent, useState } from "react"
import Dropdown from "../Components/Dropdown"
import CurrentDateCalendar from "../Components/Calendar"
import HomeMoodLogChecker from "../Components/HomeMoodLogChecker"

export default function YourComponent() {
  const [key1, setKey1] = useState("")
  const [key2, setKey2] = useState("")

  const options = [
    { value: "React", label: "React" },
    { value: "Vue", label: "Vue" },
    { value: "Angular", label: "Angular" },
    { value: "Java", label: "Java" },
  ]

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key1, key2 }),
    })

    if (response.ok) {
      // Handle success
      console.log("Data sent successfully")
    } else {
      // Handle error
      console.error("Failed to send data")
    }
  }

  return (
    <div>
      <HomeMoodLogChecker />
      <CurrentDateCalendar />
      <Dropdown options={options} />
    </div>
  )
}
