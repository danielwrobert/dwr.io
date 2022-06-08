/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';

import Header from '../header';

test('Header', () => {
	const { container } = render(<Header />);

	// Renders a nav element
	expect(container.querySelector(`nav`)).toBeInTheDocument();
});
