import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Heading = styled.h1`
	color: var(--highlight-color--3);
	font-size: 4.5rem;
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
			<p>
				<Link to={'/notebook'}>&larr; Back to all notes</Link>
			</p>
			<Heading>{title}</Heading>
			<h5>Last updated on {date}</h5>
			<MDXRenderer>{body}</MDXRenderer>
		</Layout>
	);
};
