import React, { useState } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

import Modal from "./Modal";

const Offcanvas = (props) => {
	const [logout, setLogout] = useState(false);

	const handleClose = () => {
		Swal.fire({
			title: "You want close your session?",
			text: "close your sesssion :(",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Yes, i want get out",
			cancelButtonText: "No, let me here",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("You're out", "Your session has been closed", "success");
				setLogout(true);
			}
		});
	};

	if (logout) {
		return <Redirect to="/login" />;
	}
	return (
		<>
			<div
				className="offcanvas offcanvas-end"
				tabIndex="-1"
				id="offcanvasRight"
				aria-labelledby="offcanvasRightLabel"
			>
				<div className="offcanvas-header">
					<h5 id="offcanvasRightLabel">Configuration</h5>
					<button
						type="button"
						className="btn-close text-reset"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					<div className="options">
						<div className="app-options">
							<div className="container text-center">
								<div className="fs-4">App options</div>
								<div className="fs-6 mb-2">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Distinctio dolorum.
								</div>
								<button className="btn btn-outline-dark mb-2 me-1">
									Dark mode
								</button>
								<button className="btn btn-outline-secondary mb-2">
									Light mode
								</button>
							</div>
							<hr />
						</div>

						<div className="user-configuration">
							<div className="fs-4 text-center">User configuration</div>
							<div className="list-group">
								<div className="text-center fs-6 mb-2">
									Lorem ipsum dolor sit amet, <a href="/home">consectetur</a>{" "}
									adipisicing elit. Id veritatis officia eaque facere.
								</div>
								<button
									className="btn btn-outline-dark mb-2"
									type="button"
									data-bs-toggle="modal"
									data-bs-target="#Username"
								>
									Change username
								</button>
								<div className="text-center fs-6">
									Lorem ipsum dolor sit, amet consectetur{" "}
									<a href="/home">adipisicing</a> elit. Id tempore incidunt et
									dolores fugit distinctio.
								</div>
								<button
									className="btn btn-outline-dark"
									type="button"
									data-bs-toggle="modal"
									data-bs-target="#Password"
								>
									Change password
								</button>
							</div>
							<hr />
						</div>

						<div className="close-options">
							<div className="fs-4 text-center">Close options</div>
							<div className="list-group">
								<div className="text-center fs-6 mb-2">
									Lorem ipsum dolor sit amet, <a href="/home">consectetur</a>{" "}
									adipisicing elit. Id veritatis officia eaque facere.
								</div>
								<div className="fs-7 text-center text-muted">
									*This only works in Electron app.*
								</div>
								<button
									className="btn btn-outline-danger mb-2"
									disabled
								>
									Close app
								</button>

								<button
									className="btn btn-outline-danger mb-2"
									onClick={handleClose}
								>
									Close session
								</button>
							</div>
						</div>
					</div>
				</div>
				<Modal user={props.user} modalId="Username" title="name" type="text" />
				<Modal
					user={props.user}
					modalId="Password"
					title="password"
					type="password"
				/>
			</div>
		</>
	);
};

export default Offcanvas;
