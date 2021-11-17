import React from 'react';
import Header from './Header';
import Weather from './Weather';
import Temperature from './Temperature';
import HumidityWind from './HumidityWind';
import Forecast from '../forecast/Forecast';
import './Current.scss';

const Current = (props) => {
	let theme = '';
	if (
		props.data.icon.indexOf('d') > -1 &&
		props.data.weather.toLowerCase() === 'clear'
	) {
		theme = 'light';
	} else if (
		props.data.icon.indexOf('d') > -1 &&
		props.data.weather !== 'clear'
	) {
		theme = 'cloudy';
	} else {
		theme = 'dark';
	}
	return (
		<main className='Main' data-units={props.units}>
			<section
				className='Current'
				data-theme={theme}
				style={{
					backgroundImage: `url('https://raw.githubusercontent.com/peeweemiwie/weather-icons/main/img/${props.data.icon}.svg')`,
				}}
			>
				<Header name={props.data.city} />
				<Temperature
					temperature={props.data.temperature}
					feelsLike={props.data.feelsLike}
					units={props.units}
				/>
				<Weather
					description={props.data.description}
					main={props.data.weather}
				/>
				<HumidityWind humidity={props.data.humidity} speed={props.data.wind} />
			</section>
			<Forecast coord={props.data.coord} units={props.units} />
		</main>
	);
};

export default Current;
