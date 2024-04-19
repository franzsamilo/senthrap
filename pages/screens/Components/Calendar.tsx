import React from "react"
import { DayPicker, ClassNames } from "react-day-picker"
import { useRouter } from "next/router"
import useNavigation from "@/pages/api/src/Hooks/Navigation"

export default function CurrentDateCalendar() {
  const currentDate = new Date()
  const modifiers = {
    currentDate: currentDate,
  }
  const modifiersStyles = {
    currentDate: {
      color: "white",
      backgroundColor: "#ffc107",
    },
  }

  const { navigateToEntries } = useNavigation()

  return (
    <div className="mx-auto max-w-max mt-8">
      <button onClick={navigateToEntries}>View Entries &gt;</button>
      <DayPicker
        selected={currentDate}
        styles={{
          caption: { color: "blue" },
        }}
        className="border rounded p-2"
        disableNavigation
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
    </div>
  )
}
