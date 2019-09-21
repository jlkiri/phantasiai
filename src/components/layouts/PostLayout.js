import React, { useContext } from "react"
import styled from "@emotion/styled"
import Date from "components/Date"
import PostTitle from "components/PostTitle"
import Main from "components/Main"
import { ThemeContext } from "./PageLayout"
import colors from "../../colors"

const StyledMarkdownContent = styled.article`
  font-size: 18px;
  p {
    margin-top: 18px;
    line-height: 1.42857;
  }
  h1 {
    margin: 33px 0;
    font-size: 33px;
  }
  h2 {
    margin: 30px 0;
    font-size: 30px;
  }
  h3 {
    margin: 27px 0;
    font-size: 27px;
  }
  h4 {
    margin: 24px 0;
    font-size: 24px;
  }
  h5 {
    margin: 21px 0;
    font-size: 21px;
  }
  a {
    color: ${props =>
      props.theme === "dark" ? `${colors.darkLink}` : `${colors.lightLink}`};

    :hover {
      text-decoration: none;
    }
  }
`

const StyledHeader = styled.header`
  font-size: 21px;
`

const PostLayout = ({ title, date, html }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <Main>
      <StyledHeader>
        <PostTitle>{title}</PostTitle>
        <Date>{date}</Date>
      </StyledHeader>
      <StyledMarkdownContent
        theme={theme}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Main>
  )
}

export default PostLayout
