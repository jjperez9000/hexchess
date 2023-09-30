/** @format */
import React, { useEffect, useState } from "react";
import Hexagon from "./Hexagon";
import Pawn from "./Pieces";
function HexGrid({ size, pieceLocaitions }) {
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
		console.log(pieceLocaitions);
	}
	function checkValid(r, s, max) {
		//if abolute value of r or s > max return false
		if (Math.abs(r) > max || Math.abs(s) > max) {
			return false;
		}
		return true;
	}
	function getQRS(q, r, s) {
		return [q + 5, r + 5, s + 5];
	}
	const CHESSROWS = 21;
	const CHESSCOLS = 12;
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width
	const hexagons = [];

	useEffect(() => {
		console.log(pieceLocaitions);
	}, [pieceLocaitions]);
	function getPiece(q, r, s) {
		// Ensure indices are within bounds
		if (
			q + 5 >= 0 &&
			q + 5 < 11 &&
			r + 5 >= 0 &&
			r + 5 < 11 &&
			s + 5 >= 0 &&
			s + 5 < 11
		) {
			return pieceLocaitions[q + 5][r + 5][s + 5];
		} else {
			console.error("Indices out of bounds:", q + 5, r + 5, s + 5);
			return null;
		}
	}
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
			hexagons.push(
				<>
					<g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
						{checkValid(r, s, 5) && (
							<Hexagon
								size={size}
								color={getColor(row)}
								// text={`q:${q},s:${s},r:${r}`}
								// text={`q:${q + 5},s:${s + 5},r:${r + 5}`}
								// text={pieceMap[getPiece(q, r, s)]}
								// text={pieceLocaitions[0][0][0]}
							/>
						)}
						<p>test</p>
						{checkValid(r, s, 5) && (
							<g transform={`translate(${width / 4},${height / 4})`}>
								{pieceMap[getPiece(q, r, s)]}
							</g>
						)}
					</g>
				</>
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
		</>
	);
}

const pieceMap = [<></>, <Pawn />];
export default HexGrid;
