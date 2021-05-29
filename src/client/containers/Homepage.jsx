import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import VisibilityControl from "../components/VisibilityControl";
import TaskCreator from "../components/TaskCreator";
import TaskRow from "../components/TaskRow";
import Navbar from "../components/Navbar";

const Homepage = (props) => {
	const [user, setUser] = useState({
		id: props.location.state.id,
		username: props.location.state.username,
		auth: props.location.state.auth,
	});
	const [taskItems, setTaskItems] = useState([
		{
			name: "Task for you",
			descrip: "Made with love",
			done: false,
			time: "infinte",
		},
	]);
	const [ShowComplete, setShowComplete] = useState(false);

	useEffect(() => {
		if (user.auth) {
			const task2Render = [];
			axios
				.post("https://droptasks-mysql.herokuapp.com/getTasks", { id: user.id })
				.then((data) => {
					if (data.status === 200 && data.data != null) {
						var taskRes = data.data;
						taskRes.map((task) => {
							var done = task.done ? true : false;
							var foo = {
								key: task.key,
								name: task.name,
								descrip: task.descrip,
								done,
								time: task.time,
							};
							task2Render.push(foo);
						});
						setTaskItems(task2Render);
					} else {
						setTaskItems({
							name: "No task added yet :(",
							descrip: "add one ",
							done: false,
							time: "now",
						});
					}
				})
				.catch((err) => {
					Swal.fire(
						"We cant connect with the database",
						"try close and open again",
						"error"
					);
					console.error(err);
				});
		} else {
			Swal.fire(
				"We cant connect with the database",
				"try close and open again",
				"error"
			);
			throw "error";
		}
	}, []);

	const createNewTask = (name, descrip, time) => {
		if (!taskItems.find((t) => t.name === name) && !name === false) {
			const done = false;
			axios.post("https://droptasks-mysql.herokuapp.com/newTask", {
				name,
				descrip,
				time,
				done,
				user_id: user.id,
			});
			setTaskItems([...taskItems, { name, descrip, time, done }]);
			swal("Sucess", "Task add sucessfully", "success");
		} else {
			if (taskItems.find((t) => t.name === taskName)) {
				var errName = "Invalid Name";
				toastW(errName);
			} else if (taskName === "") {
				var errName = "Name null";
				toastW(errName);
			}
		}
	};

	const toastW = (errName) => swal(errName, "sorry dude", "error");

	const toggleTask = (task) => {
		setTaskItems(
			taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
		);
		var task2Change = taskItems.find((t) => t.key === task.key);
		var request = task2Change.done ? 0 : 1;
		axios.post("https://droptasks-mysql.herokuapp.com/doneTask", {
			id: task2Change.key,
			done: request,
			user_id: user.id,
		});
	};

	const removeTask = (task) => {
		axios.post("https://droptasks-mysql.herokuapp.com/removeTask", {
			key: task.key,
			id: user.id,
		});
		const newTasks = taskItems.filter((t) => {
			return t.key != task.key;
		});
		setTaskItems(newTasks);
		swal(`Task ${task.name} was removed`, "Task remove sucessfully", "success");
	};

	const taskTableRows = (doneValue) =>
		taskItems
			.filter((task) => task.done === doneValue)
			.map((task) => (
				<TaskRow
					task={task}
					toggleTask={toggleTask}
					key={task.name}
					descrip={task.descrip}
					time={task.time}
					removeTask={removeTask}
				/>
			));

	return (
		<div className="bg-img">
			<Navbar username={user.username} userKey={user.id} />
			<div className="d-flex flex-column min-vh-100">
				<div className="container">
					<h1 className="text-center text-white text-capitalize mt-2">{`Welcome ${user.username}`}</h1>
					<div className="container mx-auto">
						<div className="card-deck mx-auto">
							<TaskCreator callback={createNewTask} />
						</div>
					</div>
					<h3 className="text-center text-white mt-3 mb-4">Tasks</h3>
					<div className="container">
						<div className="row row-cols-1 row-cols-md-2 g-4 mx-auto">
							{taskTableRows(false)}
						</div>
					</div>
				</div>
				<div className="mt-auto">
					<VisibilityControl
						description="Completed tasks"
						isCheked={ShowComplete}
						callback={(cheked) => setShowComplete(cheked)}
					/>
				</div>
				{ShowComplete && (
					<div className="container mt-4">
						<div className="row row-cols-1 row-cols-md-2 g-4 mx-auto">
							{taskTableRows(true)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
Homepage.defaultProps = {
	id: "1",
	username: "default",
	auth: false,
};

export default Homepage;
