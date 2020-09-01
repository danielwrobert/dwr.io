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

export default ({ children }) => (
	<>
		<h2>Table of Contents</h2>
		<TOC>{children}</TOC>
	</>
);
