import React from "react"
import PageLayout from "components/layouts/PageLayout"
import { graphql, Link } from "gatsby"

const BlogIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark

  return (
    <PageLayout path={path}>
      {posts.map(post => (
        <Link to={`${post.fields.slug}`}>{post.frontmatter.title}</Link>
      ))}
    </PageLayout>
  )
}

export const indexQuery = graphql`
  query PostLinks {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

export default BlogIndex
