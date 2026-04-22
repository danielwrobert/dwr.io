import React from 'react';
import styled from '@emotion/styled';

import Nav from './nav';

const StyledHeader = styled.header`
	background-color: var(--shadow-color);
	box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.15);
	padding: 2.5rem;
`;

const Header = () => (
	<StyledHeader>
		<Nav />
	</StyledHeader>
);

export default Header;
