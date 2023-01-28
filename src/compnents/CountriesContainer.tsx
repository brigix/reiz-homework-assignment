import React, { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { Country } from "../models/models";
import { AxiosResponse } from "axios";
import {
	DEFAULT_CURRENT_PAGE_NUMBER,
	DEFAULT_RECORDS_PER_PAGE,
} from "../constants/constants";
import Pagination from "./Pagination";

const CountriesContainer = () => {
	const [countries, setCountries] = useState<Array<Country>>();
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
	const [recordsPerPage, setRecordsPerPage] = useState(
		DEFAULT_RECORDS_PER_PAGE
	);

	useEffect(() => {
		fetchData().then((response: AxiosResponse) => {
			setCountries(response.data);
			console.log(response);
		});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currenRecords = countries?.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
	return (
		<div>
			<ol>
				{currenRecords?.map((country: Country) => (
					<li key={`${country.name}${country.region}${country.areaSize}`}>
						{country.name}
					</li>
				))}
			</ol>
			<Pagination
				recordsPerPage={recordsPerPage}
				totalRecords={countries?.length}
				paginate={paginate}
			/>
		</div>
	);
};

export default CountriesContainer;
