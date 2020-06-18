import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Header = styled.header`
	background-color: var(--shadow-color);
	box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.15);
	padding: 2.5rem;
`;

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
				margin-right: auto;
			}
		}
	}
`;

export default () => (
	<Header>
		<Nav>
			<ul>
				<li>
					<Link to={`/`} activeClassName="active">
						Hello
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
	</Header>
);
