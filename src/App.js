/** @format */

import React from "react";
import Hexagon from "./components/Hexagon";
import HexGrid from "./components/HexGrid";
import "./App.css";
import { tsAnyKeyword } from "@babel/types";

function App() {
	return (
		<div className="p-24">
			{/* <Hexagon text="0, 0, 0" /> */}
			<HexGrid rows={5} cols={5} size={100} />
		</div>
	);
}

export default App;
