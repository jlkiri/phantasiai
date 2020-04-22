import React from "react"
import { Link } from "gatsby"

const Tag = ({ text }) => (
  <div className="py-1 px-2 ml-2 first:m-0 text-white bg-tag rounded-lg text-xs inline-block">
    <Link to={text}>{text}</Link>
  </div>
)

const PostBriefLayout = ({ link, title, spoiler, date, tags }) => {
  return (
    <div className="brief-background shadow-lg rounded-md border-transparent pl-5 pb-5 pt-10 pr-5 mb-10">
      <div className="pb-4">
        <Link to={`${link}`}>
          <h2 className="pb-2 font-header font-black leading-tight">{title}</h2>
        </Link>
        <span className=" font-mono font-bold text-sm">{date}</span>
      </div>
      <p className="pb-4 font-sans">{spoiler}</p>
      <div className="flex justify-end">
        {tags.map(tag => (
          <Tag text={tag} />
        ))}
      </div>
    </div>
  )
}

export default PostBriefLayout
