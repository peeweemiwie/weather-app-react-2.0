import React from 'react';
import './Weather.scss';

const Weather = ({ icon, description, main}) => {
  return (
    <section className="Weather">
        
        <div className="major">{main}</div>
		    <div className="minor">{description}</div>
    </section>
  )
}

export default Weather