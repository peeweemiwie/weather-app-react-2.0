import WeatherIcon from '../WeatherIcon';
import { daysArray, monthArray } from '../Dates';

const Daily = (props) => {
	const constructDate = () => {
		const newDate = new Date(props.data.dt * 1000);
		const day = daysArray[newDate.getDay()];
		const month = monthArray[newDate.getMonth()];
		const date = newDate.getDate();
		return `${day} ${month} ${date}`;
	};
	const maxTemperature = () => {
		return Math.round(props.data.temp.max);
	};
	const minTemperature = () => {
		return Math.round(props.data.temp.min);
	};
	return (
		<section className='Daily'>
			<div>
				<div className='major'>{constructDate()}</div>
				<div className='minor'>{props.data.weather[0].description}</div>
			</div>
			<WeatherIcon
				icon={props.data.weather[0].icon}
				description={props.data.weather[0].description}
			/>
			<div className='temperature'>
				<div className='high'>{maxTemperature()}</div>
				<div className='low'>{minTemperature()}</div>
			</div>
		</section>
	);
};
export default Daily;
