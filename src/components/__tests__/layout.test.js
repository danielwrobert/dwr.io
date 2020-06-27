import React from 'react';
import { render } from '@testing-library/react';

import Layout from '../layout';

test('Layout', () => {
	const { container } = render(
		<Layout>
			<h1>Bonjour!</h1>
		</Layout>
	);

	expect(container.querySelector(`header`)).toBeInTheDocument();
	expect(container.querySelector(`footer`)).toBeInTheDocument();
});
