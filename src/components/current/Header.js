import React from 'react';
import { daysArray, monthArray } from '../Dates';
import './Header.scss';
const Header = ({ name }) => {
	let currentTime = new Date();

	let month = monthArray[currentTime.getMonth()],
		date = currentTime.getDate(),
		day = daysArray[currentTime.getDay()],
		hour = currentTime.getHours(),
		minute = currentTime.getMinutes();

	let isAmOrPm = (value) => {
		let amPm = '';
		value < 12 ? (amPm = 'am') : (amPm = 'pm');
		return amPm;
	};

	let updateHour = (value) => {
		let hourToBeDisplayed = '';
		if (value === 0) {
			hourToBeDisplayed = 12;
		} else if (value > 0 && value <= 12) {
			hourToBeDisplayed = value;
		} else hourToBeDisplayed = value - 12;
		return hourToBeDisplayed;
	};

	let updateMinute = (value) => {
		if (value < 10) value = '0' + value;
		return value;
	};

	let unit = isAmOrPm(hour);
	hour = updateHour(hour);
	minute = updateMinute(minute);

	let updatedDate = `${day} ${month} ${date} ${hour}:${minute}${unit} `;

	return (
		<header id='header-current-weather' className='Header border'>
			<h1 className='container-city'>{name}</h1>
			<h2 className='container-date'>{updatedDate}</h2>
		</header>
	);
};

export default Header;
