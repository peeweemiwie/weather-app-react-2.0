import React from 'react';
import Daily from './Daily';
import axios from 'axios';
import { apiEndpoint, apiKey } from '../Api';
import './Forecast.scss';

const Forecast = (props) => {
	const createForecastResponseArray = (response) => {
		console.log('forecast', response);
	};

	if (props.coord) {
		const lat = props.coord.lat;
		const lon = props.coord.lon;
		const units = props.units;
		const baseUrl = `${apiEndpoint}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(createForecastResponseArray);
	}

	return (
		<section className='Forecast'>
			<Daily array={props} />
		</section>
	);
};
export default Forecast;
