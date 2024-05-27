import type { NextApiRequest, NextApiResponse } from "next"
import deleteDocument from "./src/utils/deleteDocument"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = "test"
  const document = "wthh???"
  deleteDocument(collectionName, document)
}
