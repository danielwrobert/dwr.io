import React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-sitemetadata';

const Header = () => {
	const { description } = useSiteMetadata();

	return (
		<header>
			<h1>
				<Link to={`/`}>Bonjour</Link>
			</h1>
			<p>
				<em>{description}</em>
			</p>
			<nav>
				<ul>
					<li>
						<Link to={'/'} activeClassName="active">
							Home
						</Link>
					</li>
					<li>
						<Link to={'/about'} activeClassName="active">
							About
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
