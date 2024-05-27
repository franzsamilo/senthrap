import type { NextApiRequest, NextApiResponse } from "next"
import uploadDocument from "./src/utils/uploadDocument"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { category, description, user_id } = req.body
    const activity_log_date_and_time = new Date().toISOString()

    if (!category || !description || !user_id) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const data = {
      category: category,
      description: description,
      activity_log_upload_time: activity_log_date_and_time,
      user_id: user_id,
    }

    try {
      await uploadDocument("activity_logs", data)
      res.status(200).json({ message: "Activity log uploaded successfully" })
    } catch (error) {
      let errorMessage = "An unknown error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      res
        .status(500)
        .json({ message: "Error uploading activity log", error: errorMessage })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
