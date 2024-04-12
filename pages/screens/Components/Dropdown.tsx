import DropdownRow from "@/constant/schemas/DropdownRow"
import React, { useState } from "react"
import Select from "react-select"

interface DropdownProps {
  options: DropdownRow[]
  className?: string
}

export default function Dropdown(props: DropdownProps) {
  const { options, className } = props

  const [selected, setSelected] = useState<DropdownRow[]>([])

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
