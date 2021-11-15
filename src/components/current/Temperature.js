import React, { useState } from 'react';
import './Temperature.scss';

const Temperature = ({ temperature, feelsLike, units }) => {
	let [convertedInfo, setConvertedInfo] = useState({});
	let [infoVisibility, setInfoVisibility] = useState(false);
	let [btnToDisplay, setBtnToDisplay] = useState('down');
	let unitToDisplay = units === 'imperial' ? 'F' : 'C';

	const convertFahrenheitToCelsius = (temp) => {
		return Math.round(((temp - 32) * 5) / 9);
	};
	const convertCelsiusToFahrenheit = (temp) => {
		return Math.round((temp * 5) / 9 + 32);
	};

	const handleShowInfo = (temp) => {
		let convertedTemp =
			units === 'imperial'
				? convertFahrenheitToCelsius(temperature)
				: convertCelsiusToFahrenheit(temperature);
		let convertedFeelLike =
			units === 'imperial'
				? convertFahrenheitToCelsius(feelsLike)
				: convertCelsiusToFahrenheit(feelsLike);
		let convertedUnits = units === 'imperial' ? 'C' : 'F';
		setConvertedInfo({
			temp: convertedTemp,
			feelsLike: convertedFeelLike,
			units: convertedUnits,
		});
		setInfoVisibility(true);
		setBtnToDisplay('up');
	};

	const handleHideInfo = () => {
		setInfoVisibility(false);
		setBtnToDisplay('down');
	};

	let button;
	if (btnToDisplay === 'down') {
		button = (
			<div className='buttons'>
				<button className='button btn-no-style' onClick={handleShowInfo}>
					<span className='material-icons-outlined'>arrow_drop_down</span>{' '}
					<span> View in °{units === 'imperial' ? 'C' : 'F'}</span>
				</button>
			</div>
		);
	} else {
		button = (
			<div className='buttons'>
				<button className='button btn-no-style' onClick={handleHideInfo}>
					<span className='material-icons-outlined'>arrow_drop_up</span>
				</button>
			</div>
		);
	}

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
			<div className='toggle-converted-info'>
				{button}
				<div className='converted-info' data-show={infoVisibility}>
					<div>
						Temperature: {convertedInfo.temp}°{convertedInfo.units}
					</div>
					<div>
						Feels Like: {convertedInfo.feelsLike}°{convertedInfo.units}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Temperature;
