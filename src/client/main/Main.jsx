import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../containers/Homepage";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Navbar from "../components/Navbar";

const Main = () => {
	return (
		<Router>
			<Navbar name="Drodpeads" />
			
			<Switch>
				<Route path="/home" exact>
					<Homepage />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/login" exact>
					<Login />
				</Route>
			</Switch>
		</Router>
	);
};

export default Main;
