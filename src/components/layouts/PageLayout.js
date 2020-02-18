import React from "react"
import styled from "@emotion/styled"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import colors from "../../colors"
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
`

export const ThemeContext = React.createContext({ theme: null })

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
    const isRoot = this.props.path === "/" || this.props.path === "/ru"
    const rootPath = isRoot
      ? this.props.path
      : this.props.path.includes("/ru/")
      ? "/ru"
      : "/"
    return (
      <StaticQuery query={titleQuery}>
        {data => {
          return (
            this.state.theme && (
              <ThemeContext.Provider value={{ theme: this.state.theme }}>
                <ThemeWrapper theme={this.state.theme}>
                  <Helmet
                    meta={[
                      {
                        name: "theme-color",
                        content:
                          this.state.theme === "dark"
                            ? `${colors.darkPurpleBg}`
                            : `${colors.lightWhiteBg}`
                      }
                    ]}
                  />
                  <CenteredLayout>
                    <Header
                      currentTheme={this.state.theme}
                      title={data.site.siteMetadata.title}
                      isRoot={isRoot}
                      rootPath={rootPath}
                    />
                    {this.props.children}
                  </CenteredLayout>
                </ThemeWrapper>
              </ThemeContext.Provider>
            )
          )
        }}
      </StaticQuery>
    )
  }
}

export default PageLayout
