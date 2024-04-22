import React from "react"
import CurrentDateCalendar from "../Components/Calendar"
import HomeMoodLogChecker from "../Components/HomeMoodLogChecker"
import NavigationBar from "../Components/NavigationBar"
import NewHeader from "../Components/NewHeader"

function NewHome() {
  return (
    <div className="bg-senthrap-new-yellow-light">
      <div className=" justify-center items-center flex flex-col mb-8">
        <NewHeader />
        <CurrentDateCalendar />
        <HomeMoodLogChecker />
        <NavigationBar />
      </div>
    </div>
  )
}

export default NewHome
