import React from "react"
import { Link } from "gatsby"
import Bio from "../Bio"

const getActionText = mention => {
  if (mention.likeOf) return "liked this"
  return ""
}

const Heart = () => <div className="heart inline-block"></div>

const Mentions = ({ mentions }) => {
  const numberOfLikes = mentions.filter(mention => mention.likeOf !== null)
  return (
    <div className="border-dotted border-t-2 border-b-2 border-red-400 pt-4 pb-4">
      <div className="ml-2 p-2">
        <Heart /> <span className="ml-2">{numberOfLikes.length}</span>
      </div>
      {mentions.map(mention => {
        return (
          <div class="flex p-2 items-center">
            <img className="w-8 h-8 rounded-full" src={mention.author.photo} />
            <div class="ml-4">
              <a className="author" href={mention.author.url}>
                {mention.author.name}
              </a>{" "}
              {getActionText(mention)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const PostLayout = ({ title, path, date, mentions, html }) => {
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
        <Mentions mentions={mentions} />
      </main>
      <Bio />
    </>
  )
}

export default PostLayout
