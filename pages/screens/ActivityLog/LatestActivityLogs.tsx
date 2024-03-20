import React, { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"

interface ActivityLog {
  activity_log_upload_time: string
  description: string
  category: string
}

function LatestActivityLogs() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const { user } = useUser()

  useEffect(() => {
    fetch(`/api/queryActivities?userSub=${user?.sub}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const sortedData = data.data
          .sort(
            (a: ActivityLog, b: ActivityLog) =>
              new Date(b.activity_log_upload_time).getTime() -
              new Date(a.activity_log_upload_time).getTime()
          )
          .slice(0, 3)
        setActivityLogs(sortedData)
      })
      .catch((error) => console.error("Error:", error))
  }, [user])

  return (
    <div className="flex flex-col bg-white border-4 rounded-lg border-senthrap-blue-200 mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
      {activityLogs.map((log, index) => (
        <div
          key={index}
          className="flex-col flex py-2 justify-between p-2 border-4 border-senthrap-blue-200 m-3 bg-white rounded-lg items-center"
        >
          <div className="border-4 w-full rounded-lg items-center px-4 border-senthrap-blue-200 justify-center flex flex-row">
            <p className="font-bold font-xs">
              {new Date(log.activity_log_upload_time).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="items-center">
              <p className="font-bold mt-2 text-lg">{log.category}</p>
              <p className="font-semibold italic mt-2">{log.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LatestActivityLogs
