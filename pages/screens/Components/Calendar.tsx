import React from "react"
import { DayPicker } from "react-day-picker"
import useNavigation from "@/pages/api/src/Hooks/Navigation"

export default function CurrentDateCalendar() {
  const { navigateToEntries } = useNavigation()
  const currentDate = new Date()

  const isSunday = (date: Date) => date.getDay() === 0

  const modifiers = {
    today: currentDate,
    sunday: isSunday,
  }

  const modifiersStyles = {
    today: {
      color: "#FFFAD6",
      backgroundColor: "#2E2E7D",
      borderRadius: "0",
    },
    sunday: {
      color: "#a3976b",
    },
  }

  return (
    <div className="mb-8 mt-2">
      <div className="flex items-center justify-center ml-44 absolute">
        <button
          className="text-lg text-senthrap-new-blue-dark font-bold"
          onClick={navigateToEntries}
        >
          View Entries &gt;
        </button>
      </div>
      <DayPicker
        mode="single"
        selected={currentDate}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="CustomCalendar"
      />

      <style>
        {`
        .CustomCalendar .rdp-button {
          border: none;
          background: none;
          color: #2E2E7D; // Color for weekdays and Saturday
        }
        .CustomCalendar .rdp-button[aria-disabled="true"] {
          color: #2E2E7D; // Color for disabled days
        }
        .CustomCalendar .rdp-button[aria-selected="true"] {
          color: white; // Text color for selected day
        }
        .CustomCalendar .rdp-day_today {
          font-weight: bold;
        }
        .CustomCalendar .rdp-caption_label {
          font-size: 1.25rem;
          color: #2E2E7D;
          font-weight: bold;
        }
        .CustomCalendar .rdp-head_cell {
          color: #2E2E7D;
          font-size: 1.1rem;
        }

        .CustomCalendar .rdp-head_cell:first-of-type {
          color: #a3976b
        }
        
        .CustomCalendar .rdp-day {
          width: 2.5em;
          height: 2.5em;
          line-height: 2.5em;
        }
        .CustomCalendar .rdp-nav_button {
          display: none; // Hide navigation buttons
        }
      `}
      </style>
    </div>
  )
}
