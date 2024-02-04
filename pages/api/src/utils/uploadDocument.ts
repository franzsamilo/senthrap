import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export default async function uploadDocument(
  collectionName: string,
  data: object
) {
  const collectionRef = collection(db, collectionName)

  addDoc(collectionRef, data)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error)
    })
}
