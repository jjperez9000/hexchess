/** @format */
function CanvasItem({ x, y, children }) {
	const itemStyle = {
		position: "absolute",
		left: `${x}px`,
		top: `${y}px`,
	};

	return <div style={itemStyle}>{children}</div>;
}
export default CanvasItem;
