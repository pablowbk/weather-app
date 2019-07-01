import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';
import Loader from '../comps/loader/Loader';


const API_KEY = process.env.REACT_APP_API_KEY;
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
      <div className="App">
        <SearchBox
          onSearchChange={this.handleSearchChange}
          onBtnSubmit={this.handleSubmit}
          query={this.state.query}
        />
        <Main
          current={current}
          location={location}
        />
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
