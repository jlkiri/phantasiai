/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, index, slug, meta, title, lang = "en" }) {
  const {
    site: { siteMetadata }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || siteMetadata.description
  const url = `${siteMetadata.siteUrl}${slug}`

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      {...(title
        ? {
            titleTemplate: `%s — ${siteMetadata.title}`,
            title
          }
        : {
            title: `${siteMetadata.title} — Blog by Kirill Vasiltsov`
          })}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: "og:url",
          content: url
        },
        {
          property: `og:title`,
          content: title || siteMetadata.title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:site`,
          content: siteMetadata.social.twitter
        },
        {
          name: `twitter:image`,
          content: `${url}twitter-card.jpg`
        },
        {
          name: `twitter:image:alt`,
          content: title || siteMetadata.title
        },
        {
          name: "twitter:creator",
          content: siteMetadata.social.twitter
        },
        {
          name: `twitter:title`,
          content: title || siteMetadata.title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    >
      {index && <link rel="canonical" href="https://phantasiai.dev" />}
    </Helmet>
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
  title: "",
  slug: "",
  index: false
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
  index: PropTypes.bool
}

export default SEO
