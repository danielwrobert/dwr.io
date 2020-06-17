import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--5);
`;

const Date = styled.h5`
	font-style: italic;
	margin-bottom: 1rem;
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
			<Heading className="entry-title">Notebook</Heading>
			<Stitch />
			{notes.map(({ id, frontmatter: { title, excerpt, slug, date } }) => (
				<article className="note" key={id}>
					<h2>
						<Link
							style={{ color: 'var(--highlight-color--1' }}
							to={`/notebook/${slug}`}
						>
							{title}
						</Link>
					</h2>
					<Date>{date}</Date>
					<p>{excerpt}</p>
					<Link to={`/notebook/${slug}`}>Read more &rarr;</Link>
				</article>
			))}
		</Layout>
	);
};

export default Notebook;
