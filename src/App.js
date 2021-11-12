import './App.scss';
import Form from './components/Form';
import Current from './components/current/Current';
import Forecast from './components/forecast/Forecast';

function App() {
	return (
		<div className='App'>
			<header>
				<h1>Weather App React 2.0</h1>
			</header>
			<Form />
			<Current />
			<Forecast />
		</div>
	);
}

export default App;
