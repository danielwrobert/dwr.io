import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Stitch from '../components/stitch';

const Heading = styled.h1`
	color: var(--highlight-color--3);
`;

const About = () => (
	<Layout>
		<Seo title="About My Notebook" />
		<Heading className="entry-title">About My Notebook</Heading>
		<Stitch />
		<p>
			This notebook is meant to serve as a{' '}
			<a href="https://twitter.com/Mappletons/status/1250532315459194880">"Digital Garden"</a>{' '}
			(or Digital Notebook, as I prefer to call it). By that I mean the content here are more
			my notes and thoughts, rather than always being structured as complete tutorials or
			teaching material – although I will also be posting in that format as well!
		</p>
		<p>
			Instead of getting hung up on producing perfectly curated articles, I can just jot
			things down and circle back to them later, if necessary.
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

		<h2>Under The Hood</h2>
		<p>
			This site was built as a SSG (static site generator) with{' '}
			<a href="https://www.gatsbyjs.org/">GatsbyJS</a> and hosted on{' '}
			<a href="https://www.netlify.com/">Netlify</a>.
		</p>
		<p>
			The posts are created in <a href="https://mdxjs.com/">Markdown (MDX)</a>.
		</p>

		<h3>Colors</h3>
		<p>
			I've styled this site to use the colors from the{' '}
			<a href="https://draculatheme.com/">Dracula</a> color scheme. I'm using that scheme in
			just about all of my apps (VS Code, Vim, iTerm 2, Bear, MacDown, etc.) and I love it!
		</p>

		<h3>Fonts</h3>
		<p>
			This site uses <a href="https://fonts.google.com/specimen/Muli">Muli</a> for the body
			font and <a href="https://fonts.google.com/specimen/Ovo">Ovo</a> for the headings. I'm
			importing them as local packages via{' '}
			<a href="https://github.com/KyleAMathews/typefaces">Typefaces.js</a>.
		</p>
	</Layout>
);

export default About;
