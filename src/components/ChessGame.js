/** @format */
import { useEffect, useState } from "react";
import GenHexCoords from "./HexGrid";
import DebugButton from "./DebugButton";
import { Piece } from "./Pieces";
import Canvas from "./Canvas";
import CanvasItem from "./CanvasItem";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import Hexagon from "./Hexagon";

function ChessGame() {
	const size = 45;
	const CHESSROWS = 21;
	const CHESSCOLS = 12;

	// coordinates of each hexagon
	const [hexCoords, setHexCoords] = useState([]);

	// array of each piece ad their locaion
	const [pieces, setPieces] = useState([{ q: 0, r: 0 }]);
	// function to place a piece
	function placePiece(type, q, r) {
		const newPieces = [...pieces];
		newPieces[q + 5][r + 5][s + 5] = type;
		setPieces(newPieces);
	}
	// when hexCoords gets updated, place the pieces where they need to go
	useEffect(() => {
		setHexCoords(GenHexCoords({ size }));

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
	}, [hexCoords]);

	return (
		<>
			<DebugButton vartoprint={hexCoords} />
			<div
				className="relative"
				style={{
					width: `${
						(CHESSCOLS / 2) * (2 * size) + (CHESSCOLS / 2 - 1) * size
					}px`,
					height: `${(CHESSROWS + 1) * (Math.sqrt(3) / 2) * size}px`,
				}}
			>
				<DndProvider backend={HTML5Backend}>
					<Canvas
						// this is just about the hackiest code EVER WRITTEN
						// but it does work. This is perhaps to be refactored one day
						// ... or perhaps not...
						width={(CHESSCOLS / 2) * (2 * size) + (CHESSCOLS / 2 - 1) * size}
						height={(CHESSROWS + 1) * (Math.sqrt(3) / 2) * size}
					>
						{hexCoords.flat().map(
							(coord, index) =>
								coord && (
									<SmartHexagon
										key={index}
										x={coord.x}
										y={coord.y}
										color={coord.color}
										radius={size}
										onClick={() => {
											console.log(coord.q, coord.r, coord.s);
										}}
									/>
								)
						)}

						<MoveablePiece x={10} y={20} />
					</Canvas>
				</DndProvider>
			</div>
		</>
	);
}
function MoveablePiece(props) {
	return (
		<div onClick={() => {}}>
			<Piece x={props.x} y={props.y} piece={0} />
		</div>
	);
}

function SmartHexagon({ x, y, radius = 10, color, onClick, piece }) {
	return (
		<div onClick={onClick}>
			<CanvasItem x={x - radius - 1} y={y - (radius - 5)}>
				<svg x={x} y={y} width={radius * 2} height={radius * 2}>
					{/* to be used later when piece moving is working */}
					{/* <circle cx={radius} cy={radius} r={radius} fill="green" /> */}
					<Hexagon x={0} y={0} size={radius} color={color} />
				</svg>
			</CanvasItem>
		</div>
	);
}

export default ChessGame;
