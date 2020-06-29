import React from 'react';
import styled from '@emotion/styled';

import useSiteMetadata from 'hooks/use-sitemetadata';
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
	margin: 0 2rem 0 0;
`;

const date = new Date();

export default () => {
	const site = useSiteMetadata(); // Returns full object to `site`, as opposed to destructuring out the `title` and `description` like we did in footer.php
	return (
		<Footer>
			<Copyright>
				Copyright © {date.getFullYear()} {site.title}. All rights reserved.
			</Copyright>
			<SocialLinks />
		</Footer>
	);
};
