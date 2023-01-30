import { Country } from "../models/models";
import {
	CountryCard,
	CountryDetails,
	CountryName,
	StyledSpan,
} from "../styledComponents/components";

const CountryItem = ({ country }: { country: Country }) => {
	return (
		<CountryCard>
			<StyledSpan>
				Country: <CountryName>{country.name}</CountryName>
			</StyledSpan>
			<StyledSpan>
				Region:<CountryDetails>{country.region}</CountryDetails>
			</StyledSpan>
			<StyledSpan>
				Area size:
				<CountryDetails>{country.area} km2</CountryDetails>
			</StyledSpan>
		</CountryCard>
	);
};

export default CountryItem;
