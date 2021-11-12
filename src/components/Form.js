import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from './Api';

const Form = (props) => {
	const [city, setCity] = useState('');
	const [displayedUnits, setDisplayedUnits] = useState('F');
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
	const radioButtonChangeHandler = (event) => {
		setDisplayedUnits(event.target.value);
		setUnits(event.target.getAttribute('data-units'));
	};
	const textInputChangeHandler = (event) => {
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

	const submitHandler = (event) => {
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
		<section className='Form' onSubmit={submitHandler}>
			<form action=''>
				<input type='text' value={city} onChange={textInputChangeHandler} />
				<button type='submit'>Submit</button>
				<div>
					<label htmlFor='F'>
						<input
							type='radio'
							name='units'
							value='F'
							id='F'
							data-units='imperial'
							checked={'F' === displayedUnits}
							onChange={radioButtonChangeHandler}
						/>
						F
					</label>
				</div>
				<div>
					<label htmlFor='C'>
						<input
							type='radio'
							name='units'
							value='C'
							id='C'
							data-units='metric'
							checked={'C' === displayedUnits}
							onChange={radioButtonChangeHandler}
						/>
						C
					</label>
				</div>
			</form>
		</section>
	);
};

export default Form;
