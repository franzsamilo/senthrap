import type { NextApiRequest, NextApiResponse } from "next"
import uploadDocument from "./src/utils/uploadDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key1, key2 } = req.body
    const collectionName = "test"
    const data = {
      key1: key1,
      key2: key2,
    }
    uploadDocument(collectionName, data)

    res.status(200).json({ message: "POST request processed successfully" })
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
