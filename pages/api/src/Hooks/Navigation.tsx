import { useRouter } from "next/router"

export default function useNavigation() {
  const router = useRouter()

  function navigateToHome() {
    router.push("/screens/Home/Home")
  }

  function navigateToChat() {
    router.push("/screens/AIChat/HomeChat")
  }

  function navigateToMoodLog() {
    router.push("/screens/MoodLog/MoodLog")
  }

  function navigateToActivityLog() {
    router.push("/screens/ActivityLog/ActivityLog")
  }

  function navigateToMoodUploadSuccess() {
    router.push("/screens/MoodLog/MoodUploadSuccess")
  }

  function navigateToStats() {
    router.push("/screens/Stats/Stats")
  }

  return {
    navigateToHome,
    navigateToActivityLog,
    navigateToChat,
    navigateToMoodLog,
    navigateToMoodUploadSuccess,
    navigateToStats,
  }
}
