import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';

const Heading = styled.h1`
	color: var(--highlight-color--3);
`;

const NotFound = () => (
	<Layout>
		<Seo title="Not found!" />
		<Heading>404</Heading>
		<p>
			Page not found. Go back <Link to={'/'}>home</Link>.
		</p>
	</Layout>
);

export default NotFound;
