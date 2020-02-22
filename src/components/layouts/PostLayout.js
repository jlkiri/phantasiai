import React from "react"
import { Link } from "gatsby"
import Bio from "../Bio"

const getMentionText = mention => {
  if (mention.wmProperty == "like-of") return "liked this"
  if (mention.wmProperty == "repost-of") return "retweeted this"
  if (mention.wmProperty == "in-reply-to") return `replied`
  return ""
}

const getMentionDateAndURL = mention => {
  if (mention.wmProperty == "in-reply-to")
    return <a href={mention.url}> on {`${mention.published}:`}</a>
  return null
}

const Heart = () => <div className="heart inline-block"></div>

const Mentions = ({ mentions }) => {
  const numberOfLikes = mentions.filter(mention => mention.likeOf !== null)
  return (
    <div className="border-dotted border-t-2 border-b-2 border-red-400 pt-4 pb-4">
      <div className="ml-2 p-2">
        <Heart /> <span className="ml-2">{numberOfLikes.length}</span>
      </div>
      <ul>
        {mentions.map(mention => {
          return (
            <li class="flex p-2">
              <img
                className="w-8 h-8 inline-block rounded-full"
                src={mention.author.photo}
              />
              <div className="ml-4 inline-block">
                <a className="author" href={mention.author.url}>
                  {mention.author.name}
                </a>{" "}
                <span>{getMentionText(mention)}</span>
                <span className="ml-1">{getMentionDateAndURL(mention)}</span>
                {mention.content && (
                  <div className="italic">{mention.content.text}</div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
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
