import React from "react"
import styled from "@emotion/styled"

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 85vw;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 768px) {
    max-width: 70vw;
  }

  @media screen and (min-width: 1024px) {
    max-width: 50vw;
  }
`

const CenteredLayout = ({ theme, children }) => {
  return <Centered className={theme}>{children}</Centered>
}

export default CenteredLayout
