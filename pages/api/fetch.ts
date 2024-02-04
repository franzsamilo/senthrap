import type { NextApiRequest, NextApiResponse } from "next"
import getCollection from "./src/utils/getCollection"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = "test"
  getCollection(collectionName).then((data) => {
    res.status(200).json({ name: data })
  })
}
