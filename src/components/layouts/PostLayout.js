import React from "react"
import styled from "@emotion/styled"

const StyledMarkdownContent = styled.article`
  font-size: 21px;
  p {
    margin-top: 18px;
  }
`

const StyledHeader = styled.header`
  font-size: 21px;
`

const StyledPost = styled.main`
  margin-top: 51px;
`

const StyledDate = styled.h4`
  font-size: 15px;
  font-weight: normal;
  margin-top: 6px;
`

const StyledTitle = styled.h1`
  font-size: 39px;
`

const PostLayout = ({ title, date, html }) => {
  return (
    <StyledPost>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{date}</StyledDate>
      </StyledHeader>
      <StyledMarkdownContent dangerouslySetInnerHTML={{ __html: html }} />
    </StyledPost>
  )
}

export default PostLayout
