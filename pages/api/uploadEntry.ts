import type { NextApiRequest, NextApiResponse } from "next"

import uploadDocument from "./src/utils/uploadDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      entry_mood,
      entry_content,
      user_id,
      entry_symptoms,
      entry_activity,
      entry_advice,
    } = req.body
    const current_date_and_time = new Date().toISOString()

    if (!entry_mood || !entry_content || !user_id) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const data = {
      entry_date: current_date_and_time,
      entry_activity: entry_activity,
      entry_symptoms: entry_symptoms,
      entry_mood: entry_mood,
      entry_content: entry_content,
      entry_advice: entry_advice,
      user_id: user_id,
    }

    try {
      await uploadDocument("entries", data)
      res.status(200).json({ message: "Mood log uploaded successfully" })
    } catch (error) {
      let errorMessage = "An unknown error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      res
        .status(500)
        .json({ message: "Error uploading mood log", error: errorMessage })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
