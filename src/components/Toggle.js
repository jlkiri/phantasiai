import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import sun from "assets/sun2.svg"
import moon from "assets/moon.svg"

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 63px;
  height: 30px;
  border-radius: 34px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  -webkit-transition: 0.3s;
  transition: 0.3s;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Sun = styled.svg`
  position: absolute;
  left: 4px;
  top: 4px;
  width: 21px;
  height: 21px;
  fill: yellow;
  transform: scale(1.5);
`

const Moon = styled.svg`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 21px;
  height: 21px;
  fill: yellow;
`

const StyledSlider = styled.span`
  position: absolute;
  height: 26px;
  width: 26px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
`

const StyledInput = styled.input`
  :checked + ${StyledSlider} {
    background-color: #2196f3;
    -webkit-transform: translateX(33px);
    -ms-transform: translateX(33px);
    transform: translateX(33px);
  }

  :focus + ${StyledSlider} {
    box-shadow: 0 0 1px #2196f3;
  }
`

export default function Toggle() {
  const [checked, setChecked] = useState(false)
  return (
    <StyledSwitch>
      <Sun viewBox="0 0 32 32">
        <use href={`${sun}#sun`} />
      </Sun>
      <Moon viewBox="0 0 24 24">
        <use href={`${moon}#moon`} />
      </Moon>
      <StyledInput type="checkbox" />
      <StyledSlider />
    </StyledSwitch>
  )
}
