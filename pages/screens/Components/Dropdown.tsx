import DropdownRow from "@/constant/schemas/DropdownRow"
import React, { useState } from "react"
import Select from "react-select"

interface DropdownProps {
  selected: DropdownRow[]
  setSelected: (selected: DropdownRow[]) => void
  options: DropdownRow[]
  className?: string
}

export default function Dropdown(props: DropdownProps) {
  const { options, className, selected, setSelected } = props

  const handleChange = (selected: any) => {
    setSelected(selected || [])
  }

  return (
    <>
      <form>
        <Select
          className={className}
          options={options}
          onChange={handleChange}
          isOptionDisabled={() => selected.length >= 3}
          isMulti={true}
          value={selected}
        />
      </form>
    </>
  )
}
