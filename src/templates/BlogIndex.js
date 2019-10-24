import React from "react"
import styled from "@emotion/styled"
import PageLayout from "components/layouts/PageLayout"
import Main from "components/Main"
import PostBriefLayout from "components/layouts/PostBriefLayout"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Bio from "components/Bio"

const LinkBlock = styled.div`
  margin-top: 35px;
`

const StyledRSSLink = styled.a`
  color: orange;
  font-size: 20px;
`

const BlogIndex = ({ data, path }) => {
  const { nodes: posts } = data.allMarkdownRemark
  const { siteMetadata } = data.site

  return (
    <PageLayout blogTitle={siteMetadata.title} path={path}>
      <SEO index />
      <Bio />
      <Main>
        {posts.map(post => (
          <PostBriefLayout
            key={post.id}
            link={post.fields.slug}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            spoiler={post.frontmatter.spoiler}
          />
        ))}
        <LinkBlock>
          <StyledRSSLink
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            rss
          </StyledRSSLink>
        </LinkBlock>
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
