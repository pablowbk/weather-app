import React from 'react';


const Loader = () => {
    return (
        <div className="wrapper">
          <h3>{navigator.language.includes("es") ? "Iniciando..." : "Loading..."}</h3>
          <div className="spinner spinner-1"></div>
        </div>
    );
}


export default Loader;
