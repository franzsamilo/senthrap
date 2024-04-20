import type { NextApiRequest, NextApiResponse } from "next"
import queryDocument from "./src/utils/queryDocument"
import { DocumentData } from "firebase/firestore"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: DocumentData[] = []
  if (req.method === "GET") {
    const { userSub } = req.query

    const collectionName = "entries"
    const fieldName = "user_id"
    const userId = userSub as string
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" })
    }
    queryDocument(collectionName, fieldName, userId).then((data) => {
      res.status(200).json({ data: data })
    })
  }
}
