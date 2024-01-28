export default function Home() {
  return (
    <>
      <p>this is the home page</p>

      <div className="bg-blue-500 flex p-2 hover:invert">
        <a href="/home/activity-log">activity log</a>
      </div>
      <div className="bg-blue-500 flex p-2 hover:invert">
        <a href="/home/chat">chat</a>
      </div>
      <div className="bg-blue-500 flex p-2 hover:invert">
        <a href="/home/mood-log">mood log</a>
      </div>
      <div className="bg-blue-500 flex p-2 hover:invert">
        <a href="/home/stats">stats</a>
      </div>
    </>
  )
}
