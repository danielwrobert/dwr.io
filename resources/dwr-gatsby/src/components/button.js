import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const ButtonLink = styled(Link)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
	display: block;
	font-weight: 700;
	margin: 5.5rem auto 0;
	opacity: 0.8;
	padding: 1rem 1.5rem;
	transition: opacity 0.5s !important;
	width: fit-content;

	&:hover {
		opacity: 1;
	}
`;

const Button = ({ to, activeClassName, children }) => (
	<ButtonLink to={to} activeClassName={activeClassName}>
		{children}
	</ButtonLink>
);

export default Button;
