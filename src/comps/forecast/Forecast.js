import React from 'react';
import Card from './Card';

const Forecast = () => {
  return (
    <div className="Forecast">
      <button className='btn-getDays'
              onClick={() => console.log('clicking')}
              >
      Pronóstico a 5 días
      </button>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default Forecast;
