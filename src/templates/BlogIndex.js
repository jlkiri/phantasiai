import React from "react"
import PageLayout from "components/layouts/PageLayout"
import IndexLayout from "components/layouts/IndexLayout"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"

const StyledPostLink = styled(Link)`
  text-decoration: none;
  font-size: 33px;
`

const BlogIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark

  return (
    <PageLayout path={path}>
      <IndexLayout>
        {posts.map(post => (
          <StyledPostLink to={`${post.fields.slug}`}>
            {post.frontmatter.title}
          </StyledPostLink>
        ))}
      </IndexLayout>
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
