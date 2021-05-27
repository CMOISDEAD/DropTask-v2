import React from "react";

const VisbilityControl = (props) => {
	return (
		<footer className="bg-light text-center">
			<input
				type="checkbox"
				className=""
				checked={props.isChecked}
				onChange={(e) => props.callback(e.target.checked)}
			/>
			<label htmlFor="form-check-label text-dark">
				Show {props.description}
			</label>
		</footer>
	);
};

export default VisbilityControl;
