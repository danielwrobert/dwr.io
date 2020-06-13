import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Stitch from '../components/stitch';

const Button = styled((props) => <Link {...props} />)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
	display: inline-block;
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
	font-size: 4.5rem;
	text-align: center;
`;
const Subheading = styled.h3`
	font-style: italic;
	text-align: center;
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
			<Heading>Daniel W. Robert</Heading>
			<Subheading>Front-End Engineer. Always a student.</Subheading>
			<Stitch margin="1.5rem auto 4.5rem" />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae. Congue nisi
				vitae suscipit tellus mauris a diam maecenas.
			</p>

			<h2 style={{ marginBottom: '1.8rem' }}>Latest Notes:</h2>
			{notes.map(({ id, frontmatter: { title, slug, excerpt } }) => (
				<article className="note" key={id}>
					<h3>
						<Link style={{ color: 'var(--highlight-color--5)' }} to={`/${slug}`}>
							{title}
						</Link>
					</h3>
					<p>{excerpt}</p>
					<Link to={`/${slug}`}>Read more &rarr;</Link>
				</article>
			))}

			<Button to={'/notebook'} activeClassName="active">
				View the notebook
			</Button>
		</Layout>
	);
};

export default Home;
