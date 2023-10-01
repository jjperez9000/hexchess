/** @format */
function Canvas({ width, height, children }) {
	const canvasStyle = {
		width: `${width}px`,
		height: `${height}px`,
		position: "relative",
		border: "1px solid black", // Optional: for visualizing the canvas area
	};

	return <div style={canvasStyle}>{children}</div>;
}
export default Canvas;
