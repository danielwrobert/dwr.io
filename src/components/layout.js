import React from 'react';
import styled from '@emotion/styled';
import Header from './header';
import Footer from './footer';

import '../styles/normalize.css';
import '../styles/global.css';

const Content = styled.div`
	margin: 0 auto;
	max-width: 88rem;
	padding: 4rem;
	width: 100%;
`;

export default ({ children }) => (
	<>
		<Header />
		<Content>{children}</Content>
		<Footer />
	</>
);
