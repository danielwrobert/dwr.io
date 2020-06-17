import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--4);
`;

const Subheading = styled.h2`
	color: var(--highlight-color--1);
`;

const About = () => (
	<Layout>
		<Heading className="entry-title">About</Heading>
		<Stitch />
		<Subheading>About My Notebook</Subheading>
		<p>
			This notebook is meant to serve as my{' '}
			<a href="https://twitter.com/Mappletons/status/1250532315459194880">"Digital Garden"</a>
			. By that I mean the content here are more my notes and thoughts, rather than complete
			tutorials or teaching material – although I will also post some of that too, from
			time-to-time!
		</p>
		<p>
			Instead of getting hung up on producing perfectly curated articles, I can just jot
			things down and circle back to them later if necessary.
		</p>
		<p>
			Joel Hooks put it nicely in his{' '}
			<a href="https://joelhooks.com/digital-garden">post on Digital Gardens:</a>
		</p>
		<blockquote>
			{' '}
			"It is a blog, sure, but it is also a wiki. It's a spot where I can post ideas,
			snippets, resources, thoughts, collections, and other bits and pieces that I find
			interesting and useful. Instead of always being a "performance" level of blogging, it
			can be a looser more human endeavor that drops the idea of robots sorting the content
			(in this case simply by date created) and embraces the idea of curation, by me, for
			you."
		</blockquote>
		<Subheading>About Me</Subheading>
		<p>
			I’m Dan and I’m a Front-End Engineer at <a href="https://automattic.com/">Automattic</a>{' '}
			– the company behind WordPress.com, Jetpack, WooCommerce, Tumblr, Gravatar, and a bunch
			of other cool products that you may have seen around the web.
		</p>
	</Layout>
);

export default About;
