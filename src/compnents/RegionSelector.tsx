import React from "react";
import { ALL_COUNTRIES } from "../constants/constants";
import { Country } from "../models/models";
import { onlyUnique } from "./utils";

const RegionSelector = ({
	countries,
	selectRegion,
}: {
	countries: Array<Country>;
	selectRegion: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
	const regionsAll: Array<string | undefined> = countries.map(
		(country) => country.region
	);
	regionsAll.unshift(ALL_COUNTRIES);

	const regionsList = regionsAll.filter(onlyUnique);

	return (
		<div>
			<label htmlFor="regionSelection">Select region:</label>
			<select
				id="regionSelection"
				name="regionSelection"
				onChange={selectRegion}
			>
				{regionsList.map((region) => (
					<option key={region} value={region}>
						{region}
					</option>
				))}
			</select>
		</div>
	);
};

export default RegionSelector;
