import React from 'react';
const WeatherIcon = ({ icon, description }) => {
	return (
		<img
			className='icon-weather'
			src={`https://raw.githubusercontent.com/peeweemiwie/weather-icons/main/img/${icon}.svg`}
			alt={`icon for ${description}`}
		/>
	);
};

export default WeatherIcon;
