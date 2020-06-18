import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Stitch from 'components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--5);
`;

export const postQuery = graphql`
	query MDXQuery($slug: String!) {
		mdx(frontmatter: { slug: { eq: $slug } }) {
			frontmatter {
				title
				date(formatString: "MM/DD/YYYY")
			}
			body
		}
	}
`;

export default ({ data }) => {
	const { title, date } = data.mdx.frontmatter;
	const { body } = data.mdx;

	return (
		<Layout>
			<SEO title={title} />
			<p>
				<Link className="cta-link" to={'/notebook'}>
					&larr; Back to all notes
				</Link>
			</p>
			<Heading className="entry-title">{title}</Heading>
			<h5 className="entry-meta">Last updated on {date}</h5>
			<Stitch />
			<MDXRenderer>{body}</MDXRenderer>
		</Layout>
	);
};
