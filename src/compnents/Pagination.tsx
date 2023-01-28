import React, { useEffect } from "react";
import "../style/style.css";

const Pagination = ({
	recordsPerPage,
	totalRecords,
	paginate,
}: {
	recordsPerPage: number;
	totalRecords: number | undefined;
	paginate: (pageNumber: number) => void;
}) => {
	const pageNumbers: Array<number> = [];
	console.log("page numberS:", pageNumbers);

	if (!!totalRecords) {
		for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
			pageNumbers.push(i);
		}
	}

	return (
		<div className="center">
			<div className="flex row">
				{pageNumbers.map((number) => (
					<div
						className="page-item"
						key={number}
						onClick={() => paginate(number)}
					>
						{number}
					</div>
				))}
			</div>
		</div>
	);
};

export default Pagination;
