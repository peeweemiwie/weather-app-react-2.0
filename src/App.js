import React from 'react';
import './App.scss';
import Footer from './components/footer/Footer';
import Contents from './components/contents/Contents';
function App() {
	return (
		<div className='App'>
			<header>
				<h3 className='app-title'>Weather App React 2.0</h3>
			</header>
			<Contents />
			<Footer />
		</div>
	);
}

export default App;
