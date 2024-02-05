import React from "react"
import Header from "../Components/Header"
import Image from "next/image"

function Stats() {
  return (
    <div className="flex flex-col h-screen w-screen bg-senthrap-blue-100">
      <Header />
      <div className="flex flex-col justify-between items-center mt-8">
        <Image
          src="/assets/senthrap-logo-no-bg.png"
          alt="Heart Senthrap"
          width={50}
          height={25}
        />
        <h1 className="font-bold text-4xl text-senthrap-neutral-100">Stats</h1>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-5/6 rounded-xl">
          <h2 className="text-white font-extrabold text-2x">
            What you felt earlier:
          </h2>
          <div className="min-h-10 h-auto">
            <p className="text-white font-normal text-xs">
              I feel awesome xDDDDDD
            </p>
          </div>
        </div>
        <div className="flex flex-col border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 mt-8 mx-8 p-2 w-5/6 rounded-xl">
          <h2 className="text-white font-extrabold text-2x">Mood Count:</h2>
          <div className="flex flex-row justify-between items-center px-4">
            <div className="flex-col flex items-center">
              <Image
                src="/assets/svg's/mood-happy.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
              <p className=" text-senthrap-blue-200 font-bold">12</p>
            </div>
            <div className="flex-col flex items-center">
              <Image
                src="/assets/svg's/mood-neutral.svg"
                alt="Mood Icon"
                width={38}
                height={38}
              />
              <p className="text-senthrap-blue-200 font-bold">12</p>
            </div>
            <div className="flex-col flex items-center">
              <Image
                src="/assets/svg's/mood-sad.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
              <p className="text-senthrap-blue-200 font-bold">12</p>
            </div>
            <div className="flex-col flex items-center">
              <Image
                src="/assets/svg's/mood-angry.svg"
                alt="Mood Icon"
                width={42}
                height={42}
              />
              <p className="text-senthrap-blue-200 font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-8 w-full min-h-64">
          <button className="border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 w-5/12 rounded-xl ml-8 mr-2"></button>
          <button className="border-[5px] border-senthrap-blue-200 bg-senthrap-blue-10 w-5/12 rounded-xl mr-8 ml-2"></button>
        </div>
      </div>
    </div>
  )
}

export default Stats
