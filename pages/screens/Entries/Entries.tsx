import React, { useEffect, useState } from "react"
import NavigationBar from "../Components/NavigationBar"
import { useUser } from "@auth0/nextjs-auth0/client"
import Dropdown from "../Components/Dropdown"
import entrySchema from "@/constant/schemas/entrySchema"
import Entry from "../Components/Entry"
import NewHeader from "../Components/NewHeader"

export default function Entries() {
  const { user } = useUser()

  const userSub = user?.sub
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`/api/queryEntries?userSub=${userSub}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort((a: entrySchema, b: entrySchema) => {
          return (
            new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
          )
        })
        setData(sortedData)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [userSub, data])

  return (
    <div className="bg-senthrap-new-yellow-light">
      <div className=" justify-center items-center flex flex-col mb-8">
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
