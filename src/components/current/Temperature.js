import React from 'react';
import './Temperature.scss';

const Temperature = ({temperature, feelsLike}) => {
  temperature = Math.round(temperature);
  feelsLike = Math.round(feelsLike);
  return (
    <section 
      className="Temperature" 
      id="container-temperature">
      <div className="major">
        {temperature}
        <span className="unit-imperial">F</span>
        <span className="unit-metric">C</span>
      </div>
      <div className="minor">
        feels like {feelsLike}
        <span className="unit-imperial">F</span>
        <span className="unit-metric">C</span>
      </div>
		</section>
  )
}

export default Temperature