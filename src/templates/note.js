import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--3);
	font-size: 4.5rem;
	text-align: center;
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
			<h5 style={{ textAlign: 'center', fontStyle: 'italic' }}>Last updated on {date}</h5>
			<Stitch margin="1.5rem auto 4.5rem" />
			<MDXRenderer>{body}</MDXRenderer>
		</Layout>
	);
};
