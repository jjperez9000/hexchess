/** @format */
import { useEffect, useState } from "react";
import HexGrid from "./HexGrid";
import DebugButton from "./DebugButton";
import { Piece } from "./Pieces";
import Canvas from "./Canvas";
import CanvasItem from "./CanvasItem";
function ChessGame() {
	const size = 45;
	const CHESSROWS = 21;
	const CHESSCOLS = 12;
	const [hexCoords, setHexCoords] = useState([]);
	const [pieces, setPieces] = useState(
		Array(11)
			.fill()
			.map(() =>
				Array(11)
					.fill()
					.map(() => Array(11).fill(null))
			)
	);
	useEffect(() => {
		const originalPieces = Array(11)
			.fill()
			.map(() =>
				Array(11)
					.fill()
					.map(() => Array(11).fill(null))
			);
		for (let i = 0; i < 11; i++) {
			for (let j = 0; j < 11; j++) {
				for (let k = 0; k < 11; k++) {
					originalPieces[i][j][k] = 0;
				}
			}
		}
		placePiece(1, -3, 3, 0);
	}, []);

	function placePiece(type, q, r, s) {
		const newPieces = [...pieces];
		newPieces[q + 5][r + 5][s + 5] = type;
		setPieces(newPieces);
	}
	// 	//
	return (
		<div className="relative">
			<div className="absolute top-0 left-0 ">
				<HexGrid
					size={size}
					pieceLocations={pieces}
					setHexCoords={setHexCoords}
					className="absolute top-0 right-0"
				/>
			</div>
			<Canvas
				// this is just about the hackiest code EVER WRITTEN
				// but it does work. This is perhaps to be refactored one day
				// ... or perhaps not...
				width={(CHESSCOLS / 2) * (2 * size) + (CHESSCOLS / 2 - 1) * size}
				height={(CHESSROWS + 1) * (Math.sqrt(3) / 2) * size}
			>
				<CanvasItem x={100} y={100}>
					<Piece piece={0} />
				</CanvasItem>
			</Canvas>
		</div>
	);
}
export default ChessGame;
