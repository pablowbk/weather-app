import React from 'react';
import UvMeter from './UvMeter';

const Main = ({current, location, apiError}) => {
  const logo = current.condition.icon;
  return (
    <div className='Main'>
      <h2 className="location" style={apiError ? {color:"rgba(170, 7, 7, 1)"} : null }>{ apiError ? "No se ha encontrado la ciudad. Intente nuevamente." : `${location.name}, ${location.country}`}</h2>

      <div className='main-temp'>
        <div className="temp-cond">
          <img src={logo} alt="imagen de clima" className="icon-weather" />
          <h1 className="temp"
            style={
              current.temp_c <= -10 ? {color: 'rgba(149, 136, 211,1)'}
              : current.temp_c <= 0
                ? {color: 'rgba(150, 208, 216,1)'}
                : current.temp_c <= 10
                  ? {color: 'rgba(94, 143, 197,1)'}
                  : current.temp_c <= 18
                    ? {color: 'rgba(79, 139, 61,1)'}
                    : current.temp_c <= 25
                      ? {color: 'rgba(222, 177, 6,1)'}
                      : current.temp_c <= 34
                        ? {color: 'rgba(190, 65, 18,1)'}
                        : current.temp_c > 34
                          ? {color: 'rgba(138, 42, 10,1)'}
                          : null
            }
          >
            {current.temp_c}°C
          </h1>
        </div>
      </div>
      <p className="subtext">{current.condition.text}</p>

      <div className="uv">
        <div>{navigator.language.includes("es") ? "Ind/UV: " : "UV: "}<span>{current.uv}</span></div>
        <UvMeter currentUV={current.uv}/>
      </div>

      <div className="conditions">
        <p className="feelslike">{`${navigator.language.includes("es") ? "ST: " : "Feels Like: " } ${current.feelslike_c} °C`}</p>
        <p className="humidity">Hum: {current.humidity} %</p>
      </div>

    </div>
  );
}

export default Main;
