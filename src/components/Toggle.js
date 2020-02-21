import React, { useEffect, useState } from "react"

export default function Toggle({ handleToggle }) {
  const [theme, setTheme] = useState(window.__theme)

  useEffect(() => {
    window.__onThemeChange = newTheme => setTheme(newTheme)
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
