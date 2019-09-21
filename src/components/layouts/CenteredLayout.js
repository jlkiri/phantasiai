import React from "react"
import styled from "@emotion/styled"

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 51px;
  padding-right: 15px;
  padding-left: 15px;

  @media screen and (min-width: 768px) {
    max-width: 72vw;
  }

  @media screen and (min-width: 1024px) {
    max-width: 52vw;
  }
`

const CenteredLayout = ({ theme, children }) => {
  return <Centered className={theme}>{children}</Centered>
}

export default CenteredLayout
