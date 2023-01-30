import { onlyUnique } from "../helpers/utils";
import { ALL_COUNTRIES } from "../constants/constants";
import { Country } from "../models/models";
import {
	Label,
	SelectContainer,
	StyledSelect,
} from "../styledComponents/components";

interface Props {
	options: Array<{ value: string; label: string }>;
}

const SelectDropDown = ({
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

	const options = regionsList.map((region) => {
		return { value: region, label: region };
	});

	return (

			<StyledSelect onChange={selectRegion}>
				<option value={ALL_COUNTRIES} disabled>
					Select Region
				</option>
				{options.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</StyledSelect>
	
	);
};

export default SelectDropDown;
