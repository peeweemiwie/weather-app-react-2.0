import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from './Api';

import './Form.scss';

const Form = (props) => {
	const [city, setCity] = useState('');
	const [value, setValue] = useState('F');
	const [units, setUnits] = useState('imperial');
	const [temperature, setTemperature] = useState(null);
	const [feelsLike, setFeelsLike] = useState(null);
	const [description, setDescription] = useState('');
	const [weather, setWeather] = useState('');
	const [humidity, setHumidity] = useState(null);
	const [wind, setWind] = useState(null);
	const [icon, setIcon] = useState('');
	const [lon, setLon] = useState(null);
	const [lat, setLat] = useState(null);
	const [loaded, setLoaded] = useState(false);

	let weatherData = {};
	const handleChangeRadioButtons = (event) => {
		let updatedUnits = '';
		let targetValue = event.target.value;
		targetValue === 'F'
			? (updatedUnits = 'imperial')
			: (updatedUnits = 'metric');
		setUnits(updatedUnits);
		setValue(targetValue);
	};
	const handleTextInputChange = (event) => {
		setCity(event.target.value);
	};
	const setResponseData = (response) => {
		const data = response.data;
		setTemperature(Math.round(data.main.temp));
		setFeelsLike(Math.round(data.main.feels_like));
		setDescription(data.weather[0].description);
		setWeather(data.weather[0].main);
		setHumidity(data.main.humidity);
		setWind(data.wind.speed);
		setIcon(data.weather[0].icon);
		setLon(data.coord.lon);
		setLat(data.coord.lat);
		setLoaded(true);
	};

	const createForecastResponseArray = (response) => {
		let selectedWeatherArray = response.data.daily.map((item) => {
			return {
				description: item.weather[0].description,
				weatherIcon: item.weather[0].icon,
				tempMax: item.temp.max,
				tempMin: item.temp.min,
			};
		});
		props.onForecastReceiveRequest(selectedWeatherArray);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const baseUrl = `${apiEndpoint}weather?q=${city}&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(setResponseData);
	};

	const getForecastData = () => {
		const baseUrl = `${apiEndpoint}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(createForecastResponseArray);
	};

	if (loaded) {
		weatherData = {
			city: city,
			temperature: temperature,
			feelsLike: feelsLike,
			weather: weather,
			description: description,
			humidity: humidity,
			wind: wind,
			icon: icon,
			loaded: loaded,
		};

		getForecastData();
		props.onReceiveRequest(weatherData);
		setCity('');
		setLoaded(false);
	}

	return (
		<form className='Form' onSubmit={handleSubmit}>
			<div className='group-text-input' data-focus={city ? true : false}>
				<label htmlFor='city' className='label'>
					Enter city name
				</label>
				<input
					className='input-text'
					type='text'
					value={city}
					onChange={handleTextInputChange}
					id='city'
				/>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</div>
			<fieldset className='fieldset'>
				<legend>Units</legend>
				<div className='group-radio-button'>
					<label htmlFor='F' className='label'>
						<input
							className='button-radio'
							type='radio'
							name='units'
							value='F'
							id='F'
							data-units='imperial'
							checked={'F' === value}
							onChange={handleChangeRadioButtons}
						/>
						<span className='value'>F</span>
					</label>
				</div>
				<div className='group-radio-button'>
					<label htmlFor='C' className='label'>
						<input
							className='button-radio'
							type='radio'
							name='units'
							value='C'
							id='C'
							data-units='metric'
							checked={'C' === value}
							onChange={handleChangeRadioButtons}
						/>
						<span className='value'>C</span>
					</label>
				</div>
			</fieldset>
		</form>
	);
};

export default Form;
