require("dotenv").config({
  path: `.env`
})

module.exports = {
  siteMetadata: {
    title: `phantasia[i]`,
    description: `Personal blog by Kirill Vasiltsov`,
    author: `Kirill Vasiltsov`,
    siteUrl: "https://phantasiai.dev/",
    social: {
      twitter: "@jlkiri",
      qiita: "https://qiita.com/jlkiri",
      github: "https://github.com/jlkiri"
    }
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 735
            }
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-plugin-feed`,
            options: {
              query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
              feeds: [
                {
                  serialize: ({ query: { site, allMarkdownRemark } }) => {
                    return allMarkdownRemark.edges.map(edge => {
                      const siteUrl = site.siteMetadata.siteUrl
                      const postText = `
                        <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at phantasiai.dev. You can read it online by <a href="${siteUrl +
                          edge.node.fields.slug}">clicking here</a>.)</div>
                      `
                      let html = edge.node.html
                      // Hacky workaround copypasted from solution for https://github.com/gaearon/overreacted.io/issues/65
                      html = html
                        .replace(/href="\//g, `href="${siteUrl}/`)
                        .replace(/src="\//g, `src="${siteUrl}/`)
                        .replace(/"\/static\//g, `"${siteUrl}/static/`)
                        .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                      return Object.assign({}, edge.node.frontmatter, {
                        description: edge.node.frontmatter.spoiler,
                        date: edge.node.frontmatter.date,
                        url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                        custom_elements: [
                          { "content:encoded": html + postText }
                        ]
                      })
                    })
                  },
                  query: `
                    {
                      allMarkdownRemark(
                        limit: 1000,
                        sort: { order: DESC, fields: [frontmatter___date] },
                        filter: { frontmatter: { language: { eq: "en" } } }
                      ) {
                        edges {
                          node {
                            excerpt(pruneLength: 250)
                            html
                            fields { slug }
                            frontmatter {
                              title
                              date
                              spoiler
                            }
                          }
                        }
                      }
                    }
                  `,
                  output: "/rss.xml",
                  title: "Kirill Vasiltsov's Phantasiai Blog RSS Feed"
                }
              ]
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `phantasia[i]`,
        short_name: `phantasia`,
        start_url: `/`,
        display: `browser`,
        icon: `src/assets/icon.png`,
        legacy: false
      }
    },
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: `phantasiai.dev`, // webmention.io username
        identity: {
          // you need to specify at least one of the identities
          // to be able to log in webmention.io
          github: "jlkiri",
          twitter: "jlkiri" // no @
        },
        mentions: true,
        domain: `phantasiai.dev`,
        fetchLimit: 10000, // number of webmentions to fetch
        token: process.env.WEBMENTIONS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop: false,
        tailwind: true,
        ignore: ["src/components/layouts/themes/"]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
