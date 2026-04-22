import React from 'react';
import styled from '@emotion/styled';

const Stitch = ({
	color = 'var(--shadow-color-light)',
	strokeWidth = '4',
	width = '4.5rem',
	margin = '0 auto 4.5rem',
}) => {
	const Svg = styled.svg(() => ({
		display: 'block',
		margin,
		stroke: color,
		strokeWidth,
		width,
	}));

	return (
		<Svg
			id="stitch"
			data-name="stitch"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 87.5 23.1"
		>
			<line x1="0.1" y1="13.4" x2="87.4" y2="10.2" fill="none" />
			<line x1="42.4" y1="0.8" x2="43.6" y2="21.8" fill="none" />
			<line x1="59.2" y1="0.4" x2="60.4" y2="21.4" fill="none" />
			<line x1="75.8" y1="0.1" x2="77" y2="21.1" fill="none" />
			<line x1="26.3" y1="1.1" x2="27.4" y2="22.1" fill="none" />
			<line x1="9.7" y1="2" x2="10.9" y2="23" fill="none" />
		</Svg>
	);
};

export default Stitch;
