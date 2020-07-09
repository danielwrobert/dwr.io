import React from 'react';
import styled from '@emotion/styled';
import ResumeLayout from 'components/resume-layout';
import SEO from 'components/seo';

import headshot from 'images/dan-headshot.png';

const Container = styled.article`
	display: grid;
	grid-gap: 0.5rem;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(7, 1fr);
	grid-template-areas:
		'photo'
		'name'
		'about'
		'work'
		'education'
		'skills'
		'community';
	/* height: calc(100vh - (14rem + 16.4rem)); */
	height: calc(100vh - 14rem);

	@media (min-width: 900px) {
		grid-template-columns: 2fr 1fr;
		grid-template-rows: repeat(6, 1fr);
		grid-template-areas:
			'name photo'
			'about about'
			'work work'
			'education education'
			'skills skills'
			'community community';
	}
	@media (min-width: 1200px) {
		grid-template-rows: repeat(4, 1fr);
		grid-template-areas:
			'name photo'
			'work about'
			'work education'
			'community skills';
	}
`;

const Section = styled.section`
	border: 3px solid var(--shadow-color);

	&.name {
		border: none;
		grid-area: name;
	}
	&.photo {
		border: none;
		grid-area: photo;
		/* align-self: center; */
		justify-self: center;

		img {
			border-radius: 15rem;
			max-width: 25rem;
		}
	}
	&.about {
		grid-area: about;
	}
	&.work {
		grid-area: work;
	}
	&.education {
		grid-area: education;
	}
	&.community {
		grid-area: community;
	}
	&.skills {
		grid-area: skills;
	}
`;

const Resume = () => (
	<ResumeLayout>
		<SEO title="Resume" />
		<Container className="resume">
			<Section className="name">
				<h1>Dan Robert</h1>
				<h2>Front-End Engineer</h2>
			</Section>
			<Section className="photo">
				<img src={headshot} alt="Headshot" />
			</Section>
			<Section className="about">About</Section>
			<Section className="work">Work</Section>
			<Section className="education">Education</Section>
			<Section className="community">Community</Section>
			<Section className="skills">Skills</Section>
		</Container>
	</ResumeLayout>
);

export default Resume;
