/** @format */

function DraggableComponent(props) {
	const type = "piece";
	const id = 1;
	const [position, setPosition] = useState({ x: 20, y: 0 });
	const collect = (monitor) => {
		const result = {
			isDragging: monitor.isDragging(),
			// ... any other collected props
		};
		if (result.isDragging && !wasDragging) {
			console.log("Drag began");
		}
		wasDragging = result.isDragging;
		return result;
	};
	let wasDragging = false;
	const [, ref, preview] = useDrag(() => ({
		type,
		item: { id },
		collect,
		end: (item, monitor) => {
			console.log("Drag ended");
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				setPosition({ x: dropResult.x, y: dropResult.y });
			}
		},
	}));

	return (
		<div ref={preview}>
			<div ref={ref}>
				<Piece x={position.x} y={position.y} piece={0} />
			</div>
		</div>
	);
}
