/** @format */

export default function DebugButton({ vartoprint }) {
	return (
		<div>
			<button onClick={() => console.log(vartoprint)}>Debug</button>
		</div>
	);
}
