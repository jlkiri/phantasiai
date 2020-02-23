import React from "react"

export default class Toggle extends React.Component {
  isNode = typeof window === "undefined"
  safeTheme = this.isNode ? "dark" : window.__theme

  state = {
    theme: this.safeTheme
  }

  handleToggle = () => {
    window.__setPreferredTheme(window.__theme === "light" ? "dark" : "light")
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = newTheme => this.setState({ theme: newTheme })
  }

  render() {
    if (typeof window !== "undefined") {
      return (
        <label className="absolute top-right themeSwitch">
          <input
            checked={window.__theme === "dark"}
            type="checkbox"
            onChange={this.handleToggle.bind(this)}
          />
          <div></div>
        </label>
      )
    }
    return null
  }
}
