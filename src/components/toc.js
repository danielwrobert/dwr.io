/**
 * Table of Contents Component
 */
import React from 'react';
import styled from '@emotion/styled';

const TOC = styled.div`
	background-color: rgb(40, 42, 54);
	border-radius: 0.5rem;
	padding: 1.5rem;
	margin: 1.8rem 0;
`;

const Heading = styled.h2`
	color: var(--highlight-color--4);
`;

export default ({ children }) => (
	<>
		<TOC>
			<Heading>Series Table of Contents:</Heading>
			{children}
		</TOC>
	</>
);
