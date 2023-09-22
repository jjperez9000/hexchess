import React from "react";
import "./Hexagon.css"; // Assuming you saved the CSS in Hexagon.css

function Hexagon({ color }) {
  return (
    <div
      className="hexagon"
      style={{ backgroundColor: color }}
    ></div>
  );
}

function HexagonalChessBoard() {
  const rows = 11;

  // You can choose other colors if you prefer
  const colors = {
    light: "#eee",
    dark: "#444",
  };

  const generateBoard = () => {
    let board = [];
	return <Hexagon />
	
	// for (let i = 0; i < rows; i++) {
    //   let hexRow = [];
    //   let numHexagons = rows + Math.min(i, rows - i - 1);
    //   for (let j = 0; j < numHexagons; j++) {
    //     let color = (i + j) % 2 === 0 ? colors.light : colors.dark;
    //     hexRow.push(<Hexagon key={`${i}-${j}`} color={color} />);
    //   }
    //   board.push(
    //     <div key={i} style={{ display: "flex", justifyContent: "center" }}>
    //       {hexRow}
    //     </div>
    //   );
    // }
    // return board;
  };

  return <div>{generateBoard()}</div>;
}

export default HexagonalChessBoard;
