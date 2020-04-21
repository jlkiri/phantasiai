import React from "react"
import { Link } from "gatsby"
import Toggle from "components/Toggle"

const H1 = ({ children }) => (
  <h1 className="lg:text-5xl font-extrabold inline-block font-mono bg-gradient mb-0 pt-4 pb-4">
    {children}
  </h1>
)

const FancyExternalLink = ({ children, href }) => {
  return (
    <a href={href} className="fancy-link">
      {children}
    </a>
  )
}

const Header = ({ title, isRoot, rootPath }) => {
  if (isRoot)
    return (
      <header>
        <Link to={rootPath}>
          <H1>{title}</H1>
        </Link>
        <h2 className="lg:text-3xl pt-2 pb-2 font-serif text-auxtext font-bold">
          Blog by{" "}
          <FancyExternalLink href="https://twitter.com/maaiiya8">
            Kirill Vasiltsov
          </FancyExternalLink>
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
