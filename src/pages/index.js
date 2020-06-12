import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Button = styled((props) => <Link {...props} />)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
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
`;

const Home = () => {
	const data = useStaticQuery(graphql`
		query HomeQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 3) {
				nodes {
					frontmatter {
						slug
						title
					}
				}
			}
		}
	`);

	const notes = data.allMdx.nodes;

	return (
		<Layout>
			<Heading>Daniel W. Robert</Heading>
			<h2>Front-End Engineer at Automattic, Inc.</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae. Congue nisi
				vitae suscipit tellus mauris a diam maecenas.
			</p>

			<h2>Latest Notes:</h2>
			{notes.map(({ id, frontmatter: { title, slug } }) => (
				<article key={id}>
					<h3>
						<Link to={`/${slug}`}>{title}</Link>
					</h3>
				</article>
			))}

			<Button to={'/notebook'} activeClassName="active">
				View the notebook
			</Button>
		</Layout>
	);
};

export default Home;
