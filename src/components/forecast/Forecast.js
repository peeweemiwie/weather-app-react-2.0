import React, { useState, useEffect } from 'react';
import Daily from './Daily';
import axios from 'axios';
import { apiEndpoint, apiKey } from '../Api';
import './Forecast.scss';

const Forecast = (props) => {
	const [loaded, setLoaded] = useState(false);
	const [forecastArray, setForecastArray] = useState(null);

	useEffect(() => {
		setLoaded(false);
	}, [props.coord]);

	const createForecastResponseArray = (response) => {
		setForecastArray(response.data.daily);
		setLoaded(true);
	};
	const sendRequest = () => {
		const lat = props.coord.lat;
		const lon = props.coord.lon;
		const units = props.units;
		const baseUrl = `${apiEndpoint}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(createForecastResponseArray);
	};

	if (loaded) {
		return (
			<section className='Forecast'>
				{forecastArray.map((dailyForecast, index) => {
					return <Daily data={dailyForecast} key={index} />;
				})}
			</section>
		);
	} else {
		sendRequest();
		return null;
	}
};
export default Forecast;
