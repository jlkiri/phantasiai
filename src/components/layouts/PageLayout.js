import React from "react"
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
  const isRoot = path === "/" || path === "/ru"
  const rootPath = isRoot ? path : path.includes("/ru/") ? "/ru" : "/"

  const safeTheme = typeof window === "undefined" ? "dark" : window.__theme

  return (
    <StaticQuery query={titleQuery}>
      {data => {
        return (
          <>
            <CenteredLayout>
              <Header
                currentTheme={safeTheme}
                title={data.site.siteMetadata.title}
                isRoot={isRoot}
                rootPath={rootPath}
              />
              {children}
            </CenteredLayout>
            <div className={`absolute expanding-bg top-0 right-0`}></div>
          </>
        )
      }}
    </StaticQuery>
  )
}

export default PageLayout
