import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--3);
`;

const Date = styled.h5`
	color: var(--highlight-color--1);
	font-style: italic;
	margin-bottom: 1.5rem;
	text-align: center;
`;

const Divider = styled.hr`
	margin: 4.5rem 0 2.5rem;
	opacity: 0.5;
`;

const Button = styled(Link)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
	display: block;
	font-weight: 700;
	margin: 5.5rem auto 0;
	opacity: 0.8;
	padding: 1rem 1.5rem;
	transition: opacity 0.5s !important;
	width: fit-content;

	&:hover {
		opacity: 1;
	}
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
	const isUpdated = updated ? `Updated on ${updated}` : `Published on ${date}`;

	return (
		<Layout>
			<SEO title={title} />
			<Heading className="entry-title">{title}</Heading>
			<Date>{isUpdated}</Date>
			<Stitch />
			<MDXRenderer>{body}</MDXRenderer>
			<Divider />
			<Button to={'/notebook'} activeClassName="active">
				&larr; Back to all notes
			</Button>
		</Layout>
	);
};
