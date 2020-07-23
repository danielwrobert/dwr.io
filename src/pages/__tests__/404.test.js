import React from 'react';
import { StaticQuery } from 'gatsby';
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
	const data = {
		site: {
			siteMetadata: {
				title: `dwr.io`,
				description: `My Digital Notebook`,
			},
		},
	};
	// const { container } = render(<Test404 data={data} />);
	const tree = render(<Test404 data={data} />).toJSON();

	// Snapshot Test for basic static page
	// expect(container).toMatchSnapshot();
	expect(tree).toMatchSnapshot();
});
