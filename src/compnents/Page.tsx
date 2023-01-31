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
import { SortAsc, sortCountries, SortDesc } from "../helpers/utils";
import {
	PageContainer,
	ErrorMessage,
	NavBar,
	RightSide,
	ErrorContainer,
	LeftSide,
	LeftToggleButton,
	RightToggleButton,
	StyledSort,
	Header,
	ArrowUp,
	ArrowDown,
	SingleToggleButton,
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
	const [Lithuania, setLithuania] = useState<Country | undefined>();

	useEffect(() => {
		fetchData()
			.then((response: AxiosResponse) => {
				if (response.data !== undefined) {
					setCountries(response.data);
					setFilteredCountries(response.data);
					const Lithuania: Country | undefined = response.data.find(
						(country: Country) => country.name === LITHUANIA
					);
					setLithuania(Lithuania);
					setError(undefined);
				}
			})
			.catch((err: Error | AxiosError) => {
				setError(err.message);
			});
	}, []);

	// PAGINATOR
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

	// FILTERING LOGIC

	useEffect(() => {
		let countriesByRegion: Array<Country> = [];
		if (selectedRegion === ALL_COUNTRIES) {
			countriesByRegion = countries;
			setFilteredCountries(countries);
		} else {
			countriesByRegion = countries.filter(
				(country) => country.region === selectedRegion
			);
		}
		if (isSmallerFiltered && Lithuania !== undefined) {
			countriesByRegion = countriesByRegion.filter(
				(country: Country) => country.area < Lithuania.area
			);
		}
		countriesByRegion = sortCountries(countriesByRegion, toggleSort);
		setFilteredCountries(countriesByRegion);
		setCurrentPage(DEFAULT_CURRENT_PAGE_NUMBER);
	}, [selectedRegion]);

	const selectRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(event.target.value);
	};

	const filterSmallerCountries = () => {
		let countriesList: Array<Country> = [];
		if (isSmallerFiltered) {
			if (selectedRegion !== ALL_COUNTRIES && selectedRegion !== undefined) {
				countriesList = countries.filter(
					(country) => country.region === selectedRegion
				);
			} else {
				countriesList = countries;
			}
			setIsSmallerFiltered(false);
		} else if (Lithuania !== undefined) {
			countriesList = filteredCountries.filter(
				(country: Country) => country.area < Lithuania.area
			);

			setIsSmallerFiltered(true);
		}
		countriesList = sortCountries(countriesList, toggleSort);
		setFilteredCountries(countriesList);
		setCurrentPage(DEFAULT_CURRENT_PAGE_NUMBER);
	};

	// SORTING

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

	// COMPONENTS

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
				<SelectDropDown
					countries={countries}
					selectRegion={selectRegion}
					selectedRegion={selectedRegion}
				/>
				<SingleToggleButton
					onClick={filterSmallerCountries}
					isSelected={isSmallerFiltered}
				>
					Smaller than Lithuania
				</SingleToggleButton>
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
