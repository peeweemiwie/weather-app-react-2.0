import React from 'react';

const Forecast = (props) => {
	// console.log(props, props.isLoaded);
	let dailyForecast = [];
	if (props.isLoaded) {
		dailyForecast = props.data.map((item, index) => (
			<div key={index}>
				<div>{item.description}</div>
				<div>{item.tempMax}</div>
				<div>{item.tempMin}</div>
				<div>
					<img
						className='icon-weather'
						src={`http://openweathermap.org/img/wn//${item.weatherIcon}@2x.png`}
						alt={`icon for ${item.description}`}
					/>
				</div>
			</div>
		));
	}
	return (
		<section className='Forecast'>
			<div>This is where Forecast is displayed</div>
			{dailyForecast}
		</section>
	);
};
export default Forecast;
