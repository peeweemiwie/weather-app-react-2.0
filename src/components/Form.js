import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from './Api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
// import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
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
		<section className='Form'>
			{/* <input type='text' value={city} onChange={textInputChangeHandler} /> */}
			<Box
				onSubmit={submitHandler}
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
			>
				<TextField
					className='input-text'
					id='city'
					label='Enter city name'
					onChange={handleTextInputChange}
					// InputProps={{
					// 	startAdornment: (
					// 		<InputAdornment position='start'>
					// 			<SearchIcon />
					// 		</InputAdornment>
					// 	),
					// }}
					variant='filled'
				/>
				<button type='submit'>Submit</button>

				<FormControl component='fieldset'>
					<FormLabel component='legend'>Units</FormLabel>
					<RadioGroup
						row
						aria-label='units'
						value={value}
						name='row-radio-buttons-group'
						onChange={handleChangeRadioButtons}
					>
						<FormControlLabel
							value='F'
							control={
								<Radio
									sx={{
										'& .MuiSvgIcon-root': {
											fontSize: 30,
										},
										color: blue[300],
										'&.Mui-checked': {
											color: blue[500],
										},
									}}
								/>
							}
							label='F'
						/>
						<FormControlLabel
							value='C'
							control={
								<Radio
									sx={{
										'& .MuiSvgIcon-root': {
											fontSize: 30,
										},
										color: blue[300],
										'&.Mui-checked': {
											color: blue[500],
										},
									}}
								/>
							}
							label='C'
						/>
					</RadioGroup>
				</FormControl>
			</Box>
		</section>
	);
};

export default Form;
