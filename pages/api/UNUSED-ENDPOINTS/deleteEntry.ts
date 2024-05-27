import { NextApiRequest, NextApiResponse } from "next"
import deleteDocument from "../src/utils/deleteDocument"
import { DocumentData } from "firebase/firestore"
import queryDocument from "../src/utils/queryDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: DocumentData[] = []
  const { userSub } = req.query

  const collectionName = "entries"
  const fieldName = "user_id"
  const userId = userSub as string
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "GET") {
    queryDocument(collectionName, fieldName, userId).then((data) => {
      res.status(200).json({ data: data })
    })
  } else if (req.method === "DELETE") {
    const { documentId } = req.query // You need to pass the document ID in the query parameters
    if (!documentId) {
      return res
        .status(400)
        .json({ error: "Bad Request: documentId is required" })
    }
    deleteDocument(collectionName, documentId as string)
      .then(() => {
        res.status(200).json({ message: "Document deleted successfully" })
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Internal Server Error: " + error.message })
      })
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}
