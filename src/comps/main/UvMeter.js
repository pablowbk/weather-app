import React from 'react';

const UvMeter = ({currentUV}) => {
  return (
    <div className="uv-meter">
      <div className={`bar-content ${
        currentUV < 1
        ? 'low'
        : currentUV === 1
        ? 'low-one'
        : currentUV === 2
        ? 'low-two'
        : currentUV === 3
        ? 'mod-three'
        : currentUV === 4
        ? 'mod-four'
        : currentUV === 5
        ? 'mod-five'
        : currentUV === 6
        ? 'high-six'
        : currentUV === 7
        ? 'high-seven'
        : currentUV === 8
        ? 'very-high-eight'
        : currentUV === 9
        ? 'very-high-nine'
        : currentUV === 10
        ? 'very-high-ten'
        : currentUV >= 11
        ? 'ext'
        : null
      }`}>
      </div>
      <div
        className="uv-bar-inside"
        style={currentUV < 8 ? {color: '#000'} : null}
        >{
        currentUV < 3
        ? 'Bajo'
        : currentUV < 6
        ? 'Moderado'
        : currentUV < 8
        ? 'Alto'
        : currentUV < 11
        ? 'Muy Alto'
        : currentUV >= 11
        ? 'Extremo'
        : null
      }</div>
    </div>
  );
}

export default UvMeter;
