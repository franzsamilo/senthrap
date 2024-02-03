import { DocumentData, collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"

export default async function getCollection(path: string) {
  const collectionRef = collection(db, path)
  let data: DocumentData[] = []

  try {
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
  return data
}
