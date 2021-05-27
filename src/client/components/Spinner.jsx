import React from "react";

const Spinner = () => {
	return (
		<div className="d-flex justify-content-center fs-6 border-bottom border-dark p-2">
			<div className="spinner-border" role="status" style={{width: `2rem`, height: `2rem`}}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
