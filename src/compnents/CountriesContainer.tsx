import React, { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { Country } from "../models/models";
import { AxiosError, AxiosResponse } from "axios";
import {
	ALL_COUNTRIES,
	DEFAULT_CURRENT_PAGE_NUMBER,
	DEFAULT_RECORDS_PER_PAGE,
} from "../constants/constants";
import Pagination from "./Pagination";
import "../style/style.css";
import RegionSelector from "./RegionSelector";
import { SortAsc, SortDesc } from "./utils";

const CountriesContainer = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [countries, setCountries] = useState<Array<Country>>([]);
	const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
	const [filteredCountries, setFilteredCountries] = useState<Array<Country>>(
		[]
	);
	const [recordsPerPage, setRecordsPerPage] = useState(
		DEFAULT_RECORDS_PER_PAGE
	);
	const [currentRecords, setCurrentRecords] = useState<Array<Country>>([]);

	useEffect(() => {
		fetchData()
			.then((response: AxiosResponse) => {
				if (response.data !== undefined) {
					setCountries(response.data);
					setFilteredCountries(response.data);
					setError(undefined);
				}
				console.log("response", response);
			})
			.catch((err: Error | AxiosError) => {
				setError(err.message);
				console.log("Error", err.message);
			});
	}, []);

	useEffect(() => {
		if (selectedRegion === ALL_COUNTRIES) {
			setFilteredCountries(countries);
		} else {
			const countriesInRegion = countries.filter(
				(country) => country.region === selectedRegion
			);
			setFilteredCountries(countriesInRegion);
		}
		setCurrentPage(DEFAULT_CURRENT_PAGE_NUMBER);
	}, [selectedRegion]);

	const [indexOfFirstRecord, setIndexOfFirstRecord] = useState<number>();
	const [indexOfLastRecord, setIndexOfLastRecord] = useState<number>();

	useEffect(() => {
		console.log("PAGE", currentPage);
		const lastIndex = currentPage * recordsPerPage;
		setIndexOfLastRecord(currentPage * recordsPerPage);
		setIndexOfFirstRecord(lastIndex - recordsPerPage);
	}, [currentPage]);

	useEffect(() => {
		console.log("SET CURRENT COUNTRIES");
		setCurrentRecords(
			filteredCountries?.slice(indexOfFirstRecord, indexOfLastRecord)
		);
	}, [filteredCountries, indexOfFirstRecord, indexOfLastRecord]);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const selectRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log("selected region", event.target.value);
		setSelectedRegion(event.target.value);
	};

	const sortAsc = () => {
		console.log("ASC", filteredCountries.sort(SortAsc));
		const sortedASC = [...filteredCountries.sort(SortAsc)];
		setFilteredCountries(sortedASC);
	};
	const sortDesc = () => {
		console.log("DESC", filteredCountries.sort(SortDesc));
		const sortedDesc = [...filteredCountries.sort(SortDesc)];
		setFilteredCountries(sortedDesc);
	};

	return (
		<div>
			{!!error ? (
				<h4>{error}</h4>
			) : (
				<>
					Sort: <button onClick={sortAsc}>ASC</button>
					<button onClick={sortDesc}>DESC</button>
					<RegionSelector countries={countries} selectRegion={selectRegion} />
					{currentRecords?.map((country: Country) => (
						<div
							className="card"
							key={`${country.name}${country.region}${country.areaSize}`}
						>
							{country.name}
						</div>
					))}
					<Pagination
						recordsPerPage={recordsPerPage}
						totalRecords={filteredCountries?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				</>
			)}
		</div>
	);
};

export default CountriesContainer;
