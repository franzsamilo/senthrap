import { useRouter } from "next/router"

export function useNavigation() {
  const router = useRouter()

  function navigateToHome() {
    router.push("/screens/Home/Home")
  }

  function navigateToChat() {
    router.push("/screens/AIChat/Chat")
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

  return {
    navigateToHome,
    navigateToActivityLog,
    navigateToChat,
    navigateToMoodLog,
    navigateToMoodUploadSuccess,
  }
}
