import React from "react";
import { Country } from "../models/models";
import { Container } from "../styledComponents/components";
import CountryItem from "./CountryItem";

const CountryCard = ({ currentRecords }: { currentRecords: Array<Country> }) => {
	return (
		<Container>
			{currentRecords?.map((country: Country) => (
				<CountryItem
					key={`${country.name}${country.region}${country.area}`}
					country={country}
				></CountryItem>
			))}
		</Container>
	);
};

export default CountryCard;
