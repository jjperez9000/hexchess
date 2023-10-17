/** @format */
import { useEffect, useState } from "react";
import HexGrid from "./HexGrid";
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
	const [pieces, setPieces] = useState([{ x: 0, y: 0 }]);
	// when hexCoords gets updated, place the pieces where they need to go
	useEffect(() => {
		for (let q = 0; q < hexCoords.length; q++) {
			for (let r = 0; r < hexCoords[q].length; r++) {}
		}
		console.log(hexCoords);
	}, [hexCoords]);

	const [selectedPiece, setSelectedPiece] = useState(null);

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
				<div className="absolute top-0 left-0 ">
					<HexGrid
						size={size}
						setHexCoords={setHexCoords}
						className="absolute top-0 right-0"
					/>
				</div>
				<DndProvider backend={HTML5Backend}>
					<div
						onClick={(e) => {
							const rect = e.currentTarget.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const y = e.clientY - rect.top;
							console.log(`x: ${x}, y: ${y}`);
						}}
					>
						<Canvas
							// this is just about the hackiest code EVER WRITTEN
							// but it does work. This is perhaps to be refactored one day
							// ... or perhaps not...
							width={(CHESSCOLS / 2) * (2 * size) + (CHESSCOLS / 2 - 1) * size}
							height={(CHESSROWS + 1) * (Math.sqrt(3) / 2) * size}
						>
							{hexCoords
								.flat()
								.map(
									(coord, index) =>
										coord && (
											<Circle
												key={index}
												x={coord.x}
												y={coord.y}
												color={coord.color}
												radius={size}
											/>
										)
								)}

							<MoveablePiece x={10} y={20} />
						</Canvas>
					</div>
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

function Circle({ x, y, radius = 10, color, onClick }) {
	return (
		<div onClick={onClick}>
			<CanvasItem x={x - radius - 1} y={y - (radius - 5)}>
				<svg x={x} y={y} width={radius * 2} height={radius * 2}>
					{/* <circle cx={radius} cy={radius} r={radius} fill="green" /> */}
					<Hexagon x={0} y={0} size={radius} color={color} />
				</svg>
			</CanvasItem>
		</div>
	);
}

export default ChessGame;
