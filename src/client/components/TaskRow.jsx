import React from "react";

const TaskRow = (props) => (
	<div className="col mb-4">
		<div className="card text-white bg-dark" key={props.task.name}>
			<div className="card-body">
				<p className="card-title h5">{props.task.name}</p>
				<p className="card-text">{props.task.descrip}</p>
			</div>
			<div className="card-footer row justify-content-between">
				<div className="col">
					<small>Complete ? </small>
					<input
						type="checkbox"
						checked={props.task.done}
						onChange={() => {
							props.toggleTask(props.task);
						}}
					/>
					<div>{props.task.time}</div>
				</div>
				<div className="col text-end">
          <button className="btn btn-danger" onClick={()=>{
            props.removeTask(props.task)
          }}>X</button>
        </div>
			</div>
		</div>
	</div>
);

export default TaskRow;
