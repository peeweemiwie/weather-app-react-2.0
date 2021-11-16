// import WeatherIcon from '../WeatherIcon';
// import { daysArray, monthArray } from '../Dates';

const Daily = (props) => {
	// let tempMax = Math.round(props.data.tempMax);
	// let tempMin = Math.round(props.data.tempMin);
	// let newDate = new Date(props.data.dt * 1000);
	// let day = daysArray[newDate.getDay()];
	// let month = monthArray[newDate.getMonth()];
	// let date = newDate.getDate();
	console.log('daily', props);
	return (
		<section className='Daily' key={1}>
			{/* <div>
				<div className='major'>
					{day} {month} {date}
				</div>
				<div className='minor'>{props}.data.description</div>
			</div>
			<WeatherIcon
				icon={props.data.weatherIcon}
				description={props.data.description}
			/>
			<div className='temperature'>
				<div className='high'>{tempMax}</div>
				<div className='low'>{tempMin}</div>
			</div> */}
		</section>
	);
};
export default Daily;
