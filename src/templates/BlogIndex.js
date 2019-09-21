import React from "react"
import PageLayout from "components/layouts/PageLayout"
import Main from "components/Main"
import PostBriefLayout from "components/layouts/PostBriefLayout"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Bio from "components/Bio"

const BlogIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark
  const { siteMetadata } = data.site

  return (
    <PageLayout blogTitle={siteMetadata.title} path={path}>
      <SEO />
      <Bio />
      <Main>
        {posts.map(post => (
          <PostBriefLayout
            link={post.fields.slug}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            spoiler={post.frontmatter.spoiler}
          />
        ))}
      </Main>
    </PageLayout>
  )
}

export const indexQuery = graphql`
  query PostLinks($language: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: $language } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          spoiler
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

export default BlogIndex
