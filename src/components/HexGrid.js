/** @format */
import React, { useEffect, useState } from "react";
import Hexagon from "./Hexagon";
function HexGrid({ size, pieceLocaitions, setHexCoords }) {
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
	function checkValid(r, s, max) {
		//if abolute value of r or s > max return false
		if (Math.abs(r) > max || Math.abs(s) > max) {
			return false;
		}
		return true;
	}
	const CHESSROWS = 21;
	const CHESSCOLS = 12;
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width
	const hexagons = [];
	const hexagonLocaions = [];
	for (let row = 0; row < CHESSROWS; row++) {
		let hexesInRow = row % 2 === 0 ? 5 : 6;
		for (let col = 0; col < hexesInRow; col++) {
			// info for the game
			let q = getQ(row, col);
			let s = getS(row, col);
			let r = -(q + s);

			// info for hexagon placement
			let x = getX(row, col);
			let y = row * vertGap;
			if (checkValid(r, s, 5)) {
				hexagonLocaions.push({ x: x, y: y, q: q, r: r, s: s });
				hexagons.push(
					<>
						<g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
							<Hexagon
								size={size}
								color={getColor(row)}
								// text={`q:${q},s:${s},r:${r}`}
								// text={`q:${q + 5},s:${s + 5},r:${r + 5}`}
								// text={PieceMap[getPiece(q, r, s)]}
								// text={pieceLocaitions[0][0][0]}
							/>
						</g>
					</>
				);
			}
		}
	}
	useEffect(() => {
		setHexCoords(hexagonLocaions);
	}, []);
	return (
		<>
			<svg
				width={(CHESSCOLS / 2) * width + (CHESSCOLS / 2 - 1) * size}
				height={(CHESSROWS + 1) * vertGap}
			>
				{hexagons}
			</svg>
		</>
	);
}

export default HexGrid;
