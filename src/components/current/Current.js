import React from 'react';

const Current = (props) => {
	// console.log('current', props);
	return (
		<section className='Current'>
			<div>This is where current weather is displayed</div>
			{props.data.loaded && (
				<div>
					{props.data.city}
					{props.data.description}
					{props.data.weather}
					{props.data.feelsLike}
					{props.data.humidity}
					{props.data.loaded}
					{props.data.temperature}
					{props.data.wind}
					<img
						className='icon-weather'
						src={`http://openweathermap.org/img/wn//${props.data.icon}@2x.png`}
						alt={`icon for ${props.data.description}`}
					/>
				</div>
			)}
		</section>
	);
};
export default Current;
