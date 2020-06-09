import React from 'react';
import useSiteMetadata from '../hooks/use-sitemetadata';

const Footer = () => {
	const { title, description } = useSiteMetadata();
	const date = new Date();

	return (
		<footer>
			<hr />
			<p>Copyright © {date.getFullYear()} Dan Robert. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
