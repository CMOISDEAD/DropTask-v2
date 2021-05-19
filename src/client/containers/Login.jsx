import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert"

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
		axios.post("http://localhost:3000/login", { username, password }).then((res) => {
			setAuth(true)
			setId(res.data.id)
		}).catch((err)=>{
			if (err) throw err;
			swal("Fail","the credentials are bad", "error")
		})
	};

	if(auth){
		return(
			<Redirect to={{
				pathname:"/home",
				state: id
			}}/>
		)
	}

	return (
		<>
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<div className="col">
						<div className="card" style={{ width: `18rem` }}>
							<div className="card-body">
								<div className="card-title text-center text-capitalize h1">
									Login!
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
									<div className="text">
										<button className="btn btn-dark w-100" type="submit">
											Login
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

export default Login;
