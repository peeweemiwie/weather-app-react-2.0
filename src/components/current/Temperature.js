import React from 'react';
import './Temperature.scss';

const Temperature = ({ temperature, feelsLike, units }) => {
	let unitToDisplay = units === 'imperial' ? 'F' : 'C';

	return (
		<section className='Temperature'>
			<div className='major'>
				{temperature}
				<span className='unit'>°{unitToDisplay}</span>
			</div>
			<div className='minor'>
				feels like {feelsLike}
				<span className='unit'>°{unitToDisplay}</span>
			</div>
		</section>
	);
};

export default Temperature;
