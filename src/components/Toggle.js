import React, { useEffect, useState } from "react"

export default function Toggle({ handleToggle }) {
  const isNode = typeof window === "undefined"
  const safeTheme = isNode ? "dark" : window.__theme
  const [theme, setTheme] = useState(safeTheme)

  useEffect(() => {
    if (!isNode) {
      setTheme(window.__theme)
      window.__onThemeChange = newTheme => setTheme(newTheme)
    }
  }, [isNode])

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
