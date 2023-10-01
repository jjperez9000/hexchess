/** @format */

import React from "react";
import "./App.css";
import ChessGame from "./components/ChessGame";
import Canvas from "./components/Canvas";
import CanvasItem from "./components/CanvasItem";
function App() {
	return (
		<div className="p-24">
			<ChessGame />
		</div>
	);
}

export default App;
