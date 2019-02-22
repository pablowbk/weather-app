import React from 'react';
import UvMeter from './UvMeter';

const Main = ({current, location}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <h2 className="location">{location.name}, {location.country}</h2>

      <div className='main-temp'>
        <div className="temp-cond">
          <img src={logo} alt="imagen de clima" className="icon-weather" />
          <h1 className="temp" style={
              current.temp_c <= -10 ? {color: 'rgb(149, 136, 211)'}
              : current.temp_c <= 0
              ? {color: 'rgb(150, 208, 216)'}
              : current.temp_c <= 10
              ? {color: 'rgb(94, 143, 197)'}
              : current.temp_c <= 18
              ? {color: 'rgb(79, 139, 61)'}
              : current.temp_c <= 25
              ? {color: 'rgb(222, 177, 6)'}
              : current.temp_c <= 34
              ? {color: 'rgb(190, 65, 18)'}
              : current.temp_c > 34
              ? {color: 'rgb(138, 42, 10)'}
              : null
              // rgb(149, 136, 211), violeta < -10
              // rgb(150, 208, 216), celeste 0
              // rgb(94, 143, 197), azul < 10
              // rgb(79, 139, 61), verde < 20
              //
              // rgb(222, 177, 6),  naranja < 25
              // rgb(190, 65, 18), rojo < 34
              // rgb(138, 42, 10), morado <= 34
            }>
            {current.temp_c}°C
          </h1>
        </div>
      </div>
      <p className="subtext">{current.condition.text}</p>

      <div className="uv">
        <div>Ind/UV: <span>{current.uv}</span></div>
        <UvMeter currentUV={current.uv}/>
      </div>

      <div className="conditions">
        <p className="feelslike">ST: {current.feelslike_c} °C</p>
        <p className="humidity">Hum: {current.humidity} %</p>
      </div>

    </div>
  );
}

export default Main;
