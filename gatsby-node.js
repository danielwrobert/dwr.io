const path = require('path');

// Dynamically create Post pages from markdown files.
exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
	const postsQuery = await graphql(`
		query {
			allMdx {
				nodes {
					id
					frontmatter {
						slug
					}
				}
			}
		}
	`);

	if (postsQuery.errors) {
		reporter.panic('unable to create page', postsQuery.errors);
	}

	const posts = postsQuery.data.allMdx.nodes;
	posts.forEach((post) => {
		createPage({
			path: `/${post.frontmatter.slug}`,
			component: require.resolve(`./src/templates/note.js`),
			context: {
				slug: post.frontmatter.slug, // This does not necessarily have to match the `path` above. We can also pass multiple things here.
			},
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `allMdx`) {
		const fileNode = getNode(node.parent);
		let nodeSlug;
		nodeSlug = ensureSlashes(
			path.basename(fileNode.relativePath, path.extname(fileNode.relativePath))
		);
		if (nodeSlug) {
			createNodeField({ node, name: `slug`, value: nodeSlug });
		}
	}
};

function ensureSlashes(slug) {
	if (slug.charAt(0) !== `/`) {
		slug = `/` + slug;
	}

	if (slug.charAt(slug.length - 1) !== `/`) {
		slug = slug + `/`;
	}

	return slug;
}
