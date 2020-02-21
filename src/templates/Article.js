import React from "react"
import { graphql } from "gatsby"
import PageLayout from "components/layouts/PageLayout"
import PostLayout from "components/layouts/PostLayout"
import SEO from "components/seo"
import { GlobalCSSLayout } from "components/layouts/GlobalCSSLayout"

export default function Article({ data, path }) {
  const { frontmatter, fields, html } = data.markdownRemark
  const { nodes } = data.allWebMentionEntry
  return (
    <GlobalCSSLayout>
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
          mentions={nodes}
        ></PostLayout>
      </PageLayout>
    </GlobalCSSLayout>
  )
}

export const postQuery = graphql`
  query PostInfo($slug: String!, $fullPath: String!) {
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
    allWebMentionEntry(filter: { wmTarget: { eq: $fullPath } }) {
      nodes {
        author {
          type
          name
          photo
          url
        }
        content {
          text
        }
        url
        type
        likeOf
        wmId
        wmTarget
        wmSource
        wmProperty
      }
    }
  }
`
