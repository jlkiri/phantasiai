import React from "react"
import { Link } from "gatsby"
import Toggle from "components/Toggle"

const Header = ({ title, isRoot, rootPath, currentTheme }) => {
  const toggle = (
    <Toggle
      currentTheme={currentTheme}
      handleToggle={e =>
        window.__setPreferredTheme(e.target.checked ? "dark" : "light")
      }
    />
  )

  const headerClass = "font-extrabold inline font-mono bg-gradient"

  if (isRoot)
    return (
      <header className="relative pb-8 items-center justify-between lg:flex">
        <Link to={rootPath}>
          <h1 className={headerClass}>{title}</h1>
        </Link>
        <h3 className="font-serif">Blog by Kirill Vasiltsov</h3>
        {toggle}
      </header>
    )

  return (
    <header className="pb-8">
      <Link to={rootPath}>
        <h2 className={headerClass}>{title}</h2>
      </Link>
      {toggle}
    </header>
  )
}

export default Header
