import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';
import Loader from '../comps/loader/Loader';

// https://api.apixu.com/v1/forecast.json?key=https://wt-9fc35a21c84ecf4c970badb28c44af3b-0.sandbox.auth0-extend.com/weather-apixu&lang=es&days=7&q=-37.838848,-57.50456319999999
// https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=Buenos+Aires&days=6


const API_KEY = '52e199fdabf04dcbb76111911191702';
const semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
"Domingo"];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clima: {},
      query: 'buenos aires',
      defaultURL: `https://api.apixu.com/v1/forecast.json?key=${API_KEY}&lang=es&days=7`,
      error: false,
      isLoaded: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeekDay = this.getWeekDay.bind(this);
  }

  componentDidMount() {
    // AGREGAR GEOLOCATION
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({query:`${position.coords.latitude},${position.coords.longitude}`});

      // FETCH DATA FROM API
      fetch(this.state.defaultURL + '&q=' + this.state.query)
      .then(response => response.json())
      .then(jsonData => {
        jsonData.current.condition.icon = jsonData.current.condition.icon.replace('64x64','128x128')
        this.setState({
          clima: jsonData,
          isLoaded: true
        })
      })
      .catch(err =>  {
        this.setState({error: true})
        console.log('an error occurred: ', err)
      })
      //End of Fetch
    });
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
      // this.setState({query: event.target.elements.searchfield.value});
      fetch(this.state.defaultURL + '&q=' + this.state.query)
        .then(response => response.json())
        .then(jsonData => {
          jsonData.current.condition.icon = jsonData.current.condition.icon.replace('64x64','128x128');
          this.setState({clima: jsonData });
        })
        .catch(err =>  {
          this.setState({error: true})
          console.log('an error occurred: ', err)
        })
      }

  }


  render() {
    const { location, current, forecast } = this.state.clima;

    if (!this.state.error) {
    }
    //conditional rendering ternary start
    return this.state.isLoaded

    ? (
      <div className="App"
        // style={
        //     current.temp_c <= -10 ? {backgroundColor: 'rgba(149, 136, 211,0.05)'}
        //     : current.temp_c <= 0
        //     ? {backgroundColor: 'rgba(150, 208, 216,0.05)'}
        //     : current.temp_c <= 10
        //     ? {backgroundColor: 'rgba(94, 143, 197,0.05)'}
        //     : current.temp_c <= 18
        //     ? {backgroundColor: 'rgba(79, 139, 61,0.05)'}
        //     : current.temp_c <= 25
        //     ? {backgroundColor: 'rgba(222, 177, 6,0.05)'}
        //     : current.temp_c <= 34
        //     ? {backgroundColor: 'rgba(190, 65, 18,0.05)'}
        //     : current.temp_c > 34
        //     ? {backgroundColor: 'rgba(138, 42, 10,0.05)'}
        //     : null
        //   }
        >
        <SearchBox
          onSearchChange={this.handleSearchChange}
          onBtnSubmit={this.handleSubmit}
          query={this.state.query}
        />
        <Main
          current={current}
          location={location}
        />
        {/* <More /> */}
        <Forecast forecast={forecast} getWeekDay={this.getWeekDay}/>
      </div>
    )

    : (
      <Loader />
    )
    //conditional rendering ternary finish



  }

}

export default App;
