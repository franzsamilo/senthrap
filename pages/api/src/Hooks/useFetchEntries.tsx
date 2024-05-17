import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import entrySchema from "@/constant/schemas/entrySchema"

export const useFetchEntries = () => {
  const { user } = useUser()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/queryEntries?userSub=${user?.sub}`)
        const data = await response.json()
        const sortedData = data.data.sort((a: entrySchema, b: entrySchema) => {
          return (
            new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
          )
        })
        setData(sortedData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [user])

  return data
}
