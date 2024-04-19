import React from "react"
import Image from "next/image"

function NewHeader() {
  return (
    <div className="flex flex-col bg-senthrap-new-white-bg items-center">
      <Image
        src="/assets/senthrap-text-logo.png"
        alt={""}
        width={150}
        height={100}
        className="rounded-lg"
      />
    </div>
  )
}

export default NewHeader
