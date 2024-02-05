import React from "react"

function AddActivityLog() {
  function dateDisplay() {
    const today = new Date()
    const date = today.toLocaleDateString()
    return (
      <div>
        <h1 className="text-white font-bold text-lg">Date: {date}</h1>
      </div>
    )
  }

  return (
    <div className="mt-3">
      <h1 className="text-white font-extrabold text-2xl">
        What did you do today?
      </h1>
      <div className="mt-3  w-2/3 rounded-xl text-center bg-senthrap-blue-50 ">
        {dateDisplay()}
      </div>
      <textarea
        className="focus:outline-none p-5 min-h-80 h-auto min-w-72 bg-senthrap-blue-10 text-senthrap-blue-50 border-2 border-senthrap-blue-200 rounded-xl mt-3 font-medium text-sm placeholder-white w-full resize-none"
        placeholder="Write here..."
      />
    </div>
  )
}

export default AddActivityLog
