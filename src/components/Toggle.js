import React from "react"
import sun from "../assets/sun.svg"
import moon from "../assets/moon.svg"

export default function Toggle({ currentTheme, handleToggle }) {
  return (
    <label className="absolute top-0 right-0" htmlFor="toggle">
      <input
        id="toggle"
        aria-label="Switch between dark and light theme"
        onChange={handleToggle}
        checked={currentTheme === "dark"}
        type="checkbox"
      />
    </label>
  )
}
