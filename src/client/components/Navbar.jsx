import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Tasks
				</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{/* <li className="nav-item">
							<Link className="nav-link" to="/home">
								Home
							</Link>
						</li> */}
						<li className="nav-item">
							<Link className="nav-link" to="/register">
								register
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								login
							</Link>
						</li>
					</ul>
				</div>
				<span className="navbar-text">{props.name}</span>
			</div>
		</nav>
	);
};

export default Navbar;
