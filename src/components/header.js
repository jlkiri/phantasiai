import React from "react"
import { Link } from "gatsby"
import Toggle from "components/Toggle"

const Header = ({ title, isRoot, rootPath }) => {
  const headerClass =
    "font-extrabold leading-tight inline-block font-mono bg-gradient mb-3 lg:mb-0"

  if (isRoot)
    return (
      <header className="pb-12 items-center justify-between lg:flex">
        <Link to={rootPath}>
          <h1 className={headerClass}>{title}</h1>
        </Link>
        <h3 className="font-serif text-aux font-bold">
          Blog by Kirill Vasiltsov
        </h3>
        <Toggle />
      </header>
    )

  return (
    <header className="pb-8">
      <Link to={rootPath}>
        <h2 className={headerClass}>{title}</h2>
      </Link>
      <Toggle />
    </header>
  )
}

export default Header
