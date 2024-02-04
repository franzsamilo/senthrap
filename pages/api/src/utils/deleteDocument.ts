import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

export default async function deleteDocument(
  collectionName: string,
  documentId: string
) {
  try {
    const documentRef = doc(db, collectionName, documentId)
    await deleteDoc(documentRef)
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error deleting document: ", error)
  }
}
