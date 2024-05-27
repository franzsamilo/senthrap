import type { NextApiRequest, NextApiResponse } from "next"

import uploadDocument from "./src/utils/uploadDocument"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./src/config/firebase";

async function getLatestSummary() {
  const collectionRef = collection(db, 'conversation_summaries');
  const q = query(collectionRef, orderBy('summary_date_and_time', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const latestDoc = querySnapshot.docs[0];
    return latestDoc.data().summary_content;
  }
  return null;
}

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
  } else if (req.method === "GET") {
    try {
      const latestSummaryContent = await getLatestSummary();
      if (latestSummaryContent) {
        res.status(200).json({ summary_content: latestSummaryContent });
      } else {
        res.status(404).json({ message: "No summaries found" });
      }
    } catch (error) {
      console.error("Error retrieving latest summary: ", error);
      res.status(500).json({ message: "Error retrieving latest summary", error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
