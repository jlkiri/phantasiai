import React, { useContext } from "react"
import styled from "@emotion/styled"
import profilePic from "../assets/profile-pic.jpg"
import { ThemeContext } from "./layouts/PageLayout"
import colors from "../colors"

const StyledBio = styled.aside`
  margin-top: 51px;
`

const StyledPic = styled.img`
  border-radius: 30%;
  width: 60px;
  height: 60px;
  margin-right: 12px;
  vertical-align: middle;

  @media screen and (min-width: 768px) {
    width: 72px;
    height: 72px;
  }
`

const StyledDescription = styled.p`
  max-width: 243px;
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.3;

  @media screen and (max-width: 320px) {
    max-width: 200px;
  }
`

const StyledExternalLink = styled.a`
  color: ${props =>
    props.theme === "dark" ? `${colors.darkLink}` : `${colors.lightLink}`};

  :hover {
    text-decoration: none;
  }
`

const Bio = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <StyledBio>
      <StyledPic alt="Profile picture" src={profilePic} />
      <StyledDescription>
        {`Personal blog by `}
        <StyledExternalLink
          theme={theme}
          href="https://mobile.twitter.com/maaiiya8"
        >
          Kirill Vasiltsov
        </StyledExternalLink>
        {`. I write about linguistics, programming and web.`}
      </StyledDescription>
    </StyledBio>
  )
}

export default Bio
