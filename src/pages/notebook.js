import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Heading = styled.h1`
	color: var(--highlight-color--5);
	font-size: 4.5rem;
	margin: 0;
	text-align: center;
`;

const Notebook = () => {
	const data = useStaticQuery(graphql`
		query NotesQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }) {
				nodes {
					frontmatter {
						slug
						title
						excerpt
						date(formatString: "MM/DD/YYYY")
					}
				}
			}
		}
	`);

	const notes = data.allMdx.nodes;

	return (
		<Layout>
			<Heading>Notebook</Heading>

			{notes.map(({ id, frontmatter: { title, excerpt, slug } }) => (
				<article key={id}>
					<h2>
						<Link style={{ color: 'var(--highlight-color--1' }} to={`/${slug}`}>
							{title}
						</Link>
					</h2>
					<p>{excerpt}</p>
					<Link to={`/${slug}`}>Read more &rarr;</Link>
				</article>
			))}
		</Layout>
	);
};

export default Notebook;
