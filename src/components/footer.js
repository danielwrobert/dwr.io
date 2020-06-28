import React from 'react';
import styled from '@emotion/styled';

import SocialLinks from './social-links';

const Footer = styled.footer`
	background-color: var(--shadow-color);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: auto;
	padding: 2.5rem;
`;

const Copyright = styled.p`
	margin: 0 1rem 0 0;
`;

const date = new Date();

export default () => (
	<Footer>
		<Copyright>
			Copyright © {date.getFullYear()} Daniel W. Robert. All rights reserved.
		</Copyright>
		<SocialLinks />
	</Footer>
);
