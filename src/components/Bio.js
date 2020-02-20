import React, { useContext } from "react"
import profilePic from "assets/profile-pic.jpg"
import { ThemeContext } from "./layouts/PageLayout"
import colors from "../colors"

const Bio = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <img alt="Profile picture" src={profilePic} />
      <p>
        {`Personal blog by `}
        <a rel="me" theme={theme} href="https://twitter.com/maaiiya8">
          Kirill Vasiltsov
        </a>
        {`. I write about linguistics, programming and web.`}
      </p>
    </div>
  )
}

export default Bio
