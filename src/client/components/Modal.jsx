import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const Modal = (props) => {
	const [newData, setNewData] = useState();
	const [reload, setReload] = useState(false);

	const submitData = () => {
		if (newData) {
			const data = {
        item: props.title,
				key: props.userKey,
				newData,
			};
			axios.post("https://dropdeads-mysql.herokuapp.com/replace", data).then((res) => {
				if (res.status === 200) {
					Swal.fire(
						`${props.title} change sucesfully`,
						"all data has been change",
						"success"
					);
					setReload(true);
				}
			});
		} else {
			Swal.fire(
				"Null",
				"No data input",
				"warning"
			);
		}
	};

	const handleData = (e) => {
		setNewData(e.target.value);
	};

	if (reload) {
		return <Redirect to="/login" />;
	}

	return (
		<>
			<div
				className="modal fade"
				id={`${props.modalId}`}
				tabIndex="-1"
				aria-labelledby={`${props.modalId}Label`}
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={`${props.modalId}Label`}>
								{`Change ${props.title}`}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form action="" className="form-group">
								<div className="mb-3">
									<label htmlFor="usernameChange" className="form-label">
										{`New ${props.title}`}
									</label>
									<input
										type={props.type}
										className="form-control"
										onChange={handleData}
										minLength="6"
										required
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-outline-secondary"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
							<button
								type="button"
								className="btn btn-outline-dark"
								data-bs-dismiss="modal"
								onClick={submitData}
							>
								Change Data
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
