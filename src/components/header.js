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
      <header theme={currentTheme}>
        <Link to={rootPath}>
          <h1>{title}</h1>
        </Link>
        {toggle}
        <div theme={currentTheme}>
          <Link alt="English version" to="/">
            EN
          </Link>
          <Link alt="Russian version" to="/ru">
            RU
          </Link>
        </div>
      </header>
    )

  return (
    <header theme={currentTheme}>
      <Link to={rootPath}>
        <h1>{title}</h1>
      </Link>
      {toggle}
    </header>
  )
}

export default Header
