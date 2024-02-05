import type { NextApiRequest, NextApiResponse } from "next"

import uploadDocument from "./src/utils/uploadDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { summary_content, user_id } = req.body
    const summary_date_and_time = new Date().toISOString()

    if (!summary_content || !user_id) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const data = {
      summary_content: summary_content,
      summary_date_and_time: summary_date_and_time,
      user_id: user_id,
    }

    try {
      await uploadDocument("conversation_summaries", data)
      res.status(200).json({ message: "Summary uploaded successfully" })
    } catch (error) {
      let errorMessage = "An unknown error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      res
        .status(500)
        .json({ message: "Error uploading summary", error: errorMessage })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
