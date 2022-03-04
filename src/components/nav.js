import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Nav = styled.nav`
	ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			margin: 0 15px;

			&:first-of-type {
				font-family: 'ovo', serif;
				font-weight: bold;
				margin-right: auto;
			}
		}
	}
`;

export default () => (
	<Nav>
		<ul>
			<li>
				<Link to={`/`} activeClassName="active">
					DWR
				</Link>
			</li>
			<li>
				<Link to={'/notebook'} activeClassName="active" partiallyActive={true}>
					Notebook
				</Link>
			</li>
			<li>
				<Link to={'/about'} activeClassName="active">
					About
				</Link>
			</li>
		</ul>
	</Nav>
);
