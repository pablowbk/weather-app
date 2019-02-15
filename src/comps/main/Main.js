import React from 'react';

const Main = ({current, location}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <h2 className="location">{location.name}, {location.country}</h2>

      <div className='main-temp'>
        <div className="temp-cond">
          <img src={logo} alt="imagen de clima" className="icon-weather" />
          <h1 className="temp">{current.temp_c} °C</h1>
        </div>
      </div>

      <p className="subtext">{current.condition.text}</p>
      <div className="conditions">
        <p className="feelslike">ST: {current.feelslike_c} °C</p>
        <p className="humidity">Hum: {current.humidity} %</p>
      </div>

    </div>
  );
}

export default Main;
