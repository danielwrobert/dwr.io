/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';

import Layout from '../layout';

test('Layout', () => {
	const text = `__Bonjour__`;
	const { container, getByText } = render(
		<Layout>
			<h1>{text}</h1>
		</Layout>
	);
	const child = getByText(text);

	// Renders a header element
	expect(container.querySelector(`header`)).toBeInTheDocument();

	// Renders a footer element
	expect(container.querySelector(`footer`)).toBeInTheDocument();

	// Renders children
	expect(child).toBeInTheDocument();
});
