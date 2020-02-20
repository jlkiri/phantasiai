import React from "react"
import PageLayout from "components/layouts/PageLayout"
import PostBriefLayout from "components/layouts/PostBriefLayout"
import { graphql } from "gatsby"
import SEO from "components/seo"
import Bio from "components/Bio"
import { GlobalCSSLayout } from "components/layouts/GlobalCSSLayout"

const BlogIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark
  const { siteMetadata } = data.site

  return (
    <GlobalCSSLayout>
      <PageLayout blogTitle={siteMetadata.title} path={path}>
        <SEO index />
        <main className="pb-4">
          {posts.map(post => (
            <PostBriefLayout
              key={post.id}
              link={post.fields.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              spoiler={post.frontmatter.spoiler}
            />
          ))}
          <div>
            <a
              className=".text-6xl"
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              rss
            </a>
          </div>
        </main>
        <Bio />
      </PageLayout>
    </GlobalCSSLayout>
  )
}

export const indexQuery = graphql`
  query PostLinks($language: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: $language } } }
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
