import React from 'react';

const Main = ({current, location}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <h2 className="location">{location.name}, {location.country}</h2>

      <div className='main-temp'>
        <div className="temp-cond">
          <img src={logo} alt="imagen de clima" className="icon-weather" />
          <h1 className="temp">{current.temp_c}°C</h1>
        </div>
      </div>
      <p className="subtext">{current.condition.text}</p>

      <p className="uv">
        <span>Indice UV: {current.uv}</span>
        <span>
          <meter
            value={current.uv}
            min='0'
            optimum='2'
            low='3'
            high='7'
            max="11"
            style={{
              // background: current.uv < 2 ? 'rgb(53, 173, 63)' : null,
              // color: current.uv > 3 ? 'rgb(244, 235, 66)' : null
              // background: current.uv > 5 ? 'rgb(244, 187, 65)' : null,
              // background: current.uv > 7 ? 'rgb(244, 85, 65)' : null,
              // background: current.uv > 10 ? 'rgb(181, 65, 244)' : null
            }}>
          </meter></span></p>

      <div className="conditions">
        <p className="feelslike">ST: {current.feelslike_c} °C</p>
        <p className="humidity">Hum: {current.humidity} %</p>
      </div>

    </div>
  );
}

export default Main;
