import React from 'react';

const compStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  aligItems: "center",
  minHeight: "100vh",
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
}

const ErrorMessage = ({apiError, apiErrorMessage, locationError}) => (
  <div style={compStyles}>
    <div style={wrapper}>
      <h3>Hmmm...<br/>Algo no esta bien.</h3>
      <div className="spinner spinner-2" style={{background: "rgba(170, 7, 7, 1)"}}></div>
    </div>
    <h3 style={{margin: "20px", fontWeight: 400}}>{locationError}</h3>
  </div>
);

export default ErrorMessage;
