/** @format */
function GenHexCoords({ size }) {
	// simple helper functions for offsets and coloring
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
	function setHexLocaion(q, r, s, x, y, color) {
		hexagonLocations[q + 5][r + 5] = {
			x: x,
			y: y,
			color: color,
			q: q,
			r: r,
			s: s,
		};
	}
	// constants for the grid
	const CHESSROWS = 21;

	// a bunch of hexagon math
	const height = (Math.sqrt(3) / 2) * size * 2; // height of the hexagons
	const width = 2 * size; // width of the hexagons
	const vertGap = height / 2; // vertical gap between hexagons, adjusted to 3/4 of height
	const horizGap = (width * 3) / 2; // horizontal gap between hexagons, adjusted to 3/4 of width

	// array of hexagon objects to be displayed
	// array to asociae q,r,[not s] to x,y
	// this is sent up a level so the game knows were to place a piece
	const hexagonLocations = Array.from({ length: 11 }, () => []);
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
				setHexLocaion(q, r, s, x + width / 2, y + height / 2, getColor(row));
			}
		}
	}
	return hexagonLocations;
}

export default GenHexCoords;
