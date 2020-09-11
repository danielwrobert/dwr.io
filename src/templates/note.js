import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--5);
`;

const Divider = styled.hr`
	margin: 2.5rem 0;
	opacity: 0.5;
`;

export const postQuery = graphql`
	query MDXQuery($slug: String!) {
		mdx(frontmatter: { slug: { eq: $slug } }) {
			frontmatter {
				title
				date(formatString: "MM/DD/YYYY")
				updated(formatString: "MM/DD/YYYY")
			}
			body
		}
	}
`;

export default ({ data }) => {
	const { title, date, updated } = data.mdx.frontmatter;
	const { body } = data.mdx;

	return (
		<Layout>
			<SEO title={title} />
			<Heading className="entry-title">{title}</Heading>
			<h5 className="entry-meta">Last updated on {updated ? updated : date}</h5>
			<Stitch />
			<MDXRenderer>{body}</MDXRenderer>
			<Divider />
			<p>
				<Link to={'/notebook'}>&larr; Back to all notes</Link>
			</p>
		</Layout>
	);
};
