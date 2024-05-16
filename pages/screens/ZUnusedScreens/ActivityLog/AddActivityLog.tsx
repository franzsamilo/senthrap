import React, { useState } from "react"
import { activityCategories } from "../../../../constant/enums/activityCategories"
import { useUser } from "@auth0/nextjs-auth0/client"
import useNavigation from "../../../api/src/Hooks/Navigation"

function AddActivityLog() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [description, setDescription] = useState("")
  const { user } = useUser()
  const { navigateToActivityLogUploadSuccess } = useNavigation()

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value)
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const response = await fetch("/api/uploadActivityLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: selectedCategory,
        description: description,
        user_id: user?.sub,
      }),
    })

    if (response.ok) {
      console.log("Activity log uploaded successfully")
      navigateToActivityLogUploadSuccess()
    } else {
      console.error("Error uploading activity log")
    }
  }

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
    <form onSubmit={handleSubmit}>
      <div className="mt-3">
        <h1 className="text-white font-extrabold text-2xl">
          What did you do today?
        </h1>
        <div className="mt-3 w-2/3 rounded-xl text-center bg-senthrap-blue-50">
          {dateDisplay()}
        </div>
        <select
          className="focus:outline-none p-2 min-h-10 h-auto min-w-12 bg-senthrap-blue-10 text-senthrap-blue-50 border-2 border-senthrap-blue-200 rounded-xl mt-3 font-medium text-sm placeholder-white w-full resize-none"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category...</option>
          {Object.values(activityCategories).map((category) => (
            <option key={category} value={category}>
              {category.replace(/-/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}
            </option>
          ))}
        </select>
        <textarea
          className="focus:outline-none p-5 min-h-80 h-auto min-w-72 bg-senthrap-blue-10 text-senthrap-blue-50 border-2 border-senthrap-blue-200 rounded-xl mt-3 font-medium text-sm placeholder-white w-full resize-none"
          placeholder="Write here..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mx-28 mt-4 text-center bg-senthrap-blue-100 hover:bg-senthrap-blue-200 rounded-xl">
        <button
          onClick={handleSubmit}
          className="text-white hover:text-senthrap-blue-10 px-6 py-2 font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddActivityLog
