import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Button from '../components/button';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--3);
`;
const Tagline = styled.h3`
	color: var(--highlight-color--1);
	font-style: italic;
	margin-bottom: 1.5rem;
	text-align: center;
`;

const Subheading = styled.h2`
	color: var(--highlight-color--5);
	margin-bottom: 1.8rem;
`;

const NoteTitle = styled.h3`
	a {
		color: var(--highlight-color--1);
	}
`;

const Date = styled.h5`
	font-style: italic;
	margin-bottom: 1rem;
`;

const Home = () => {
	const data = useStaticQuery(graphql`
		query HomeQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 3) {
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
			<SEO title="Welcome to my Digital Notebook" />
			<Heading className="entry-title">Daniel W. Robert</Heading>
			<Tagline>Front-End Engineer. Always a student.</Tagline>
			<Stitch />
			<p>Hello and welcome to my Digital Notebook!</p>
			<p>
				I'm a Front-End Engineer at <a href="https://automattic.com">Automattic</a> – the
				company behind WordPress.com, Jetpack, WooCommerce, Tumblr, Gravatar, and a bunch of
				other cool products that you may have seen around the web.
			</p>

			<Subheading>Latest Notes:</Subheading>
			{notes.map(({ id, frontmatter: { title, slug, excerpt, date } }) => (
				<article className="note" key={id}>
					<NoteTitle>
						<Link to={`/${slug}`}>{title}</Link>
					</NoteTitle>
					<Date>{date}</Date>
					<p>{excerpt}</p>
					<Link to={`/${slug}`}>Read note &rarr;</Link>
				</article>
			))}

			<Button to={'/notebook'} activeClassName="active">
				View all notes
			</Button>
		</Layout>
	);
};

export default Home;
