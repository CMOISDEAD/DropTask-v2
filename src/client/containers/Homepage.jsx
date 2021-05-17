import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskCreator from "../components/TaskCreator";
import TaskRow from "../components/TaskRow";
import VisibilityControl from "../components/VisibilityControl";
import axios from "axios";

const Homepage = () => {
	// const [userName, setUserName] = useState("DROPDEADS");
	const [taskItems, setTaskItems] = useState([]);
	const [ShowComplete, setShowComplete] = useState(false);

	useEffect(() => {
		const task2Render = [];
		axios
			.get("/getTasks")
			.then((data) => {
				var taskRes = data.data;
				taskRes.map((task) => {
					var done = task.done ? true : false;
					var foo = {
						name: task.name,
						descrip: task.descrip,
						done,
						time: task.time,
					};
					task2Render.push(foo);
				});
				setTaskItems(task2Render);
			})
			.catch((err) => console.error(err));
	}, []);

	const createNewTask = (name, descrip, time) => {
		if (!taskItems.find((t) => t.name === name) && !name === false) {
			const done = false;
			const response = axios.post("/newTask", { name, descrip, time, done });
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
		var task2Change = taskItems.find((t) => t.name === task.name);
		var request = task2Change.done ? 0 : 1;
		axios.post("/doneTask", { id: task2Change.name, done: request });
	};

	const removeTask = (task) => {
		axios.post("/removeTask", { name: task.name });
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
		<div className="bg-dark">
			<Navbar name="Drodpeads" />
			<div className="container">
				<h1 className="text-center text-white">Hello World</h1>
				<div className="container mx-auto">
					<div className="card-deck mx-auto">
						<TaskCreator callback={createNewTask} />
					</div>
				</div>
				<h3 className="text-center text-white ">Tasks</h3>
				<div className="container">
					<div className="row row-cols-1 row-cols-md-2 g-4 mx-auto">
						{taskTableRows(false)}
					</div>
				</div>
			</div>
			<div className="text-center p2">
				<VisibilityControl
					description="Completed tasks"
					isCheked={ShowComplete}
					callback={(cheked) => setShowComplete(cheked)}
				/>
			</div>
			{ShowComplete && (
				<div className="container bg-dark">
					<div className="row row-cols-1 row-cols-md-3 mx-auto">
						{taskTableRows(true)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Homepage;
