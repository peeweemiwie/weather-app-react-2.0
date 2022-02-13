import { useState } from 'react';
import Header from './Header';
import Weather from './Weather';
import Temperature from './Temperature';
import HumidityWind from './HumidityWind';
import Forecast from '../forecast/Forecast';
import './Current.scss';

const Current = props => {
	const forecast = 'forecast';
	const current = 'current';
	const receivedComponent = props.component;

	const [propsComponent, setPropsComponent] = useState(current);
	const [style, setStyle] = useState('scroll');

	// It changes background of current weather depending on time and weather
	let theme = '';
	if (
		props.data.icon.indexOf('d') > -1 &&
		props.data.weather.toLowerCase() === 'clear'
	) {
		theme = 'light';
	} else if (
		props.data.icon.indexOf('d') > -1 &&
		props.data.weather.toLowerCase() !== 'clear'
	) {
		theme = 'cloudy';
	} else {
		theme = 'dark';
	}

	const adjustDisplay = component => {
		setPropsComponent(component);
		setStyle(component);
	};
	// when user clicks on navigation, main content slides to display content accordingly
	// It receives which components to display when user clicks on navigation tabs.
	if (receivedComponent === forecast && propsComponent === current) {
		adjustDisplay(forecast);
	} else if (receivedComponent === current && propsComponent === forecast) {
		adjustDisplay(current);
	}

	// mobile only:
	const handleScroll = event => {
		const wrapper = event.target.closest('.horizontal-scroll-wrapper');
		const Forecast = document.querySelector('.Forecast');
		const options = {
			root: wrapper,
			threshold: 0.5,
		};

		const handleIntersect = (entries, observer) => {
			setStyle('scroll');
			console.log('hi', style);

			entries.forEach(entry => {
				if (entry.isIntersecting) {
					adjustDisplay(forecast);
					props.onActivateComponent(forecast);
				} else {
					adjustDisplay(current);
					props.onActivateComponent(current);
				}
			});
		};
		const observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(Forecast);
	};

	const handleTouchEnd = () => console.log('tough end');

	return (
		<div
			className='horizontal-scroll-wrapper'
			onTouchStart={handleScroll}
			onTouchEnd={handleTouchEnd}
		>
			<main className='Main' data-units={props.units} data-style={style}>
				<section className='Current' data-theme={theme}>
					<Header name={props.data.city} />
					<Temperature
						temperature={props.data.temperature}
						feelsLike={props.data.feelsLike}
						units={props.units}
					/>
					<Weather
						description={props.data.description}
						main={props.data.weather}
						icon={props.data.icon}
					/>
					<HumidityWind
						humidity={props.data.humidity}
						speed={props.data.wind}
					/>
				</section>
				<Forecast coord={props.data.coord} units={props.units} />
			</main>
		</div>
	);
};

export default Current;
