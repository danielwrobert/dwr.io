import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Heading = styled.h1`
	color: var(--highlight-color--3);
	font-size: 4.5rem;
`;

const About = () => (
	<Layout>
		<Heading>About</Heading>
		<h2 style={{ color: 'var(--highlight-color--1)' }}>About Me</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.
		</p>
		<h2 style={{ color: 'var(--highlight-color--1)' }}>About My Notebook</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.
		</p>
	</Layout>
);

export default About;
