import React from "react"
import { DayPicker } from "react-day-picker"

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

  return (
    <div className="mx-auto max-w-max mt-8">
      <button>View Entries &gt;</button>
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
