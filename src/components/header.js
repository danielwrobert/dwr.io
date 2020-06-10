import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
	return (
		<header>
			<h1>
				<Link to={`/`}>Bonjour</Link>
			</h1>
			<nav>
				<ul>
					<li>
						<Link to={'/'} activeClassName="active">
							Home
						</Link>
					</li>
					<li>
						<Link to={'/digital-garden'} activeClassName="active">
							Digital Garden
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
