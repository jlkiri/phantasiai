import React, { useState, useLayoutEffect, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Header from "components/header"
import CenteredLayout from "./CenteredLayout"

const titleQuery = graphql`
  query TitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const PageLayout = ({ path, children }) => {
  const [theme, setTheme] = useState(null)

  useLayoutEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => {
      console.log("wfwefkwoefkow")
      setTheme(window.__theme)
    }
  })

  const isRoot = path === "/" || path === "/ru"
  const rootPath = isRoot ? path : path.includes("/ru/") ? "/ru" : "/"

  const clipClass = theme === "dark" ? "expanding-bg--expand" : ""

  return (
    <StaticQuery query={titleQuery}>
      {data => {
        return (
          <>
            <CenteredLayout>
              <Header
                currentTheme={theme}
                title={data.site.siteMetadata.title}
                isRoot={isRoot}
                rootPath={rootPath}
              />
              {children}
            </CenteredLayout>
            <div
              className={`absolute expanding-bg top-0 right-0 ${clipClass}`}
            ></div>
          </>
        )
      }}
    </StaticQuery>
  )
}

export default PageLayout
