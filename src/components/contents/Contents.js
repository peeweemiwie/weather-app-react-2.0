import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from '../Api';
import Form from '../Form';
import Current from '../current/Current';
import './Contents.scss';

const Contents = (props) => {
	const [weatherData, setWeatherData] = useState({ loaded: false });
	const [units, setUnits] = useState('imperial');
	const defaultCity = 'New York';

	const setImportedData = (response) => {
		const data = response.data;
		setWeatherData({
			loaded: true,
			city: data.name,
			coord: data.coord,
			temperature: Math.round(data.main.temp),
			feelsLike: Math.round(data.main.feels_like),
			humidity: data.main.humidity,
			weather: data.weather[0].main,
			description: data.weather[0].description,
			icon: data.weather[0].icon,
			wind: Math.round(data.wind.speed),
		});
	};

	const setReceivedUnit = (value) => {
		setUnits(value);
	};

	// Initial rendering
	if (!weatherData.loaded) {
		const baseUrl = `${apiEndpoint}weather?q=${defaultCity}&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(setImportedData);
	}

	return (
		<div className='Contents'>
			<Form
				onReceivedData={setImportedData}
				onReceivedUnits={setReceivedUnit}
			/>
			{weatherData.loaded ? (
				<Current data={weatherData} units={units} />
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default Contents;
