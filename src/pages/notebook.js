import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--3);
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
					id
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
			<Seo title="Digital Notebook" />
			<Heading className="entry-title">Notebook</Heading>
			<Stitch />
			<p>
				My open collection of notes, resources, and explorations I'm currently working on.
				This is a place for me to post ideas, snippets, resources, cource notes, etc.
			</p>
			{notes.map(({ id, frontmatter: { title, excerpt, slug, date } }) => (
				<article className="note" key={id}>
					<h2>
						<Link style={{ color: 'var(--highlight-color--1' }} to={`/${slug}`}>
							{title}
						</Link>
					</h2>
					<Date>{date}</Date>
					<p>{excerpt}</p>
					<Link to={`/${slug}`}>Read note &rarr;</Link>
				</article>
			))}
		</Layout>
	);
};

export default Notebook;
