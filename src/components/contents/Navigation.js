import React, { useState } from 'react';
import './Navigation.scss';
const Navigation = (props) => {
	const [activeComponent, setActiveComponent] = useState('current');
	const handleShowComponent = (event) => {
		let componentToShow = event.target.getAttribute('data-component');
		setActiveComponent(componentToShow);
		props.onActivateComponent(componentToShow);
	};
	return (
		<nav className='Navigation'>
			<button
				className='NavButton btn-no-style current'
				data-component='current'
				onClick={handleShowComponent}
				data-active={activeComponent === 'current'}
			>
				Today
			</button>
			<button
				className='NavButton btn-no-style forecast'
				data-component='forecast'
				onClick={handleShowComponent}
				data-active={activeComponent === 'forecast'}
			>
				Forecast
			</button>
		</nav>
	);
};

export default Navigation;
