import React from 'react';
import Card from './Card';

const Forecast = ({forecast}) => {
  return (
    <div className="Forecast">
      <button className='btn-getDays'
              onClick={() => console.log('clicking', forecast.forecastday)}
              >
      Pronóstico a 5 días
      </button>
      <div>
        
      </div>
    </div>
  );
}

export default Forecast;
