import React from 'react';
import './Humidity.scss';

const Humidity = ({humidity}) => {
  return (
    <section 
      className="Humidity border" 
      id="container-humidity">
      <div className="text-center">Humidity</div>
		  <div className="text-center">{humidity}%</div>
    </section>
  )
}

export default Humidity;