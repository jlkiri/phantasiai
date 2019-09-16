import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import normalize from "normalize.css"
import { Global, css } from "@emotion/core"
import Header from "components/Header"
import CenteredLayout from "./CenteredLayout"

const titleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const PageLayout = ({ children, path }) => {
  const { site } = useStaticQuery(titleQuery)
  const [theme, setTheme] = useState(window.__theme)

  useEffect(() => {
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  return (
    <CenteredLayout>
      <Global
        styles={css`
          ${normalize}

          body.dark {
            background-color: rgb(36, 36, 46);
            color: rgba(255, 255, 255, 0.8);
            transition: 0.4s;
          }

          body.light {
            background-color: white;
            color: rgba(0, 0, 0, 0.8);
            transition: 0.4s;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0;
          }
        `}
      />
      <Header
        currentTheme={theme}
        title={site.siteMetadata.title}
        isIndex={path === "/"}
      />
      {children}
    </CenteredLayout>
  )
}

export default PageLayout
