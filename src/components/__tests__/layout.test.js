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

	expect(container.querySelector(`header`)).toBeInTheDocument();
	expect(container.querySelector(`footer`)).toBeInTheDocument();
	expect(child).toBeInTheDocument();
});
