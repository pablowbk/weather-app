import React from 'react';

const MainTemp = () => {
  return (
    <div className='MainTemp'>
      MainTemp here<br/>
      <img src='' alt="imagen de clima" className="icon-weather" />
      <p className="temp">25 °C</p>
      <h2 className="city">Buenos Aires, CABA, Argentina</h2>
      <div className="feelslike">ST: 25.4 °C, H: 81 %</div>
    </div>
  );
}

export default MainTemp;
