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
		<TOC>
			<h2>Note Series:</h2>
			{children}
		</TOC>
	</>
);
