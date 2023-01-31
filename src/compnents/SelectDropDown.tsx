import { onlyUnique } from "../helpers/utils";
import { ALL_COUNTRIES } from "../constants/constants";
import { Country } from "../models/models";
import {
	StyledSelect,
} from "../styledComponents/components";

interface Props {
	options: Array<{ value: string; label: string }>;
}

const SelectDropDown = ({
	countries,
	selectRegion,
	selectedRegion,
}: {
	countries: Array<Country>;
	selectRegion: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	selectedRegion: string | undefined;
}) => {
	const regionsAll: Array<string | undefined> = countries.map(
		(country) => country.region
	);

	regionsAll.unshift(ALL_COUNTRIES);

	const regionsList = regionsAll.filter(onlyUnique);

	const options = regionsList.map((region) => {
		return { value: region, label: region };
	});

	return (
		<StyledSelect onChange={selectRegion} value={selectedRegion}>
			{options.map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</StyledSelect>
	);
};

export default SelectDropDown;
