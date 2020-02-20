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
                <CenteredLayout>
                  <Header
                    currentTheme={this.state.theme}
                    title={data.site.siteMetadata.title}
                    isRoot={isRoot}
                    rootPath={rootPath}
                  />
                  {this.props.children}
                </CenteredLayout>
              </ThemeContext.Provider>
            )
          )
        }}
      </StaticQuery>
    )
  }
}

export default PageLayout
