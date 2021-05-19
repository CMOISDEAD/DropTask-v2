import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Register = () => {
	const [name, setUserName] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();

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
		axios.post("http://localhost:3000/newUser", { name, password, email }).then((res) => {
			if (res.status === 200) {
				swal("Sucess", "You are a new user!!", "success");
			} else {
				swal("Sorry", "Something bad", "error");
			}
		});
	};

	return (
		<>
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<div className="col">
						<div className="card" style={{ width: `18rem` }}>
							<div className="card-body">
								<div className="card-title text-center text-capitalize h1">
									Register!
								</div>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<p className="text-start fs-4">Username:</p>
										<input
											className="w-100"
											type="text"
											name="username"
											id="username"
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
											onChange={handleChangeEmail}
										/>
									</div>
									<div className="text-center">
										
										<button className="btn btn-dark w-100" type="submit">
											Register
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
