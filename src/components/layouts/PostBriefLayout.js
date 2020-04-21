import React from "react"
import { Link } from "gatsby"

const PostBriefLayout = ({ link, title, spoiler, date }) => {
  return (
    <div className="brief-background shadow-lg rounded-md border-transparent pl-5 pb-10 pt-10 pr-10 mb-10">
      <div className="pb-4">
        <Link to={`${link}`}>
          <h2 className="pb-2 font-header font-black leading-tight">{title}</h2>
        </Link>
        <span className=" font-mono font-bold text-sm">{date}</span>
      </div>
      <p className="font-sans">{spoiler}</p>
    </div>
  )
}

export default PostBriefLayout
