import React, { useEffect } from "react";
import styles from "../style/style.module.css";
import { PageNumber, Paginator } from "../styledComponents/components";

const Pagination = ({
	recordsPerPage,
	totalRecords,
	currentPage,
	paginate,
}: {
	recordsPerPage: number;
	totalRecords: number | undefined;
	currentPage: number | undefined;
	paginate: (pageNumber: number) => void;
}) => {
	const pageNumbers: Array<number> = [];

	if (!!totalRecords) {
		for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
			pageNumbers.push(i);
		}
	}

	return (
		<Paginator>
			{pageNumbers.map((number) => (
				<PageNumber
					isSelected={number === currentPage}
					key={number}
					onClick={() => paginate(number)}
				>
					{number}
				</PageNumber>
			))}
		</Paginator>
	);
};

export default Pagination;
