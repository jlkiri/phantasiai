import React from "react"
import { Link } from "gatsby"
import Bio from "../Bio"

const PostLayout = ({ title, path, date, html }) => {
  const rootPath = path.includes("/ru/") ? "/ru" : "/"
  return (
    <>
      <main className="pb-4">
        <div className="pb-8">
          <h1 className="font-serif pb-4">{title}</h1>
          <span className="font-bold font-serif">{date}</span>
        </div>
        <article
          className="font-serif text-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Link className="mb-8" to={rootPath}>
          {"<<< Back to top page"}
        </Link>
      </main>
      <Bio />
    </>
  )
}

export default PostLayout
