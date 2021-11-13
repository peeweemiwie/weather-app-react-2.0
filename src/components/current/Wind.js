import React from 'react';
import './Wind.scss';

const Wind = ({ speed }) => {
	speed = Math.round(speed);
	return (
		<section className='Wind border' id='container-wind'>
			<div className='text-center'>Wind</div>
			<div className='text-center'>
				{speed}
				<span className='unit-imperial'>m</span>
				<span className='unit-metric'>k</span>ph
			</div>
		</section>
	);
};

export default Wind;
