import React from 'react';

const Main = ({current, location}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <div className="condition">
        <div className="info">
          <p className="subtext">{current.condition.text}</p>
          <p className="feelslike">ST: {current.feelslike_c} °C, Hum: {current.humidity} %</p>
        </div>
      </div>
      <div className='main-temp'>
        <img src={logo} alt="imagen de clima" className="icon-weather" />
        <h1 className="temp">{current.temp_c} °C</h1>
      </div>
      <h2 className="city">{location.name}, {location.country}</h2>

    </div>
  );
}

export default Main;
