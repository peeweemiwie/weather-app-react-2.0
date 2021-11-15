import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from '../Api';
import Form from '../Form';
import Current from '../current/Current';
import Forecast from '../forecast/Forecast';
import './Contents.scss';

const Contents = (props) => {
	const [arrayLoaded, setArrayLoaded] = useState(false);
	const [weatherData, setWeatherData] = useState({ loaded: false });
	const [units, setUnits] = useState('imperial');
	const [weatherArray, setWeatherArray] = useState([]);
	const defaultCity = 'New York';

	const setImportedData = (response) => {
		const data = response.data;
		setWeatherData({
			loaded: true,
			city: data.name,
			lon: data.coord.lon,
			lat: data.coord.lat,
			temperature: Math.round(data.main.temp),
			feelsLike: Math.round(data.main.feels_like),
			humidity: data.main.humidity,
			weather: data.weather[0].main,
			description: data.weather[0].description,
			icon: data.weather[0].icon,
			wind: Math.round(data.wind.speed),
		});
		getForecastData();
	};

	const createForecastResponseArray = (response) => {
		let selectedWeatherArray = response.data.daily.map((item) => {
			return {
				description: item.weather[0].description,
				weatherIcon: item.weather[0].icon,
				tempMax: Math.round(item.temp.max),
				tempMin: Math.round(item.temp.min),
				dt: item.dt,
			};
		});
		setWeatherArray(selectedWeatherArray);
		setArrayLoaded(true);
	};

	const getForecastData = () => {
		if (weatherData.loaded) {
			const baseUrl = `${apiEndpoint}onecall?lat=${weatherData.lat}&lon=${weatherData.lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
			axios.get(baseUrl).then(createForecastResponseArray);
		}
	};

	const setReceivedUnit = (value) => {
		setUnits(value);
	};

	if (!arrayLoaded) {
		const baseUrl = `${apiEndpoint}weather?q=${defaultCity}&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(setImportedData);
	}

	return (
		<div className='Contents'>
			<Form
				onReceivedData={setImportedData}
				onReceivedUnits={setReceivedUnit}
			/>
			{arrayLoaded ? (
				<main className='Main' data-units={units}>
					<Current data={weatherData} />
					<Forecast data={weatherArray} loaded={arrayLoaded} />
				</main>
			) : (
				<main className='Main' data-units={units}>
					<p>Loading...</p>
				</main>
			)}
		</div>
	);
};
export default Contents;
