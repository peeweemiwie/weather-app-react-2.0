import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoint, apiKey } from './Api';
import 'material-icons/iconfont/material-icons.css';
import './Form.scss';

const Form = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [city, setCity] = useState('');
	const [value, setValue] = useState('F');
	const [units, setUnits] = useState('imperial');

	const handleExpansion = () => {
		expanded ? setExpanded(false) : setExpanded(true);
		expanded === false ? setExpanded(true) : setExpanded(false);
	};

	const handleResponse = (response) => {
		const data = response.data;
		props.onReceivedData(data);
		props.onReceivedUnits(units);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const baseUrl = `${apiEndpoint}weather?q=${city}&units=${units}&appid=${apiKey}`;
		axios.get(baseUrl).then(handleResponse);
	};
	const handleTextInputChange = (event) => {
		setCity(event.target.value);
	};
	const handleChangeRadioButtons = (event) => {
		let targetValue = event.target.value;
		let updatedUnits = targetValue === 'F' ? 'imperial' : 'metric';
		setUnits(updatedUnits);
		setValue(targetValue);
	};

	return (
		<form className='Form' onSubmit={handleSubmit} data-expansion={expanded}>
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
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</div>
				<button
					className='button btn-expansion'
					type='button'
					onClick={handleExpansion}
				>
					<span className='material-icons-outlined'>more_vert</span>
				</button>
			</div>
			<fieldset className='fieldset'>
				<legend>Units</legend>
				<div className='group-radio-button'>
					<label htmlFor='F' className='label'>
						<input
							className='button-radio'
							type='radio'
							name='units'
							value='F'
							id='F'
							data-units='imperial'
							checked={'F' === value}
							onChange={handleChangeRadioButtons}
						/>
						<span className='value'>F</span>
					</label>
				</div>
				<div className='group-radio-button'>
					<label htmlFor='C' className='label'>
						<input
							className='button-radio'
							type='radio'
							name='units'
							value='C'
							id='C'
							data-units='metric'
							checked={'C' === value}
							onChange={handleChangeRadioButtons}
						/>
						<span className='value'>C</span>
					</label>
				</div>
			</fieldset>
		</form>
	);
};

export default Form;
