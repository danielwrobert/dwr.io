import React from 'react';
import styled from '@emotion/styled';

const SocialLinks = styled.div`
	display: flex;
	margin-top: 1.5rem;
	margin-left: 0.9rem;

	a {
		color: var(--shadow-color-light);
		display: block;

		&:first-of-type {
			margin-right: 2rem;
		}

		&:hover {
			color: var(--highlight-color--3);
		}
	}
	svg {
		width: 2.4rem;
		transform: translateX(-0.9rem);
	}

	@media screen and (min-width: 590px) {
		margin-top: 0;
		margin-left: 0;
	}
`;

export default () => (
	<SocialLinks>
		<a href="https://twitter.com/danielwrobert" rel="external">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 20"
				overflow="visible"
				fill="currentColor"
			>
				<title>Twitter</title>
				<path d="M33.3 3.3c-1.1.5-2.2.8-3.4 1 .5-.1 1.3-1.1 1.7-1.5.5-.6.9-1.3 1.1-2 0-.1.1-.1 0-.2h-.2c-1.3.7-2.6 1.2-4 1.5-.1 0-.2 0-.3-.1-.1-.1-.2-.3-.4-.4-.6-.5-1.2-.9-1.9-1.2-.9-.4-2-.5-3-.5-1 .1-2 .3-2.8.8-.9.5-1.7 1.1-2.3 1.9-.6.8-1.1 1.7-1.4 2.7-.2 1-.2 1.9-.1 2.9 0 .2 0 .2-.1.2-5.5-.8-10.1-2.8-13.8-7-.2-.2-.2-.2-.4 0-1.5 2.5-.7 6.4 1.3 8.3.3.3.5.5.8.7-.1 0-1.5-.1-2.7-.7-.2-.1-.2 0-.3.1v.8c.3 2.5 2 4.7 4.4 5.6l.9.3c-.5.1-1.1.2-2.6.1-.2 0-.3.1-.2.2 1.1 3.1 3.6 4.1 5.5 4.6.2 0 .5 0 .7.1-.6.9-2.7 1.6-3.7 2-1.8.6-3.8.9-5.7.7h-.5c-.1.1 0 .1.1.2.4.3.8.5 1.2.7 1.2.6 2.5 1.2 3.8 1.5 6.8 1.9 14.5.5 19.6-4.6 4-4 5.4-9.5 5.4-15 0-.2.3-.3.4-.4 1-.8 1.9-1.7 2.7-2.8.2-.2.2-.4.2-.5.1-.1.1-.1 0 0z" />
			</svg>{' '}
		</a>
		<a href="https://github.com/danielwrobert" rel="external">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 23 23"
				overflow="visible"
				fill="currentColor"
			>
				<title>GitHub</title>
				<path d="M16.3,0a16.3,16.3,0,0,0-5.2,31.7c.9.2,1.2-.3,1.2-.7s-.1-1.4-.1-2.8C7.7,29.2,6.7,26,6.7,26a4.1,4.1,0,0,0-1.8-2.4c-1.4-1,.1-1,.1-1a3.2,3.2,0,0,1,2.5,1.7,3.6,3.6,0,0,0,4.8,1.4,3.5,3.5,0,0,1,1-2.2c-3.6-.4-7.4-1.8-7.4-8.1a6,6,0,0,1,1.7-4.3,5.5,5.5,0,0,1,.1-4.3s1.4-.5,4.5,1.6a18.4,18.4,0,0,1,4.1-.5,18.4,18.4,0,0,1,4.1.5c3.1-2.1,4.4-1.6,4.4-1.6a5.7,5.7,0,0,1,.2,4.3,6.4,6.4,0,0,1,1.7,4.3c0,6.3-3.8,7.7-7.5,8.1a3.8,3.8,0,0,1,1.1,3V31c0,.4.3.9,1.1.7A16.3,16.3,0,0,0,16.3,0Z" />
			</svg>{' '}
		</a>
		<a href="https://dwr.io/rss.xml" rel="external">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				overflow="visible"
				fill="currentColor"
			>
				<title>RSS</title>
				<path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
				<path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
			</svg>{' '}
		</a>
	</SocialLinks>
);
