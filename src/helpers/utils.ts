import { Country } from "../models/models";

export const onlyUnique = (
	value: string | number | undefined,
	index: number,
	self: (string | number | undefined)[]
) => {
	return self.indexOf(value) === index;
};

export const SortAsc = (x: Country, y: Country) => {
	if (x.name !== undefined && y.name !== undefined) {
		if (x.name < y.name) {
			return -1;
		}
		if (x.name > y.name) {
			return 1;
		}
	}
	return 0;
};

export const SortDesc = (x: Country, y: Country) => {
	if (x.name !== undefined && y.name !== undefined) {
		if (x.name > y.name) {
			return -1;
		}
		if (x.name < y.name) {
			return 1;
		}
	}
	return 0;
};

export const sortCountries = (
	countries: Array<Country>,
	toggleSort: { asc: boolean; desc: boolean }
) => {
	let sortedCountries: Array<Country> = countries;
	if (toggleSort.asc) {
		sortedCountries = [...countries.sort(SortAsc)];
	}
	if (toggleSort.desc) {
		sortedCountries = [...countries.sort(SortDesc)];
	}
	return sortedCountries;
};
