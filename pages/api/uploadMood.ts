import type { NextApiRequest, NextApiResponse } from "next"

import uploadDocument from "./src/utils/uploadDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { mood_log_emoji_value, mood_log_content, user_id } = req.body
    const mood_log_date_and_time = new Date().toISOString()

    if (!mood_log_emoji_value || !mood_log_content || !user_id) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const data = {
      mood_value: mood_log_emoji_value,
      mood_log_content: mood_log_content,
      mood_log_upload_time: mood_log_date_and_time,
      user_id: user_id,
    }

    try {
      await uploadDocument("mood_logs", data)
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
