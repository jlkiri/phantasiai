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
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
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
    component: path.resolve(`src/templates/BlogIndex.js`)
  })

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(node.fields.slug)
    actions.createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/Article.js`),
      context: { slug: node.fields.slug }
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
