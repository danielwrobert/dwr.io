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
	},
	plugins: [
		`gatsby-plugin-emotion`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `post`,
				path: `${__dirname}/content/notebook`,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: ['.mdx', '.md'],
			},
		},
	],
};
