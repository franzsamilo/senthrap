// IMPORTANT, USE THIS FOR YOUR BASIS OF SENDING DATA TO FIREBASE
import { SyntheticEvent, useState } from "react"
import NavigationBar from "../Components/NavigationBar"

export default function YourComponent() {
  const [key1, setKey1] = useState("")
  const [key2, setKey2] = useState("")

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
    <form onSubmit={handleSubmit}>
      <NavigationBar />
      <label>
        Key 1:
        <input
          type="text"
          value={key1}
          onChange={(e) => setKey1(e.target.value)}
        />
      </label>
      <br />
      <label>
        Key 2:
        <input
          type="text"
          value={key2}
          onChange={(e) => setKey2(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}
