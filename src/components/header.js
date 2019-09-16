import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Toggle from "components/Toggle"

const commonHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`

const StyledIndexHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 51px;

  h1 {
    font-size: 39px;
  }
`

const StyledHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 36px;

  h1 {
    font-size: 36px;
  }
`

const Header = ({ title, currentTheme, isIndex }) => {
  if (isIndex)
    return (
      <StyledIndexHeader>
        <Toggle
          currentTheme={currentTheme}
          handleToggle={e =>
            window.__setPreferredTheme(e.target.checked ? "dark" : "light")
          }
        />
        <Link to="/">
          <h1>{title}</h1>
        </Link>
      </StyledIndexHeader>
    )
  return (
    <StyledHeader>
      <Toggle
        currentTheme={currentTheme}
        handleToggle={e =>
          window.__setPreferredTheme(e.target.checked ? "dark" : "light")
        }
      />
      <Link to="/">
        <h1>{title}</h1>
      </Link>
    </StyledHeader>
  )
}

export default Header
