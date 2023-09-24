/** @format */

import React from "react";
import Hexagon from "./Hexagon"; // Import your Hexagon component
function HexGrid() {
	function getColor(row) {
		const colors = ["#8ca2ad", "#adbad2", "#dee3e6"];
		return colors[row % 3];
	}
	function getX(row, col) {
		let oddOffset = row % 2 === 0 ? horizGap / 2 : 0;
		return col * horizGap + oddOffset;
	}
	function getQ(row, col) {
		let qInit = row % 2 === 0 ? -4 : -5;
		return qInit + col * 2;
	}
	function getS(row, col) {
		if (row % 2 === 0) {
			return -(col + row / 2 - 7);
		} else {
			return -(col + (row - 1) / 2 - 7);
		}
	}

	const CHESSROWS = 21; //should be 21
	const CHESSCOLS = 12;
	const size = 40; // side length of hexagon
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width
	const hexagons = [];

	for (let row = 0; row < CHESSROWS; row++) {
		let hexesInRow = row % 2 === 0 ? 5 : 6;
		for (let col = 0; col < hexesInRow; col++) {
			let q = getQ(row, col);
			let s = getS(row, col);
			let r = -(q + s);

			let x = getX(row, col);
			let y = row * vertGap;
			hexagons.push(
				<g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
					<Hexagon
						size={size}
						color={getColor(row)}
						text={`q:${q},s:${s},r:${r}`}
					/>
				</g>
			);
		}
	}

	return (
		<>
			<svg
				width={(CHESSCOLS / 2) * width + (CHESSCOLS / 2 - 1) * size}
				height={(CHESSROWS + 1) * vertGap}
			>
				{hexagons}
			</svg>
			<div></div>
		</>
	);
}

export default HexGrid;
