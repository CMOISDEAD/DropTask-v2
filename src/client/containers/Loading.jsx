import React from "react";

import Spinner from "../components/Spinner";

const Loading = () => {
	return (
		<div className="">
			<div className="text-center loading-text mb-4">
			<p className="text-muted border-bottom border-dark">By DROPDEADs</p>
				<strong className="text-dark mb-2 p-2">
					Connecting with the <i className="text-success">server</i> please
					wait...
				</strong>
			</div>
			<Spinner />
			<p className="text-muted text-center">By DROPDEADs</p>
		</div>
	);
};

export default Loading;
