import React from 'react';
import './Temperature.scss';

const Temperature = ({ temperature, feelsLike }) => {
	console.log(temperature);
	return (
		<section className='Temperature'>
			<div className='major'>
				{temperature}
				<span className='unit-imperial'>F</span>
				<span className='unit-metric'>C</span>
			</div>
			<div className='minor'>
				feels like {feelsLike}
				<span className='unit-imperial'>F</span>
				<span className='unit-metric'>C</span>
			</div>
		</section>
	);
};

export default Temperature;
