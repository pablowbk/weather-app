import React from 'react';

const Main = ({current, location}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <img src={logo} alt="imagen de clima" className="icon-weather" />
      <h1 className="temp">{current.temp_c} °C</h1>
      <h2 className="city">{location.name}, {location.country}</h2>
      <h4 className="subtext">{current.condition.text}</h4>
      <div className="feelslike">ST: {current.feelslike_c} °C</div>
      <div>H: {current.humidity} %</div>
    </div>
  );
}

export default Main;
