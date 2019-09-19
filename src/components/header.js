import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Toggle from "components/Toggle"

const commonHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledIndexHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 51px;

  h1 {
    font-size: 39px;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    background: linear-gradient(
      143deg,
      rgba(155, 146, 236, 1) 0%,
      rgba(240, 178, 123, 1) 51%,
      rgba(208, 146, 198, 1) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`

const StyledHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 36px;

  h1 {
    font-size: 36px;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    background: linear-gradient(
      143deg,
      rgba(102, 86, 250, 1) 0%,
      rgba(123, 237, 240, 1) 51%,
      rgba(237, 29, 204, 1) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`

const Header = ({ title, currentTheme, path }) => {
  const isIndex = path === "/" || path === "/ru"
  console.log(path)
  const toggle = (
    <Toggle
      currentTheme={currentTheme}
      handleToggle={e =>
        window.__setPreferredTheme(e.target.checked ? "dark" : "light")
      }
    />
  )

  console.log(title)

  if (isIndex)
    return (
      <StyledIndexHeader theme={currentTheme}>
        <StyledLink to={path}>
          <h1>{title}</h1>
        </StyledLink>
        {toggle}
      </StyledIndexHeader>
    )

  return (
    <StyledHeader theme={currentTheme}>
      <StyledLink to={path}>
        <h1>{title}</h1>
      </StyledLink>
      {toggle}
    </StyledHeader>
  )
}

export default Header
