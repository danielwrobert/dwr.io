import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Stitch from '../components/stitch';

const Button = styled(Link)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
	display: inline-block;
	font-weight: 700;
	margin-top: 5.5rem;
	opacity: 0.8;
	padding: 1rem 1.5rem;
	transition: opacity 0.5s !important;

	&:hover {
		opacity: 1;
	}
`;

const Heading = styled.h1`
	color: var(--highlight-color--3);
`;
const Tagline = styled.h3`
	font-style: italic;
	margin-bottom: 1.5rem;
	text-align: center;
`;

const Subheading = styled.h2`
	margin-bottom: 1.8rem;
`;

const NoteTitle = styled.h3`
	a {
		color: var(--highlight-color--5);
	}
`;

const Home = () => {
	const data = useStaticQuery(graphql`
		query HomeQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 3) {
				nodes {
					frontmatter {
						slug
						title
						excerpt
					}
				}
			}
		}
	`);

	const notes = data.allMdx.nodes;

	return (
		<Layout>
			<Heading className="entry-title">Daniel W. Robert</Heading>
			<Tagline>Front-End Engineer. Always a student.</Tagline>
			<Stitch />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae. Congue nisi
				vitae suscipit tellus mauris a diam maecenas.
			</p>

			<Subheading>Latest Notes:</Subheading>
			{notes.map(({ id, frontmatter: { title, slug, excerpt } }) => (
				<article className="note" key={id}>
					<NoteTitle>
						<Link to={`/notebook/${slug}`}>{title}</Link>
					</NoteTitle>
					<p>{excerpt}</p>
					<Link to={`/notebook/${slug}`}>Read more &rarr;</Link>
				</article>
			))}

			<Button to={'/notebook'} activeClassName="active">
				View all notes
			</Button>
		</Layout>
	);
};

export default Home;
