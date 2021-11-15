import React from 'react';
import Header from './Header';
import Weather from './Weather';
import Temperature from './Temperature';
import Humidity from './Humidity';
import Wind from './Wind';
import WeatherIcon from '../WeatherIcon';
import './Current.scss';

const Current = (props) => {
	let theme = props.data.icon.indexOf('d') > -1 ? 'light' : 'dark';
	return (
		<section className='Current' data-theme={theme}>
			<Header name={props.data.city} />
			<div className='container-icon'>
				<WeatherIcon
					icon={props.data.icon}
					description={props.data.description}
				/>
			</div>
			<Weather description={props.data.description} main={props.data.weather} />
			<Temperature
				temperature={props.data.temperature}
				feelsLike={props.data.feelsLike}
				units={props.units}
			/>
			<Humidity humidity={props.data.humidity} />
			<Wind speed={props.data.wind} />
		</section>
	);
};

export default Current;
