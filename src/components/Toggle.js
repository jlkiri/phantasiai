import React, { useEffect, useState } from "react"

export default function Toggle({ handleToggle }) {
  const isNode = typeof window === "undefined"
  const safeTheme = isNode ? "light" : window.__theme
  const [theme, setTheme] = useState(safeTheme)

  useEffect(() => {
    if (!isNode) {
      window.__onThemeChange = newTheme => setTheme(newTheme)
    }
  }, [])

  return (
    <label className="absolute top-right themeSwitch">
      <input
        checked={theme === "dark"}
        type="checkbox"
        onChange={handleToggle}
      />
      <div></div>
    </label>
  )
}
