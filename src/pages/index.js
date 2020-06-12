import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';

const Button = styled((props) => <Link {...props} />)`
	background-color: var(--highlight-color--2);
	border-radius: 0.4rem;
	color: var(--background-color) !important;
	opacity: 0.8;
	padding: 1rem 1.5rem;
	transition: opacity 0.5s !important;

	&:hover {
		opacity: 1;
	}
`;

const Heading = styled.h1`
	color: var(--highlight-color--3);
	font-size: 4.5rem;
`;

const Home = () => (
	<Layout>
		<Heading>Daniel W. Robert</Heading>
		<h2>Front-End Engineer at Automattic, Inc.</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae. Congue nisi
			vitae suscipit tellus mauris a diam maecenas. Bibendum at varius vel pharetra vel turpis
			nunc. Cum sociis natoque penatibus et magnis dis. Vitae tempus quam pellentesque nec nam
			aliquam sem et tortor. Semper viverra nam libero justo laoreet sit amet. Tincidunt
			ornare massa eget egestas. Sit amet consectetur adipiscing elit pellentesque habitant
			morbi tristique. In egestas erat imperdiet sed. Consequat id porta nibh venenatis cras
			sed felis. Viverra orci sagittis eu volutpat. Elit pellentesque habitant morbi tristique
			senectus et netus et malesuada. Malesuada nunc vel risus commodo viverra. Condimentum
			vitae sapien pellentesque habitant morbi. Aliquam ut porttitor leo a diam sollicitudin
			tempor id. Quis imperdiet massa tincidunt nunc pulvinar sapien.
		</p>

		<h3>Latest Items:</h3>
		<ul>
			<li>item</li>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>

		<Button to={'/notebook'} activeClassName="active">
			View the notebook
		</Button>
	</Layout>
);

export default Home;
