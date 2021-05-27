import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Register = () => {
	const [name, setUserName] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [auth, setAuth] = useState(false);

	const handleChangeUsername = (e) => {
		setUserName(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/newUser", { name, password, email })
			.then((res) => {
				if (res.status === 200) {
					swal("Sucess", "You are a new user!!", "success");
					setAuth(true);
				} else {
					swal("Sorry", "Something bad", "error");
				}
			});
	};

	return (
		<>
			<div className="row mx-auto" style={{ height: `100vh` }}>
				<div className="col bg-white">
					<div className="p-2 mb-5">
						<div className="card-title text-center text-uppercase h1">
							Register!
						</div>
						<form onSubmit={handleSubmit} className="p-4 mt-3 mb-5">
							<div className="mb-3">
								<p className="text-start fs-4">Username:</p>
								<input
									className="w-100"
									type="text"
									name="username"
									id="username"
									placeholder="username"
									onChange={handleChangeUsername}
								/>
							</div>
							<div className="mb-3">
								<p className="text-start fs-4">Password:</p>
								<input
									className="w-100"
									type="password"
									name="password"
									id="password"
									placeholder="*********"
									onChange={handleChangePassword}
								/>
							</div>
							<div className="mb-3">
								<p className="text-start fs-4">Email:</p>
								<input
									className="w-100"
									type="text"
									name="email"
									id="email"
									placeholder="email@gmail.com"
									onChange={handleChangeEmail}
								/>
							</div>
							<div className="text-center">
								<button className="btn btn-dark w-100" type="submit">
									Register
								</button>
								<p className="text-muted text-center mt-2">
									You ready have an account? Login{" "}
									<Link to="/login" className="text-success">
										here
									</Link>
								</p>
							</div>
						</form>
					</div>
					<div className="text-muted p-4 right-mark">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eum
						dolore harum vel, voluptatem id veniam pariatur! Fugiat, quaerat
						obcaecati. Culpa deserunt error eveniet laborum nulla natus pariatur
						itaque architecto.
					</div>
				</div>
				<div className="col-9 wallpapers">
					<figure className="text-center p-3 m-1">
						<blockquote className="blockquote text-white">
							<p>
								UNIX is basically a simple operating system,
								<br /> but you have to be a genius to understand the simplicity.
							</p>
						</blockquote>
						<figcaption className="blockquote-footer">
							Creator of c <cite title="Source Title">Dennis Ritchie</cite>
						</figcaption>
					</figure>
				</div>
			</div>
		</>
	);
};

export default Register;
