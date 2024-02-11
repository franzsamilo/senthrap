import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore"
import { db } from "../config/firebase"

export default async function queryDocument(
  collectionName: string,
  fieldName: string,
  searchValue: string
) {
  let data: DocumentData[] = []
  const collectionRef = collection(db, collectionName)

  const queryParameters = query(
    collectionRef,
    where(fieldName, "==", searchValue)
  )

  const querySnapshot = await getDocs(queryParameters)

  try {
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
  return data
}
