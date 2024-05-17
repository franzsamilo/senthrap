import React from "react"
import NavigationBar from "../Components/NavigationBar"
import Entry from "../Components/Entry"
import NewHeader from "../Components/NewHeader"
import { useFetchEntries } from "@/pages/api/src/Hooks/useFetchEntries"
import entrySchema from "@/constant/schemas/entrySchema"

export default function Entries() {
  const data = useFetchEntries()

  return (
    <div className="bg-senthrap-new-yellow-light min-h-screen">
      <div className="justify-center items-center flex flex-col mb-8 h-full">
        <NewHeader />
        <h2 className="font-bold text-senthrap-new-blue-dark text-xl py-4">
          Entries
        </h2>
        <div className="items-center w-full justify-center">
          {data.map((entry: entrySchema, index) => {
            const date = new Date(entry.entry_date)
            const day = date.getDate()
            const month = date.toLocaleString("default", { month: "long" })
            const year = date.getFullYear()
            const formattedDate = `${month} ${day}, ${year}`

            return (
              <div key={index}>
                <Entry
                  mood={entry.entry_mood}
                  activities={entry.entry_activity}
                  symptoms={entry.entry_symptoms}
                  notes={entry.entry_content}
                  advice={entry.entry_advice}
                  date={formattedDate}
                />
              </div>
            )
          })}
        </div>
      </div>
      <NavigationBar />
    </div>
  )
}
