import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from '../Api';
import 'material-icons/iconfont/material-icons.css';
import './Form.scss';

const Form = props => {
	const [city, setCity] = useState('');

	const handleResponse = response => {
		props.onReceivedData(response);
		setCity('');
	};

	const handleSubmit = event => {
		event.preventDefault();
		const baseUrl = `${apiEndpoint}weather?q=${city}&units=imperial&appid=${apiKey}`;
		axios.get(baseUrl).then(handleResponse);
	};

	const handleTextInputChange = event => {
		setCity(event.target.value);
	};

	const handleClearValue = () => {
		setCity('');
	};

	const handleEnter = event => {
		if (event.keyCode === 13) {
			const baseUrl = `${apiEndpoint}weather?q=${city}&units=imperial&appid=${apiKey}`;
			axios.get(baseUrl).then(handleResponse);
		}
	};

	return (
		<form className='Form' onSubmit={handleSubmit} onKeyDown={handleEnter}>
			<div className='group-input'>
				<div className='group-text-input' data-focus={city ? true : false}>
					<label htmlFor='city' className='label'>
						Enter city name
					</label>
					<input
						className='input-text'
						type='text'
						value={city}
						onChange={handleTextInputChange}
						id='city'
					/>
					{city && (
						<button
							onClick={handleClearValue}
							className='button btn-no-style btn-clear'
						>
							<span className='material-icons-outlined'>clear</span>
						</button>
					)}
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
