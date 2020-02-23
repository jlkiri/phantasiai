import React, { useEffect, useState } from "react"

export default function Toggle() {
  const isNode = typeof window === "undefined"
  const safeTheme = isNode ? "dark" : window.__theme
  const [theme, setTheme] = useState(safeTheme)

  function handleToggle() {
    window.__setPreferredTheme(window.__theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = newTheme => setTheme(newTheme)
  }, [])

  if (isNode) return null

  return (
    <label className="absolute top-right themeSwitch">
      <input
        checked={window.__theme === "dark"}
        type="checkbox"
        onChange={handleToggle}
      />
      <div></div>
    </label>
  )
}
