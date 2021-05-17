import React from "react";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#" rel="norreferer">
					Navbar w/ text
				</a>
				<span className="navbar-text">
          {props.name}
        </span>
			</div>
		</nav>
	);
};

export default Navbar