import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Toggle from "components/Toggle"
import colors from "../colors"

const commonHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const commonH1Style = css`
  font-family: "Roboto Mono", monospace;
  font-weight: 700;
  background: linear-gradient(
    143deg,
    rgba(40, 142, 255, 1) 0%,
    rgba(237, 29, 204, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledIndexHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 51px;
  position: relative;

  h1 {
    font-size: 39px;
    ${commonH1Style}

    @media screen and (max-width: 420px) {
      font-size: 27px;
    }
  }
`

const StyledLanguageSwitch = styled.div`
  position: absolute;
  right: 0;
  bottom: 57px;

  a {
    color: ${props =>
      props.theme === "dark" ? `${colors.darkLink}` : `${colors.lightLink}`};

    :hover {
      text-decoration: none;
    }

    :first-child {
      :after {
        content: "|";
        margin-left: 9px;
      }
      margin-right: 9px;
    }
  }
`

const StyledHeader = styled.header`
  ${commonHeaderStyle}
  margin-top: 36px;
  position: relative;

  h1 {
    font-size: 36px;
    ${commonH1Style}
  }
`

const Header = ({ title, isRoot, rootPath, currentTheme, path }) => {
  const toggle = (
    <Toggle
      currentTheme={currentTheme}
      handleToggle={e =>
        window.__setPreferredTheme(e.target.checked ? "dark" : "light")
      }
    />
  )

  if (isRoot)
    return (
      <StyledIndexHeader theme={currentTheme}>
        <StyledLink to={rootPath}>
          <h1>{title}</h1>
        </StyledLink>
        {toggle}
        <StyledLanguageSwitch theme={currentTheme}>
          <Link alt="English version" to="/">
            EN
          </Link>
          <Link alt="Russian version" to="/ru">
            RU
          </Link>
        </StyledLanguageSwitch>
      </StyledIndexHeader>
    )

  return (
    <StyledHeader theme={currentTheme}>
      <StyledLink to={rootPath}>
        <h1>{title}</h1>
      </StyledLink>
      {toggle}
    </StyledHeader>
  )
}

export default Header
