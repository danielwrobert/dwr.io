import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledNav = styled.nav`
	ul {
		align-items: center;
		display: flex;
		flex-direction: row;
		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			margin: 0 15px;

			&:first-of-type {
				font-family: 'ovo', serif;
				font-size: 2.5rem;
				margin-right: auto;
			}
		}
	}
`;

const Nav = () => (
	<StyledNav>
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
	</StyledNav>
);

export default Nav;
