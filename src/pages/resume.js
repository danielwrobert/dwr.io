import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layout';
import SEO from 'components/seo';
// import Stitch from 'components/stitch';

const Container = styled.article`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
`;

const Resume = () => (
	<Layout>
		<SEO title="Resume" />
		<Container className="resume">
			<section className="name">Name</section>
			<section className="photo">Photo</section>
			<section className="about">About</section>
			<section className="work">Work</section>
			<section className="education">Education</section>
			<section className="community">Community</section>
			<section className="skills">Skills</section>
		</Container>
	</Layout>
);

export default Resume;
