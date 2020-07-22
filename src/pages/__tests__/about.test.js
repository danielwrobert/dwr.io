import React from 'react';
import { render } from '@testing-library/react';

import About from '../about';

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

test('About', () => {
	const data = {
		site: {
			siteMetadata: {
				title: `dwr.io`,
				description: `My Digital Notebook`,
				siteUrl: `https://dwr.io`,
			},
		},
	};
	const { container } = render(<About data={data} />);

	// Snapshot Test for basic static page
	expect(container).toMatchSnapshot();
});
