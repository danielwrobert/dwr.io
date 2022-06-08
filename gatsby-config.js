/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	siteMetadata: {
		title: `dwr.io`,
		description: `My Digital Notebook`,
		siteUrl: `https://dwr.io`,
	},
	plugins: [
		`gatsby-plugin-emotion`,
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `post`,
				path: `${__dirname}/content/notebook`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: ['.mdx', '.md'],
				gatsbyRemarkPlugins: [
					`gatsby-remark-copy-linked-files`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 748,
							linkImagesToOriginal: false,
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-114184967-2',
			},
		},
		{
			resolve: `gatsby-plugin-feed-mdx`,
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
						serialize: ({ query: { site, allMdx } }) => {
							return allMdx.edges.map((edge) => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.excerpt,
									date: edge.node.frontmatter.date,
									url:
										site.siteMetadata.siteUrl +
										'/' +
										edge.node.frontmatter.slug,
									guid:
										site.siteMetadata.siteUrl +
										'/' +
										edge.node.frontmatter.slug,
								});
							});
						},
						query: `
					{
					  allMdx(
						sort: { order: DESC, fields: [frontmatter___date] },
					  ) {
						edges {
						  node {
							frontmatter {
							  title
							  excerpt
							  date
							  slug
							}
						  }
						}
					  }
					}
				  `,
						output: '/rss.xml',
						title: 'DWR.IO',
						// optional configuration to insert feed reference in pages:
						// if `string` is used, it will be used to create RegExp and then test if pathname of
						// current page satisfied this regular expression;
						// if not provided or `undefined`, all pages will have feed reference inserted
						match: '^/notebook/',
					},
				],
			},
		},
	],
};
