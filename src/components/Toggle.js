import React from "react"
import styled from "@emotion/styled"
import sun from "../assets/sun.svg"
import moon from "../assets/moon.svg"
import colors from "../colors"

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 63px;
  height: 30px;
  border: 1px solid ${colors.weakWhite};
  border-radius: 34px;
  cursor: pointer;
  top: 3px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.lightPurpleBg};
  -webkit-transition: 0.3s;
  transition: 0.3s;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Sun = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 21px;
  height: 21px;
`

const Moon = styled.img`
  position: absolute;
  top: 4px;
  left: 5px;
  bottom: 0;
  width: 21px;
  height: 21px;
`

const StyledSlider = styled.span`
  position: absolute;
  height: 26px;
  width: 26px;
  left: 1px;
  bottom: 2px;
  background-color: white;
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
    box-shadow: 0 0 4px 1px ${colors.purpleShadow};
  }
  :active + ${StyledSlider} {
    box-shadow: 0 0 4px 3px ${colors.purpleShadow};
  }
`

const Moonimg = styled.img`
  width: 25px;
  height: 25px;
`

export default function Toggle({ currentTheme, handleToggle }) {
  return (
    <StyledSwitch htmlFor="toggle">
      <Moon src={moon} alt="Moon icon (dark mode)" />
      <Sun src={sun} alt="Sun icon (light mode)" />
      <StyledInput
        id="toggle"
        aria-label="Switch between dark and light mode"
        onChange={handleToggle}
        checked={currentTheme === "dark"}
        type="checkbox"
      />
      <StyledSlider />
    </StyledSwitch>
  )
}
