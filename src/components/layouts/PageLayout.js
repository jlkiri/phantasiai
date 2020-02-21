import React, { useState, useLayoutEffect } from "react"
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

  return (
    <StaticQuery query={titleQuery}>
      {data => {
        return (
          <>
            <CenteredLayout>
              <Header
                currentTheme={window.__theme}
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
