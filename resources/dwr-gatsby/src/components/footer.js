import React from 'react';
import styled from '@emotion/styled';

import SocialLinks from './social-links';

const Container = styled.footer`
	background-color: var(--shadow-color);
	align-items: center;
	justify-content: space-between;
	margin-top: auto;
	padding: 2.5rem;

	@media screen and (min-width: 640px) {
		display: flex;
	}
`;

const Copyright = styled.p`
	margin: 0 2rem 0 0;
`;

const date = new Date();

const Footer = () => {
	return (
		<Container>
			<Copyright>
				Copyright © {date.getFullYear()} Daniel W Robert. All rights reserved.
			</Copyright>
			<SocialLinks />
		</Container>
	);
};

export default Footer;
