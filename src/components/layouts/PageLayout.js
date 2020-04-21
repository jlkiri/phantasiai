import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Header from "components/Header"
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
    <>
      <CenteredLayout>
        <StaticQuery query={titleQuery}>
          {data => {
            return (
              <Header
                title={data.site.siteMetadata.title}
                isRoot={isRoot}
                rootPath={rootPath}
              />
            )
          }}
        </StaticQuery>
        {children}
      </CenteredLayout>
      <div className={`absolute expanding-bg top-0 right-0`}></div>
    </>
  )
}

export default PageLayout
