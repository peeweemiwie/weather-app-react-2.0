import React from 'react';
import './Weather.scss';

const Weather = ({ icon, description, main }) => {
	let fontSize = {};
	if (main.toLowerCase() === 'thunderstorm') {
		fontSize = { fontSize: '7rem' };
	}

	return (
		<section className='Weather'>
			<div
				className='container'
				style={{
					backgroundImage: `url('https://raw.githubusercontent.com/peeweemiwie/weather-icons/main/img/${icon}.svg')`,
				}}
			>
				<div className='major' style={fontSize}>
					{main}
				</div>
				<div className='minor'>{description}</div>
			</div>
		</section>
	);
};

export default Weather;
