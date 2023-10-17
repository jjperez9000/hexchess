/** @format */

import React from "react";

function Hexagon({
	color = "grey",
	size = 100,
	borderColor = "black",
	borderWidth = 0,
	text = "",
	x = 0,
	y = 0,
}) {
	const height = (Math.sqrt(3) / 2) * size * 2;
	const hexHeight = size * 2;
	const hexWidth = height + borderWidth * 2; // Adjust the height to account for the border width
	const centerY = hexWidth / 2;
	const centerX = hexHeight / 2;

	const points = Array.from({ length: 6 })
		.map((_, i) => {
			const angleDeg = 60 * i;
			const angleRad = (Math.PI / 180) * angleDeg;
			const x = centerX + size * Math.cos(angleRad);
			const y = centerY + size * Math.sin(angleRad);
			return `${x},${y}`;
		})
		.join(" ");

	return (
		<g transform={`translate(${x},${y})`}>
			<svg
				width={hexHeight}
				height={hexWidth}
				viewBox={`0 0 ${hexHeight} ${hexWidth}`}
			>
				<polygon
					points={points}
					fill={color}
					stroke={borderColor}
					strokeWidth={borderWidth}
				/>
				<text
					x={centerX}
					y={centerY}
					fill="black"
					textAnchor="middle"
					stroke="none"
					dominantBaseline="middle"
					fontSize={size / 3}
				>
					{text}
				</text>
			</svg>
		</g>
	);
}

export default Hexagon;

// Usage:
// <Hexagon color="red" size={150} borderColor="black" borderWidth={4} />
