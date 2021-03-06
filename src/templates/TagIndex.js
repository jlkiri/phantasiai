import React from "react"
import PageLayout from "components/layouts/PageLayout"
import PostBriefLayout from "components/layouts/PostBriefLayout"
import { graphql } from "gatsby"
import Seo from "components/seo"
import Bio from "components/Bio"
import { GlobalCSSLayout } from "components/layouts/GlobalCSSLayout"

const TagIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark
  const { siteMetadata } = data.site

  return (
    <GlobalCSSLayout>
      <PageLayout blogTitle={siteMetadata.title} path={path}>
        <Seo index />
        <main className="pt-10">
          {posts.map(post => (
            <PostBriefLayout
              key={post.id}
              link={post.fields.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              spoiler={post.frontmatter.spoiler}
              tags={post.frontmatter.tags}
            />
          ))}
        </main>
        <Bio />
      </PageLayout>
    </GlobalCSSLayout>
  )
}

export const indexQuery = graphql`
  query TaggedPosts($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] }, language: { eq: "en" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          spoiler
          tags
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default TagIndex
