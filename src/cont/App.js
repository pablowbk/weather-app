import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';
import Loader from '../comps/loader/Loader';
import More from '../comps/main/More';
// import SearchToggle from '../comps/searchbox/SearchToggle';

// https://api.apixu.com/v1/forecast.json?key=https://wt-9fc35a21c84ecf4c970badb28c44af3b-0.sandbox.auth0-extend.com/weather-apixu&lang=es&days=7&q=-37.838848,-57.50456319999999
// https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=Buenos+Aires&days=6


const API_KEY = '52e199fdabf04dcbb76111911191702';

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
      console.log('Rendering, everything looks good...');
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
        <More />
        <Forecast forecast={forecast}/>
      </div>
    )

    : (
      <Loader />
    )
    //conditional rendering ternary finish



  }

}

export default App;
