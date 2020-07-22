import React from 'react';
import { render } from '@testing-library/react';

import Test404 from '../404';

beforeEach(() => {
	StaticQuery.mockImplementationOnce(({ render }) =>
		render({
			site: {
				siteMetadata: {
					title: `dwr.io`,
					description: `My Digital Notebook`,
					siteUrl: `https://dwr.io`,
				},
			},
		})
	);
});

test('Test404', () => {
	const { container } = render(<Test404 />);

	// Snapshot Test for basic static page
	expect(container).toMatchSnapshot();
});
