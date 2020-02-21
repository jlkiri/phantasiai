import React from "react"

export default function Toggle({ handleToggle }) {
  return (
    <label className="absolute top-right themeSwitch">
      <input type="checkbox" onChange={handleToggle} />
      <div></div>
    </label>
  )
}
