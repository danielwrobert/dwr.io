import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
	display: flex;
	margin-top: 1.5rem;

	a {
		color: var(--shadow-color-light);
		display: inline-flex;

		&:not(:last-of-type) {
			margin-right: 2rem;
		}

		&:hover {
			color: var(--highlight-color--3);
		}
	}
	svg {
		width: 3.2rem;
	}

	@media screen and (min-width: 590px) {
		margin-top: 0;
	}
`;

const SocialLinks = () => (
	<Container>
		<a href="https://twitter.com/danielwrobert" rel="external">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect x="0" fill="none" width="24" height="24" />
				<g>
					<path
						d="M22.23 5.924a8.212 8.212 0 01-2.357.646 4.115 4.115 0 001.804-2.27 8.221 8.221 0 01-2.606.996 4.103 4.103 0 00-6.991 3.742 11.647 11.647 0 01-8.457-4.287 4.087 4.087 0 00-.556 2.063 4.1 4.1 0 001.825 3.415 4.09 4.09 0 01-1.859-.513v.052a4.104 4.104 0 003.292 4.023 4.099 4.099 0 01-1.853.07 4.11 4.11 0 003.833 2.85 8.236 8.236 0 01-5.096 1.756 8.33 8.33 0 01-.979-.057 11.617 11.617 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531a8.298 8.298 0 002.047-2.123z"
						fill="currentColor"
					/>
				</g>
			</svg>
		</a>
		<a href="https://github.com/danielwrobert" rel="external">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect x="0" fill="none" width="24" height="24" />
				<g>
					<path
						d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.307.679.917.679 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.579.688.481A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z"
						fill="currentColor"
					/>
				</g>
			</svg>
		</a>
		<a href="https://dwr.io/rss.xml" rel="external">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<rect x="0" fill="none" width="16" height="16" />
				<g>
					<path
						d="M2 6v2c3.3 0 6 2.7 6 6h2c0-4.4-3.6-8-8-8zm0-4v2c5.5 0 10 4.5 10 10h2C14 7.4 8.6 2 2 2zm1.5 9c-.8 0-1.5.7-1.5 1.5S2.7 14 3.5 14 5 13.3 5 12.5 4.3 11 3.5 11z"
						fill="currentColor"
					/>
				</g>
			</svg>
		</a>
	</Container>
);

export default SocialLinks;
