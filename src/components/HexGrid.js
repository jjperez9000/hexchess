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
	function checkValid(r, s, max) {
		//if abolute value of r or s > max return false
		if (Math.abs(r) > max || Math.abs(s) > max) {
			return false;
		}
		return true;
	}
	const CHESSROWS = 21; //should be 21
	const CHESSCOLS = 12;
	const size = 50; // side length of hexagon
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width
	const hexagons = [];

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
				<g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
					{checkValid(r, s, 5) && (
						<Hexagon
							size={size}
							color={getColor(row)}
							text={`q:${q},s:${s},r:${r}`}
						/>
					)}
				</g>
			);
		}
	}
	// const Pawn = () => {
	// 	return (
	// 		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACm0lEQVR4nO2ZW0tUURTHfyJqkVR2MyqIbhBNaT3U2Keoz+AHiD5EN4yy9E2IIrLe69G3oILSotQuRpQZ1IvdrGYEydjwP7ARZuacM/ucWcT8YDHOzF632fusvfYWmjRp0qTJf0QBGASmgF+SKX3mvjNPOzAMLAHLFcR9N6SxJmkHxhRsCbgCHAPWSIrAVaCsMWNWkxlWgB+BQ1XG9QJzGutmxhQFLZlSjST8ZMrSOYAhBvULu9e4DEnnMoaYVlBHE+gUpTOJIRYUVGcCnU7p/MQQP1IkslY63zDEpIJy5TYufdJ5jiEuKSi3TyQt1xcxWH7LKq21OAwsWiy//qzM1UjGJfHJ4mxEdAD3FGBZ+0SfCoCT41pOixpz12qLsh44X6VZXCnngHUYoxt4mSCJSKala4brCuyJdve2KmPbVKbHpXMNQ3xRUHsS6OyVzmcM8VVBueDisk868xjipoIaVzNYa2kVvaV1A0N0A29TPOwzwBaMcVbB/YlxZi/p7zMY46CCc0EeiTHebZR/pVOwtKxmUpwQR6TzxsLy2uqdDh+pTYnLauCptzE6Ww3BOX7lVauuFDY2Ay+8mdlJzmzykpgANtRhy0/mnd7nRnQD8gzYGMCem83HKQ5nqXBn7AEda6uV13plST4G5DMoO4APGQZfSd4D20MmckeGH+gmsZXsaAV65Mv5HM3iumcX+bFbPr9n0d02IpH5kEZHvaXVk8PS6gUeyuetkMa3AbMNeNhn5Tso/Q1IpD90Evv10EW3H1lzQb4W1FkHYZX6oGi9tpA9LcBt+XydsBmtyGmvQw1iMCYdXj93KoTBqNU+Qf6clG8XQ938lrE0bXq9dHlXsHUz0YBqtbxCgvx7zl373/cun/MU59P5rlm5/gFMiIx5tnJjwQAAAABJRU5ErkJggg==" />
	// 	);
	// };

	return (
		<>
			<Pawn />
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
