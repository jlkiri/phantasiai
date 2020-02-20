import React, { useContext } from "react"
import { Link } from "gatsby"
import { ThemeContext } from "./PageLayout"

const PostBriefLayout = ({ link, title, spoiler, date }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <section>
      <Link to={`${link}`}>
        <h2>{title}</h2>
      </Link>
      <h4>{date}</h4>
      <p>{spoiler}</p>
    </section>
  )
}

export default PostBriefLayout
