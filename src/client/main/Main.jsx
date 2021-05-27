import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Homepage from "../containers/Homepage";
import Register from "../containers/Register";
import Loading from "../containers/Loading";
import Landing from "../containers/Landing";
import Layout from "../components/Layout";
import Login from "../containers/Login";
import "../styles/main.scss";

const Main = () => {
	return (
		<Layout>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Landing />
					</Route>
					<Route
						path="/home"
						render={(props) => <Homepage {...props} />}
						exact
					/>
					<Route path="/register" exact>
						<Register />
					</Route>
					<Route path="/login" exact>
						<Login />
					</Route>
					<Route path="/loading" exact>
						<Loading />
					</Route>
				</Switch>
			</Router>
		</Layout>
	);
};

export default Main;
