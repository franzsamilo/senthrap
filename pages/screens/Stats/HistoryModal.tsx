import React from "react"
import Modal from "react-modal"
import { IoArrowBackSharp } from "react-icons/io5"

interface HistoryModalProps {
  isOpen: boolean
  closeFunction: () => void
}

export default function HistoryModal(props: HistoryModalProps) {
  const { isOpen, closeFunction } = props

  return (
    <Modal isOpen={isOpen} className="overflow">
      <div className="flex flex-col min-h-screen w-screen bg-senthrap-blue-100 overflow-hidden border-8 border-senthrap-blue-50 p-4">
        <div className="flex flex-row items-center justify-between">
          <button onClick={closeFunction}>
            <IoArrowBackSharp className="w-8 h-8 text-white" />
          </button>
          <h1 className="font-bold text-3xl text-senthrap-neutral-100">
            Mood Log History
          </h1>
          <p className="w-8 h-8"></p>
        </div>
      </div>
    </Modal>
  )
}
