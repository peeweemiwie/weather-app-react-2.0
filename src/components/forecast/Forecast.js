import React from 'react';
import WeatherIcon from '../WeatherIcon';
import './Forecast.scss';

const Forecast = (props) => {
	return (
		<section className='Forecast'>
			{props.isLoaded &&
				props.data.map((item, index) => (
					<section className='Daily' key={index}>
						<div>
							<div className='major'>{item.dt}</div>
							<div className='minor'>{item.description}</div>
						</div>
						<WeatherIcon
							icon={item.weatherIcon}
							description={item.description}
						/>
						<div className='temperature'>
							<div className='high'>{Math.round(item.tempMax)}</div>
							<div className='low'>{Math.round(item.tempMin)}</div>
						</div>
					</section>
				))}
		</section>
	);
};
export default Forecast;
