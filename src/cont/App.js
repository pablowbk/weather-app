import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';
import Loader from '../comps/loader/Loader';
import ErrorMessage from '../comps/error/ErrorMessage';

const API_KEY = process.env.REACT_APP_API_KEY;
const semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
"Domingo"];
var navLanguage = navigator.language.match(/^[a-zA-Z]{2}/).join("");

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clima: {},
      query: 'buenos aires',
      defaultURL: `https://api.apixu.com/v1/forecast.json?key=${API_KEY}&lang=${navLanguage}&days=7`,
      apiError: false,
      apiErrorMessage: null,
      locationPermissionStatus: null,
      isLoaded: false,
    };


    //Methods binding
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeekDay = this.getWeekDay.bind(this);
  }

  componentDidMount() {

    const displayLocation = (position) => {

      this.setState({query:`${position.coords.latitude},${position.coords.longitude}`});
      // FETCH DATA FROM API

      fetch(this.state.defaultURL + '&q=' + this.state.query)
      .then(response => response.json())
      .then(jsonData => {
        jsonData.current.condition.icon = jsonData.current.condition.icon.replace('64x64','128x128')
        this.setState({clima: jsonData,isLoaded: true})
      })
      .catch(err =>  {
        this.setState({apiError: true})
        console.log('an error occurred: ', err)
      })
      //End of Fetch
    }

    const handleError = (error) => {
      switch (error.code) {
        case 3:
        console.log("Error Code: " + error.code);
        console.log("TIMEOUT")
        this.setState({locationPermissionStatus: "Error: Time out. Request took too long.", locationPermissionStatusES: "Error: Tiempo de espera agotado. Vuelva a intentar."})
        break;
        case 2:
        // ...
        console.log("Error Code: " + error.code);
        console.log("POSITION_UNAVAILABLE")
        this.setState({locationPermissionStatus: "Error: Position Unavailable. Can not retrieve location.", locationPermissionStatusES: "Error: No es posible determinar la ubicación. Compruebe la configuración de su dispositivo."})
        break;
        case 1:
        // ...
        console.log("Error Code: " + error.code);
        console.log("PERMISSION_DENIED")
        this.setState({locationPermissionStatus: "Error: Permission Denied. Browser can not access device's location. Please enable and retry.", locationPermissionStatusES: "Error: Permiso denegado. El navegador no puede acceder a la ubicación de su dispositivo. Por favor, habilítela y vuelva a intentar."})
        break;
        default:
        console.log("An error has occurred, please try again");
        this.setState({locationPermissionStatus: "An error has occurred, please try again", locationPermissionStatusES: "Ha ocurrido un error. Por favor, vuelva a intentar."});
      }
    }

    // Verificar si permite GEOLOCATION
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocation, handleError);
    }

  }

//TRANSALTE DATE FROM API TO WEEKDAY
  getWeekDay(fecha) {
    return semana[new Date(fecha * 1000).getDay()];
  }

// HANDLE SEARCH INPUT VALUE
  handleSearchChange(event) {
    this.setState({ query: event.target.value });
  }

// HANDLE FORM SUBMIT EVENT
  handleSubmit(event) {
    event.preventDefault();
    if (event.target.elements.searchfield.value.length > 0) {
      fetch(this.state.defaultURL + '&q=' + this.state.query)
        .then(response => response.json())
        .then(jsonData => {
          jsonData.current.condition.icon = jsonData.current.condition.icon.replace('64x64','128x128');
          this.setState({clima: jsonData });
        })
        .catch(err =>  {
          this.setState(prevState => {
            return {
              apiError: true,
              apiErrorMessage: navigator.language.includes("es") ? "Ha ocurrido un error. Compruebe que su dispositivo permita el acceso a su ubicación." : err
            }
          })
          console.log('an error occurred: ', err)
        })
      }

  }


  render() {
    const { isLoaded, apiError, apiErrorMessage, locationPermissionStatus, locationPermissionStatusES } = this.state;
    const { location, current, forecast } = this.state.clima;

    //conditional rendering  start
    // if (error && !isLoaded ) {
    //   return <h3 style={{textAlign: "center"}}>Please enable geolocation in your device and refresh</h3>
    // } else
    if (isLoaded) {
      return (
        <div className="App">
          <SearchBox
            onSearchChange={this.handleSearchChange}
            onBtnSubmit={this.handleSubmit}
            query={this.state.query}
          />
          <Main
            current={current}
            location={location}
            apiError={apiError}
            apiErrorMessage={apiErrorMessage}
          />
          <Forecast forecast={forecast} getWeekDay={this.getWeekDay}/>
        </div>
      )
    } else if (locationPermissionStatus !== null) {
      return <ErrorMessage locationError={locationPermissionStatus} locationErrorES={locationPermissionStatusES} apiError={apiError} apiErrorMessage={apiErrorMessage} />
    } else {
      return <Loader />
    }
    //conditional rendering  finish

  }

}

export default App;
