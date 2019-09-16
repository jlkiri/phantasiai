import React from "react"
import { graphql } from "gatsby"
import PageLayout from "components/layouts/PageLayout"
import PostLayout from "components/layouts/PostLayout"

export default function Article({ data, path }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <PageLayout path={path}>
      <PostLayout
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
      ></PostLayout>
    </PageLayout>
  )
}

export const postQuery = graphql`
  query PostInfo($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
