const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "src/posts"
    })

    actions.createNodeField({
      node,
      name: "slug",
      value: `${relativeFilePath}`
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    query PostSlugQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              language
              tags
            }
          }
        }
      }
    }
  `)

  if (errors) {
    console.error(errors)
    return
  }

  actions.createPage({
    path: "/",
    component: path.resolve(`src/templates/BlogIndex.js`),
    context: { language: "en" }
  })

  const allTags = new Set(
    data.allMarkdownRemark.edges.map(({ node }) => node.frontmatter.tags)
  )

  const flattenedTags = [].concat(...allTags).filter(Boolean)

  for (const tag of flattenedTags) {
    actions.createPage({
      path: `/${tag}`,
      component: path.resolve(`src/templates/TagIndex.js`),
      context: { tag, language: "en" }
    })
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const fullPath = data.site.siteMetadata.siteUrl + node.fields.slug

    actions.createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/Article.js`),
      context: { slug: node.fields.slug, fullPath }
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        templates: path.resolve(__dirname, "src/templates"),
        assets: path.resolve(__dirname, "src/assets")
      }
    }
  })
}
