import React from 'react';
import styled from '@emotion/styled';

const Footer = styled.footer`
	background-color: var(--shadow-color);
	margin-top: auto;
	padding: 2.5rem 0;

	p {
		margin: 0 auto;
		padding: 0 4rem;

		@media screen and (min-width: 880px) {
			max-width: 88rem;
		}
	}
`;

const date = new Date();

export default () => (
	<Footer>
		<p>Copyright © {date.getFullYear()} Dan Robert. All rights reserved.</p>
	</Footer>
);
