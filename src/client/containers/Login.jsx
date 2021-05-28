import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
	const [id, setId] = useState();
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();
	const [auth, setAuth] = useState();

	const handleChangeUsername = (e) => {
		setUserName(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://dropdeads-mysql.herokuapp.com/login", { username, password })
			.then((res) => {
				if (res.status === 200) {
					setId(res.data.id);
					setAuth(true);
				}
			})
			.catch((err) => {
				swal("Fail", "the credentials are bad", "error");
			});
	};

	if (auth) {
		return (
			<Redirect
				to={{
					pathname: "/home",
					state: { id: id, username: username, auth: auth },
				}}
			/>
		);
	}

	return (
		<div className="row mx-auto" style={{ height: `100vh` }}>
			<div className="col bg-white">
				<div className="p-2 mb-5">
					<div className="card-title text-center text-uppercase h1 mt-2">
						Login!
					</div>
					<form onSubmit={handleSubmit} className="p-4 mt-3 mb-5">
						<div className="mb-3">
							<p className="text-start fs-4">Username:</p>
							<input
								className="w-100"
								type="text"
								name="username"
								id="username"
								onChange={handleChangeUsername}
								placeholder="username"
							/>
						</div>
						<div className="mb-3">
							<p className="text-start fs-4 ">Password:</p>
							<input
								className="w-100"
								type="password"
								name="password"
								id="password"
								onChange={handleChangePassword}
								placeholder="********"
							/>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								Accept termines of use.
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefaults"
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								Accept recive news.
							</label>
						</div>
						<div className="mt-4">
							<button className="btn btn-dark w-100" type="submit">
								Login
							</button>
						<p className="text-muted text-center mt-2">
							You dont have an account? Create{" "}
							<Link to="/register" className="text-success">
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
				<figure className="text-end">
					<blockquote className="blockquote text-white">
						<p>A well-known quote, contained in a blockquote element.</p>
					</blockquote>
					<figcaption className="blockquote-footer">
						Someone famous in <cite title="Source Title">Source Title</cite>
					</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default Login;
