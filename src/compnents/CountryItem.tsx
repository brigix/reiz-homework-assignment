import { Country } from "../models/models";
import {
	CountryCard,
	CountryDetails,
	CountryName,
	Field,
	StyledSpan,
} from "../styledComponents/components";

const CountryItem = ({ country }: { country: Country }) => {
	return (
		<CountryCard>
			<StyledSpan>
				<Field>Country:</Field>
				<Field>Region:</Field>
				<Field>Area size:</Field>
			</StyledSpan>
			<StyledSpan>
				<CountryName>{country.name}</CountryName>
				<CountryDetails>{country.region}</CountryDetails>
				<CountryDetails>{country.area} km2</CountryDetails>
			</StyledSpan>
		</CountryCard>
	);
};

export default CountryItem;
