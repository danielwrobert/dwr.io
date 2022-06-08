/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../footer';

test('Footer', () => {
	const { container, getByText } = render(<Footer />);
	const socialLinks = container.querySelectorAll('svg');
	// const twitterIcon = getByText(`Twitter`);
	// const githubIcon = getByText(`GitHub`);

	// Renders a paragraph element (copyright)
	expect(container.querySelector(`p`)).toBeInTheDocument();

	// Renders a svg element for social links
	expect(container.querySelector(`svg`)).toBeInTheDocument();

	// Renders two svg elements for social links (Twitter, GitHub, RSS)
	expect(socialLinks.length).toBe(3);

	// Renders Twitter Icon (title)
	// expect(twitterIcon).toBeInTheDocument();

	// Renders GitHub Icon (title)
	// expect(githubIcon).toBeInTheDocument();
});
