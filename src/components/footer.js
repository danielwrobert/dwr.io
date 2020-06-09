import React from 'react';

const Footer = () => {
	const date = new Date();

	return (
		<footer>
			<hr />
			<p>Copyright © {date.getFullYear()} Dan Robert. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
