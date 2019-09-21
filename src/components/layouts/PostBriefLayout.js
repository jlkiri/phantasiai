import React, { useContext } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Date from "components/Date"
import { ThemeContext } from "./PageLayout"
import colors from "../../colors"

const PostBrief = styled.section`
  :not(:first-child) {
    margin-top: 42px;
  }
`

const StyledPostLink = styled(Link)`
  text-decoration: none;
  font-family: "Montserrat";
  color: ${props =>
    props.theme === "dark" ? `${colors.darkLink}` : `${colors.lightLink}`};

  h2 {
    font-size: 27px;
    font-weight: 600;
  }
`

const StyledSpoiler = styled.p`
  font-size: 18px;
  margin-top: 12px;
`

const PostBriefLayout = ({ link, title, spoiler, date }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <PostBrief>
      <StyledPostLink theme={theme} to={`${link}`}>
        <h2>{title}</h2>
      </StyledPostLink>
      <Date>{date}</Date>
      <StyledSpoiler>{spoiler}</StyledSpoiler>
    </PostBrief>
  )
}

export default PostBriefLayout
