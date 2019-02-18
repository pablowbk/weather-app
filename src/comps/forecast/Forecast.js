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
      {/* <Card />
      <Card />
      <Card />
      <Card /> */}
    </div>
  );
}

export default Forecast;
