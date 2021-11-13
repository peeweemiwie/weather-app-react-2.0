import React, { useState } from 'react';
import './App.scss';
import Form from './components/Form';
import Current from './components/current/Current';
import Forecast from './components/forecast/Forecast';

function App() {
	const [updatedWeatherData, setUpdatedWeatherData] = useState({});
	const [currentDataLoaded, setCurrentDataLoaded] = useState(false);
	const [updatedForecastData, setUpdatedForecastData] = useState([]);
	const [forecastDataLoaded, setForecastDataLoaded] = useState(false);
	const test = (value) => {
		setUpdatedWeatherData(value);
		setCurrentDataLoaded(true);
	};
	const test2 = (value) => {
		setUpdatedForecastData(value);
		setForecastDataLoaded(true);
	};
	const storeDataHandler = (weatherData) => {
		const importedWeatherData = { ...weatherData };
		test(importedWeatherData);
	};
	const storeForecastDataHandler = (array) => {
		const importedForecastData = [...array];
		test2(importedForecastData);
	};
	return (
		<div className='App'>
			<header>
				<h1>Weather App React 2.0</h1>
			</header>
			<Form
				onReceiveRequest={storeDataHandler}
				onForecastReceiveRequest={storeForecastDataHandler}
			/>
			<main>
				<Current data={updatedWeatherData} isLoaded={currentDataLoaded} />
				<Forecast data={updatedForecastData} isLoaded={forecastDataLoaded} />
			</main>
		</div>
	);
}

export default App;
