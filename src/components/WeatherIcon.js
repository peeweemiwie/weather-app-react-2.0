import React from 'react';

const WeatherIcon = ({ icon, description }) => {
	return (
		<img
			className='icon-weather'
			src={`http://openweathermap.org/img/wn//${icon}@2x.png`}
			alt={`icon for ${description}`}
		/>
	);
};

export default WeatherIcon;
