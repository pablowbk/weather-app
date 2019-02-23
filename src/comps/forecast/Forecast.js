import React from 'react';


const Forecast = ({forecast, getWeekDay}) => {
  return (
    <div className="Forecast">
      <button className='btn-getDays'
              onClick=
              {(e) => {
                e.preventDefault();
                const cardslist = document.querySelector('.CardsList');
                cardslist.classList.toggle('outtasight');
                }
              }
            >
      Pronóstico 7 días
      </button>
      <div className="CardWrapper">
        <div className="CardsList outtasight">
          {
            forecast.forecastday.map(day => {
              return (
                <div className="Card" key={day.date}>
                  <h5>{getWeekDay(day.date_epoch)}</h5>
                  <h6>{day.date}</h6>
                  <div className="card-condition">
                    <img src={day.day.condition.icon} alt="Clima Diario" className="card-img"/>
                    <p className="card-condition-text">
                      <span>
                        {day.day.condition.text}
                      </span>
                    </p>
                  </div>
                  <div className="card-minmax">
                    <p>
                      <span className="card-tempmax">
                        {parseInt(day.day.maxtemp_c)}°
                      </span>
                    </p>
                    <p>
                      <span className="card-tempmin">
                        {parseInt(day.day.mintemp_c)}°
                      </span>
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  );
}

export default Forecast;
