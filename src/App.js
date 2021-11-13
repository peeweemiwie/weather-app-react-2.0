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
	const [units, setUnits] = useState('');
	const sendToCurrent = (value) => {
		setUpdatedWeatherData(value);
		setCurrentDataLoaded(true);
	};
	const sendToForecast = (value) => {
		setUpdatedForecastData(value);
		setForecastDataLoaded(true);
	};
	const storeDataHandler = (weatherData) => {
		const importedWeatherData = { ...weatherData };
		sendToCurrent(importedWeatherData);
	};
	const storeForecastDataHandler = (array) => {
		const importedForecastData = [...array];
		sendToForecast(importedForecastData);
	};
	const setUpdatedUnits = (value) => {
		setUnits(value);
	};

	return (
		<div className='App' data-units={units ? units : 'imperial'}>
			<header>
				<h1>Weather App React 2.0</h1>
			</header>
			<Form
				onSetUnits={setUpdatedUnits}
				onReceiveRequest={storeDataHandler}
				onForecastReceiveRequest={storeForecastDataHandler}
			/>
			<main className='main'>
				<Current data={updatedWeatherData} isLoaded={currentDataLoaded} />
				<Forecast data={updatedForecastData} isLoaded={forecastDataLoaded} />
			</main>
		</div>
	);
}

export default App;
