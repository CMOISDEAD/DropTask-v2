import React from "react";
import { Link } from "react-router-dom";
import Offcanvas from "./Offcanvas";

const Navbar = (props) => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<span className="navbar-brand">
						<i className="fas fa-thumbtack"></i>
						{""}TASKs
					</span>
					<button
						className="btn navbar-text"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasRight"
						aria-controls="offcanvasRight"
					>
						<i className="fas fa-user-cog"></i>
						{` ${props.name}`}
					</button>
				</div>
			</nav>
			<Offcanvas user={props.name}/>
		</>
	);
};

export default Navbar;
