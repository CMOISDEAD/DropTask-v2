import React, { useState } from "react";
import moment from "moment";

const TaskCreator = (props) => {
	const [newTaskName, setNewTaskName] = useState("");
	const [newTaskDesc, setNewTaskDesc] = useState("");
	const [newTaskTime, setNewTaskTime] = useState("");

	const updateNewTaskValue = (e) => {
		setNewTaskName(e.target.value);
		setNewTaskTime(moment().format("MMM Do YY"));
	};

	const updateNewTaskValueText = (e) => {
		setNewTaskDesc(e.target.value);
	};

	const createNewTask = () => {
		props.callback(newTaskName, newTaskDesc, newTaskTime);
		setNewTaskName("");
		setNewTaskDesc("");
	};

	return (
		<div className="card text-center bg-dark text-white">
			<div className="card-body">
				{/* <form action="/newTask" method="post">
				</form> */}
					<h5 className="card-title">Add Tasks</h5>
					<input
						type="text"
						name="name"
						className="form-control bg-secondary text-white"
						onChange={updateNewTaskValue}
					/>
					<h5 className="card-title">Description</h5>
					<textarea
						type="text"
						name="descrip"
						className="form-control bg-secondary text-white"
						onChange={updateNewTaskValueText}
					/>
					<div>
						<h5 className="card-title">Time</h5>
						<input type="text" name="time" className="h5" value={moment().format("MMM Do YY")} disabled/>
					</div>
					<button className="btn btn-danger mt-1" onClick={createNewTask}>
						+
					</button>
			</div>
		</div>
	);
};

export default TaskCreator;
