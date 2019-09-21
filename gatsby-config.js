module.exports = {
  siteMetadata: {
    title: `phantasia[i]`,
    description: `Personal blog by Kirill Vasiltsov`,
    author: `Kirill Vasiltsov`,
    siteUrl: "http://localhost:8000",
    social: {
      twitter: "@jlkiri"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
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
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // CSS class suffix to be used for produced `<pre/>` blocks.
              // Default value is "default", which adds "cm-s-default" class.
              // This class name matches
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
    `gatsby-plugin-emotion`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
