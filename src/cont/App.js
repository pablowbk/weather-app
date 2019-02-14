import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';

// https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=Buenos+Aires&days=6

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clima: {},
      query: 'buenos aires',
      defaultURL: `https://api.apixu.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&lang=es&days=6`,
      error: false,
      isLoaded: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
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
      });
  }

// HANDLE SEARCH INPUT VALUE
  handleSearchChange(event) {
    this.setState({ query: event.target.value })
  }


  render() {
    const { location, current, forecast } = this.state.clima;

    if (!this.state.error) {
      console.log('everything looks good...');
    }

    return this.state.isLoaded ? (
      <div className="App">
        <SearchBox onSearchChange={this.handleSearchChange}/>
        <Main
          current={current}
          location={location}
        />
        <Forecast forecast={forecast}/>
      </div>
    ) : (
      <div className="App">Loading...</div>
    )



  }

}

export default App;
