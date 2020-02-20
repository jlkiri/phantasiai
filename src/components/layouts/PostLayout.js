import React, { useContext } from "react"
import { ThemeContext } from "./PageLayout"
import colors from "../../colors"

const PostLayout = ({ title, date, html }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <main>
      <div>
        <h1>{title}</h1>
        <span>{date}</span>
      </div>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}

export default PostLayout
