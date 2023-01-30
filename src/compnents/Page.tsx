import React, { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { Country } from "../models/models";
import { AxiosError, AxiosResponse } from "axios";
import {
	ALL_COUNTRIES,
	DEFAULT_CURRENT_PAGE_NUMBER,
	DEFAULT_RECORDS_PER_PAGE,
	LITHUANIA,
} from "../constants/constants";
import Pagination from "./Pagination";
import { SortAsc, SortDesc } from "../helpers/utils";
import {
	Button,
	PageContainer,
	ErrorMessage,
	NavBar,
	RightSide,
	ToggleButton,
	ErrorContainer,
	LeftSide,
	LeftToggleButton,
	RightToggleButton,
	StyledSort,
	Header,
	ArrowUp,
	ArrowDown,
} from "../styledComponents/components";
import { ThemeProvider } from "styled-components";
import { countryTheme } from "../styledComponents/country-theme";
import SelectDropDown from "./SelectDropDown";
import CountriesContainer from "./CountriesContainer";
import { LDSSpinner } from "../styledComponents/LDSSpinner";

const Page = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [countries, setCountries] = useState<Array<Country>>([]);
	const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
	const [filteredCountries, setFilteredCountries] = useState<Array<Country>>(
		[]
	);
	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE_NUMBER);
	const [indexOfFirstRecord, setIndexOfFirstRecord] = useState<number>();
	const [indexOfLastRecord, setIndexOfLastRecord] = useState<number>();
	const [recordsPerPage, setRecordsPerPage] = useState(
		DEFAULT_RECORDS_PER_PAGE
	);
	const [currentRecords, setCurrentRecords] = useState<Array<Country>>([]);

	const [toggleSort, setToggleSort] = useState<{ asc: boolean; desc: boolean }>(
		{ asc: false, desc: false }
	);
	const [isSmallerFiltered, setIsSmallerFiltered] = useState<boolean>(false);

	useEffect(() => {
		fetchData()
			.then((response: AxiosResponse) => {
				if (response.data !== undefined) {
					setCountries(response.data);
					setFilteredCountries(response.data);
					setError(undefined);
				}
			})
			.catch((err: Error | AxiosError) => {
				setError(err.message);
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

	useEffect(() => {
		const lastIndex = currentPage * recordsPerPage;
		setIndexOfLastRecord(currentPage * recordsPerPage);
		setIndexOfFirstRecord(lastIndex - recordsPerPage);
	}, [currentPage]);

	useEffect(() => {
		setCurrentRecords(
			filteredCountries?.slice(indexOfFirstRecord, indexOfLastRecord)
		);
	}, [filteredCountries, indexOfFirstRecord, indexOfLastRecord]);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const selectRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(event.target.value);
	};

	const sortAsc = () => {
		const sortedASC = [...filteredCountries.sort(SortAsc)];
		setFilteredCountries(sortedASC);
		setToggleSort({ asc: true, desc: false });
	};
	const sortDesc = () => {
		const sortedDesc = [...filteredCountries.sort(SortDesc)];
		setFilteredCountries(sortedDesc);
		setToggleSort({ asc: false, desc: true });
	};

	const filterSmallerCountries = () => {
		const Lithuania: Country | undefined = countries.find(
			(country: Country) => country.name === LITHUANIA
		);
		console.log(Lithuania);
		if (Lithuania !== undefined && !isSmallerFiltered) {
			const smallerCountries = filteredCountries.filter(
				(country: Country) => country.area < Lithuania.area
			);
			setFilteredCountries(smallerCountries);
			setIsSmallerFiltered(true);
		} else {
			setFilteredCountries(countries);
			setIsSmallerFiltered(false);
		}
		setCurrentPage(DEFAULT_CURRENT_PAGE_NUMBER);
	};

	const SortingMenu = () => {
		return (
			<StyledSort>
				Sort by name:
				<LeftToggleButton onClick={sortAsc} isSelected={toggleSort.asc}>
					<ArrowUp />
				</LeftToggleButton>
				<RightToggleButton onClick={sortDesc} isSelected={toggleSort.desc}>
					<ArrowDown />
				</RightToggleButton>
			</StyledSort>
		);
	};

	const FilterMenu = () => {
		return (
			<>
				<SelectDropDown countries={countries} selectRegion={selectRegion} />
				<ToggleButton
					onClick={filterSmallerCountries}
					isSelected={isSmallerFiltered}
				>
					 Smaller than Lithuania
				</ToggleButton>
			</>
		);
	};

	const Error = () => {
		return (
			<ErrorContainer>
				<ErrorMessage>
					{`${error}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`:(`}
				</ErrorMessage>
			</ErrorContainer>
		);
	};

	return (
		<ThemeProvider theme={countryTheme}>
			<PageContainer>
				{/* 	<LDSSpinner /> */}
				{!!error ? (
					<Error />
				) : (
					<>
						<Header>Countries</Header>
						<NavBar>
							<LeftSide>
								<SortingMenu />
							</LeftSide>
							<RightSide>
								<FilterMenu />
							</RightSide>
						</NavBar>
						<CountriesContainer currentRecords={currentRecords} />
						<Pagination
							recordsPerPage={recordsPerPage}
							totalRecords={filteredCountries?.length}
							currentPage={currentPage}
							paginate={paginate}
						/>
					</>
				)}
			</PageContainer>
		</ThemeProvider>
	);
};

export default Page;
