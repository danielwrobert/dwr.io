import React from 'react';
import styled from '@emotion/styled';
import Header from './header';
import Footer from './footer';

import '../styles/normalize.css';
import '../styles/global.css';

const Content = styled.div`
	margin: 0 auto;
	max-width: calc(74rem + 8rem);
	padding: 7rem 4rem;
	width: 100%;
`;

export default ({ children }) => (
	<>
		<Header />
		<Content>{children}</Content>
		<Footer />
	</>
);
