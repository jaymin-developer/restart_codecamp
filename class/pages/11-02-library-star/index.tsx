import { Rate } from "antd"
import { useState } from "react"

export default function LibraryStarPage() {
  const [value, setValue] = useState(3)

  const handleChange = (value) => {
    setValue(value)
  }

  return <Rate onChange={handleChange} value={value} />
}
