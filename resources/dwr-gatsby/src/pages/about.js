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
		<h2>Welcome!</h2>
		<p>
			This site is meant to serve as a Digital Notebook, of sorts. The content you will find
			here is made up of my notes and learnings- whether they be from a course I've taken, a
			book or article I've read, or something interesting I've discovered in experimenting.
		</p>
		<p>
			Writing things out, in my own words, allows me to solidify my understanding of what I am
			learning. It also serves as a nice reference to look back on when trying to recall
			something (as opposed to trying to search around for "that one article I read on a
			particular topic once").
		</p>
		<p>
			Hopefully, some of my notes here will be helpful for you in your learning journey as
			well!
		</p>
		<p>
			Instead of getting hung up on producing perfectly curated articles, I may often post
			some of my notes/thoughts and circle back to them later, if necessary.
		</p>
		<p>
			While maybe not <em>exactly</em> the same thing, this isn't too far off from the whole{' '}
			<a href="https://joelhooks.com/digital-garden">"Digital Garden"</a> idea:
		</p>
		<blockquote>
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
