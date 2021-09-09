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
	],
};
