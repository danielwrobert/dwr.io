import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Stitch from '../components/stitch';
import Button from '../components/button';

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

const Note = ({ data }) => {
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

export default Note;
