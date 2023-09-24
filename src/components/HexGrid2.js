/** @format */

import React from "react";
import Hexagon from "./Hexagon"; // Import your Hexagon component
function HexGrid() {
	function getColor(row) {
		const colors = ["#8ca2ad", "#adbad2", "#dee3e6"];
		return colors[row % 3];
	}

	function getX(row, col) {
		if (row < 5) {
			var specialOffset = row < 3 ? size * 6 : size * 3;
			var oddOffset = row % 2 === 0 ? 0 : horizGap / 2;
		} else if (row > 17) {
			var specialOffset = row > 19 ? size * 6 : size * 3;
			var oddOffset = row % 2 === 0 ? 0 : horizGap / 2;
		} else {
			var specialOffset = 0;
			var oddOffset = row % 2 === 0 ? 0 : horizGap / 2;
		}
		return col * horizGap + oddOffset + specialOffset;
	}
	let rowIncrement = 6;
	const CHESSROWS = 22;
	const CHESSCOLS = 12;
	const size = 40; // side length of hexagon
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width
	const hexagons = [];
	for (let row = 0; row < CHESSROWS; row++) {
		console.log("row", row);
		let qMultiplier = 2;
		if (row < 5) {
			let qInit = -(row - 1);
			for (let col = 0; col < row; col++) {
				let q = qInit + col * qMultiplier;
				let s = 5 - col;
				let x = getX(row, col);
				console.log(q, qInit, qMultiplier);
				console.log(s);
				let y = row * vertGap;
				hexagons.push(
					<g key={`${row}-${col}`} transform={`translate(${x},${y - size})`}>
						<Hexagon size={size} color={getColor(row)} text={`q:${q},s:${s}`} />
					</g>
				);
			}
		} else if (row > 17) {
			let qInit = -(22 - row - 1);
			if (row % 2 === 0) {
				rowIncrement++;
				var s = 11 - rowIncrement;
			} else {
				rowIncrement++;
				var s = 11 - rowIncrement;
			}
			for (let col = CHESSROWS - 1 - row; col >= 0; col--) {
				let q = qInit + col * qMultiplier;
				let x = getX(row, col);
				let y = row * vertGap;
				hexagons.push(
					<g key={`${row}-${col}`} transform={`translate(${x},${y - size})`}>
						<Hexagon size={size} color={getColor(row)} text={`q:${q},s:${s}`} />
					</g>
				);
			}
		} else {
			if (row % 2 === 0) {
				var s = 11 - rowIncrement;
				rowIncrement++;
			} else {
				var s = 11 - rowIncrement;
			}
			let hexesInRow = row % 2 === 0 ? 6 : 5;
			let qInit = row % 2 === 0 ? -5 : -4;
			for (let col = 0; col < hexesInRow; col++) {
				s = s - 1;
				let q = qInit + col * qMultiplier;
				let x = getX(row, col);
				let y = row * vertGap;
				hexagons.push(
					<g key={`${row}-${col}`} transform={`translate(${x},${y - size})`}>
						<Hexagon size={size} color={getColor(row)} text={`q:${q},s:${s}`} />
					</g>
				);
			}
		}
	}

	return (
		<>
			<svg
				width={(CHESSCOLS / 2) * width + (CHESSCOLS / 2 - 1) * size}
				height={CHESSROWS * vertGap}
			>
				{hexagons}
			</svg>
			<div></div>
		</>
	);
}

export default HexGrid;
