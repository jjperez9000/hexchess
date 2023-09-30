/** @format */
import { useEffect, useState } from "react";
import HexGrid from "./HexGrid";
function ChessGame() {
	const size = 45;
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
		placePiece(1, 0, 0, 0);
	}, []);

	function placePiece(type, q, r, s) {
		const newPieces = [...pieces];
		newPieces[q + 5][r + 5][s + 5] = type;
		setPieces(newPieces);
	}
	return (
		<>
			<HexGrid size={size} pieceLocaitions={pieces} />
		</>
	);
}
export default ChessGame;
