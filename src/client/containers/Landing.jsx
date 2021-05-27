import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<>
			<div className="mt-9">
				<div className="border-bottom border-dark mb-2">
					<div className="text-muted text-center">By DROPDEADs</div>
				</div>
				<div className="bg-landing">
					<div className="container text-center text-white">
						<div className="pt-5">
							<div className="h1">DropTasks</div>
							<p className="fs-6">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
								rerum ullam incidunt accusantium ad ipsum laborum ab
								voluptatibus cum officiis nihil impedit eveniet nulla magni eos
								harum, dignissimos dolorem eligendi.
							</p>
							<div className="text-center">
								<Link to="/login">
									<button className="btn btn-dark mb-3 w-75">
										Get started
									</button>
								</Link>
								<Link to="/login">
									<button className="btn btn-outline-light mb-3 w-75">
										Know more
									</button>
								</Link>
							</div>
						</div>
						<i className="fas fa-arrow-down move-arrow"></i>
					</div>
				</div>
				<div className="mt-2 border-top border-dark">
					<div className="text-muted text-center">By DROPDEADs</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
