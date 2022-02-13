import React, { useState } from 'react';
import './Navigation.scss';
const Navigation = props => {
	const [propsComponent, setPropsComponent] = useState('current');
	const [activeComponent, setActiveComponent] = useState('current');

	const receivedComponent = props.component;
	if (propsComponent !== receivedComponent) {
		setPropsComponent(receivedComponent);
		setActiveComponent(receivedComponent);
	}

	const handleShowComponent = event => {
		let componentToShow = event.target.getAttribute('data-tab');
		setActiveComponent(componentToShow);
		props.onActivateComponent(componentToShow);
	};

	return (
		<nav className='Navigation' data-active-component={activeComponent}>
			<button
				className='NavButton btn-no-style current'
				data-tab='current'
				onClick={handleShowComponent}
				data-active={activeComponent === 'current'}
			>
				Today
			</button>
			<button
				className='NavButton btn-no-style forecast'
				data-tab='forecast'
				onClick={handleShowComponent}
				data-active={activeComponent === 'forecast'}
			>
				Forecast
			</button>
		</nav>
	);
};

export default Navigation;
