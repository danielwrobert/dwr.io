import React from 'react';
import { render } from '@testing-library/react';

import About from '../about';

const useSiteMetadata = jest.fn().mockImplementationOnce(() => {
	const data = {
		site: {
			siteMetadata: {
				title: `dwr.io`,
				description: `My Digital Notebook`,
			},
		},
	};
	return data.site.siteMetadata;
});

test('About', () => {
	const { container } = render(<About />);

	// Snapshot Test for basic static page
	expect(container).toMatchSnapshot();
});
