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
		<div className="card text-center bg-light text-dark">
			<div className="card-body">
				<h5 className="card-title">
					<i className="fas fa-tasks"></i> {""}
					Add Tasks
				</h5>
				<input
					type="text"
					name="name"
					className="form-control bg-white text-dark"
					onChange={updateNewTaskValue}
				/>
				<h5 className="card-title">
					<i className="fas fa-text-height"></i> {""}
					Description
				</h5>
				<textarea
					type="text"
					name="descrip"
					className="form-control bg-white text-dark"
					onChange={updateNewTaskValueText}
				/>
				<div>
					<h5 className="card-title">
						<i className="fas fa-clock"></i>
						{""}
						Time
					</h5>
					<input
						type="text"
						name="time"
						className="h5 text-center bg-white text-dark border-0"
						value={moment().format("MMM Do YY")}
						disabled
					/>
				</div>
				<button className="btn btn-danger mt-1" onClick={createNewTask}>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</div>
	);
};

export default TaskCreator;
