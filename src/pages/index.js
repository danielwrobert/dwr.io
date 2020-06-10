import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const Home = () => (
	<Layout>
		<h1>Daniel W. Robert</h1>
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

		<Link to={'/digital-garden'} activeClassName="active">
			Browse the digital garden
		</Link>
	</Layout>
);

export default Home;
