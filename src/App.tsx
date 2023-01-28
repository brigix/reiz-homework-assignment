import React, { useEffect, useState } from "react";

import "./App.css";
import { fetchData } from "./api/fetchData";
import { Country } from "./models/models";
import { AxiosResponse } from "axios";

function App() {
	const [countries, setCountries] = useState<Array<Country>>();

	useEffect(() => {
		fetchData().then((response: AxiosResponse) => {
			setCountries(response.data);
			console.log(response);
		});
	}, []);

	return (
		<div className="App">
			<ol>
				{countries?.map((country: Country) => (
					<li key={`${country.name}${country.region}${country.areaSize}`}>
						{country.name}
					</li>
				))}
			</ol>
		</div>
	);
}

export default App;
