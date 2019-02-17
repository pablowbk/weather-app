import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from '../comps/searchbox/SearchBox';
import Main from '../comps/main/Main';
import Forecast from '../comps/forecast/Forecast';

// https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=Buenos+Aires&days=6
const API_KEY = '68fe63fc1526403ba07110828191202';

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

    return this.state.isLoaded ? (
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
        <Forecast forecast={forecast}/>

      </div>
    ) : (
      <div className="loading">Loading...</div>
    )



  }

}

export default App;
