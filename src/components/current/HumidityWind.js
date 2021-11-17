import React from 'react';
import './HumidityWind.scss';
const HumidityWind = ({ humidity, speed }) => {
	speed = Math.round(speed);
	return (
		<div className='Humidity-Wind'>
			<section className=' border'>
				<div className='text-center'>Wind</div>
				<div className='text-center'>
					{speed}
					<span className='unit-imperial'>m</span>
					<span className='unit-metric'>k</span>ph
				</div>
			</section>
			<section className=' border'>
				<div className='text-center'>Humidity</div>
				<div className='text-center'>{humidity}%</div>
			</section>
		</div>
	);
};

export default HumidityWind;
