import React from "react"
import { Link } from "gatsby"

const PostBriefLayout = ({ link, title, spoiler, date }) => {
  return (
    <div className="pb-10">
      <div className="pb-2">
        <Link to={`${link}`}>
          <h2 className="text-link font-header font-black leading-9">
            {title}
          </h2>
        </Link>
        <span className="font-serif font-bold text-sm">{date}</span>
      </div>
      <p className="font-serif">{spoiler}</p>
    </div>
  )
}

export default PostBriefLayout
