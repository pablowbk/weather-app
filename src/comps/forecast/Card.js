import React from 'react';

const Card = ({getWeekDay}) => {
  return (
    <div className="Card">
      <h3>Name of Day</h3>
      <h4>condition Icon</h4>
      <p>
        <span>Max temp</span>
        <span>Min temp</span>
      </p>
    </div>
  );
}

export default Card;
