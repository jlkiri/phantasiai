import React from "react"
import sun from "../assets/sun.svg"
import moon from "../assets/moon.svg"
import colors from "../colors"

export default function Toggle({ currentTheme, handleToggle }) {
  return (
    <label htmlFor="toggle">
      <input
        id="toggle"
        aria-label="Switch between dark and light mode"
        onChange={handleToggle}
        checked={currentTheme === "dark"}
        type="checkbox"
      />
      <span />
    </label>
  )
}
