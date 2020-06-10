import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to={`/`}>Hello</Link>
					</li>
					<li>
						<Link to={'/digital-garden'} activeClassName="active">
							Digital Garden
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
