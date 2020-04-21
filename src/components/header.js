import React from "react"
import { Link } from "gatsby"
import Toggle from "components/Toggle"

const H1 = ({ children }) => (
  <h1 className="font-extrabold inline-block font-mono bg-gradient mb-0 pt-4 pb-4">
    {children}
  </h1>
)

const Header = ({ title, isRoot, rootPath }) => {
  if (isRoot)
    return (
      <header>
        <Link to={rootPath}>
          <H1>{title}</H1>
        </Link>
        <h2 className="pt-2 pb-2 font-serif text-auxbg font-bold">
          Blog by Kirill Vasiltsov
        </h2>
        <Toggle />
      </header>
    )

  return (
    <header>
      <Link to={rootPath}>
        <H1>{title}</H1>
      </Link>
      <Toggle />
    </header>
  )
}

export default Header
