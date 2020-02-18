import React from "react"
import { graphql } from "gatsby"
import PageLayout from "components/layouts/PageLayout"
import PostLayout from "components/layouts/PostLayout"
import SEO from "components/seo"

export default function Article({ data, path }) {
  const { frontmatter, fields, html } = data.markdownRemark
  return (
    <PageLayout path={path}>
      <SEO
        title={frontmatter.title}
        lang={frontmatter.language}
        description={frontmatter.spoiler}
        slug={fields.slug}
      />
      <PostLayout
        path={path}
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
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        spoiler
        language
      }
    }
  }
`
