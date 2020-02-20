import React from "react"
import { Link } from "gatsby"
import Toggle from "components/Toggle"
import colors from "../colors"

const Header = ({ title, isRoot, rootPath, currentTheme, path }) => {
  const toggle = (
    <Toggle
      currentTheme={currentTheme}
      handleToggle={e =>
        window.__setPreferredTheme(e.target.checked ? "dark" : "light")
      }
    />
  )

  if (isRoot)
    return (
      <header className="pb-4">
        <Link to={rootPath}>
          <h1 className="font-extrabold font-mono font text-2xl">{title}</h1>
        </Link>
        <h3 className="font-serif">Personal blog by Kirill Vasiltsov</h3>
      </header>
    )

  return (
    <header theme={currentTheme}>
      <Link to={rootPath}>
        <h1>{title}</h1>
      </Link>
    </header>
  )
}

export default Header
