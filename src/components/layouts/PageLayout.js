import React, { useEffect, useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "../../colors"
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

const ThemeWrapper = styled.div`
  min-height: 100vh;
  ${props =>
    props.theme === "light"
      ? `background-color: ${colors.lightWhiteBg};`
      : `background-color: ${colors.darkPurpleBg};`}
  ${props =>
    props.theme === "light"
      ? `color: ${colors.lightBlackTxt};`
      : `color: ${colors.darkWhiteTxt};`}
  transition: 0.3s;

  a {
    color: ${props =>
      props.theme === "dark" ? `rgb(240, 178, 123)` : `rgb(80, 42, 184)`};
    :hover {
      text-decoration: none;
    }
  }
`

class PageLayout extends React.Component {
  state = {
    theme: null
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  render() {
    return (
      <StaticQuery query={titleQuery}>
        {data => {
          return (
            this.state.theme && (
              <ThemeWrapper theme={this.state.theme}>
                <CenteredLayout>
                  <Header
                    currentTheme={this.state.theme}
                    title={data.site.siteMetadata.title}
                    isIndex={this.props.path === "/"}
                  />
                  {this.props.children}
                </CenteredLayout>
              </ThemeWrapper>
            )
          )
        }}
      </StaticQuery>
    )
  }
}

export default PageLayout
