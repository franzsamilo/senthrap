import { useRouter } from "next/router"

export default function useNavigation() {
  const router = useRouter()

  function navigateToEntries() {
    router.push("/screens/Entries/Entries")
  }

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

  function navigateToChatSuccess() {
    router.push("/screens/AIChat/ChatSuccess")
  }

  function navigateToStats() {
    router.push("/screens/Stats/Stats")
  }

  function navigateToActivityLogUploadSuccess() {
    router.push("/screens/ActivityLog/ActivityLogUploadSuccess")
  }

  function navigateToNewHome() {
    router.push("/screens/Home/NewHome")
  }

  function navigateToEntrySuccess() {
    router.push("/screens/Entries/EntrySuccessPage")
  }

  return {
    navigateToHome,
    navigateToActivityLog,
    navigateToChat,
    navigateToMoodLog,
    navigateToMoodUploadSuccess,
    navigateToChatSuccess,
    navigateToStats,
    navigateToActivityLogUploadSuccess,
    navigateToEntries,
    navigateToNewHome,
    navigateToEntrySuccess,
  }
}
