import React from "react"
import styled from "@emotion/styled"
import sun from "assets/sun.svg"
import moon from "assets/moon.svg"

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 63px;
  height: 30px;
  border: 1px solid rgba(220, 220, 232, 0.8);
  border-radius: 34px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(36, 36, 46);
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
  right: 5px;
  top: 4px;
  width: 21px;
  height: 21px;
  fill: rgb(232, 216, 67);
  transform: scale(1.5);
`

const Moon = styled.svg`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 21px;
  height: 21px;
  fill: rgb(232, 216, 67);
`

const StyledSlider = styled.span`
  position: absolute;
  height: 26px;
  width: 26px;
  left: 1px;
  bottom: 2px;
  background-color: rgb(220, 220, 232);
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
`

const StyledInput = styled.input`
  :checked + ${StyledSlider} {
    -webkit-transform: translateX(35px);
    -ms-transform: translateX(35px);
    transform: translateX(35px);
  }
  :hover + ${StyledSlider} {
    box-shadow: 0 0 4px 1px rgb(195, 197, 224);
  }
  :active + ${StyledSlider} {
    box-shadow: 0 0 4px 3px rgb(195, 197, 224);
  }
`

export default function Toggle({ currentTheme, handleToggle }) {
  return (
    <StyledSwitch>
      <Moon viewBox="0 0 24 24">
        <use href={`${moon}#moon`} />
      </Moon>
      <Sun viewBox="0 0 32 32">
        <use href={`${sun}#sun`} />
      </Sun>
      <StyledInput
        onChange={handleToggle}
        checked={currentTheme === "dark"}
        type="checkbox"
      />
      <StyledSlider />
    </StyledSwitch>
  )
}
