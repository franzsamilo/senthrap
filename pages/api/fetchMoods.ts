import type { NextApiRequest, NextApiResponse } from "next"
import getCollection from "./src/utils/getCollection"
import { DocumentData } from "firebase/firestore"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = "mood_logs"
  getCollection(collectionName).then((data: DocumentData) => {
    res.status(200).json({ data: data })
  })
}
