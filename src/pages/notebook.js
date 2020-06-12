import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Heading = styled.h1`
	color: var(--highlight-color--4);
	font-size: 4.5rem;
`;

const Notebook = () => {
	const data = useStaticQuery(graphql`
		query PostsQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }) {
				nodes {
					frontmatter {
						slug
						title
						excerpt
						date(formatString: "MM.DD.YY")
					}
				}
			}
		}
	`);

	const posts = data.allMdx.nodes;

	return (
		<Layout>
			<Heading>Notebook</Heading>

			{posts.map(({ id, frontmatter: { title, excerpt, slug, date } }) => (
				<article key={id}>
					<h3>
						<Link to={`/${slug}`}>{title}</Link>
					</h3>
					<p>
						<small>Posted On {date}</small>
					</p>
					<p>{excerpt}</p>
					<Link to={`/${slug}`}>Read the full note</Link>
				</article>
			))}
		</Layout>
	);
};

export default Notebook;
