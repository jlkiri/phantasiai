import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Date from "components/Date"
import PostTitle from "components/PostTitle"

const PostBrief = styled.section`
  :not(:first-child) {
    margin-top: 42px;
  }
`

const StyledPostLink = styled(Link)`
  text-decoration: none;

  h2 {
    font-size: 27px;
  }
`

const StyledSpoiler = styled.p`
  font-size: 18px;
  margin-top: 12px;
`

const PostBriefLayout = ({ link, title, spoiler, date }) => {
  return (
    <PostBrief>
      <StyledPostLink to={`${link}`}>
        <h2>{title}</h2>
      </StyledPostLink>
      <Date>{date}</Date>
      <StyledSpoiler>{spoiler}</StyledSpoiler>
    </PostBrief>
  )
}

export default PostBriefLayout
