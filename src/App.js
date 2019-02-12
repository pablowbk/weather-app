import React, { Component } from "react";
import 'normalize.css';
import './App.css';
import SearchBox from './SearchBox';
import MainTemp from './MainTemp';
import Forecast from './Forecast';

// https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=Buenos+Aires&days=6

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clima: {}
    };
  }

  componentDidMount() {
    const url = `https://api.apixu.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=Buenos+Aires&days=6`
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
        clima: jsonData
      })
      console.log(jsonData);
    })
  }

  render() {
    // const { location, current, forecast } = this.state.clima;
    return (
      <div className="App">
        <h1>Weather App</h1>
        <SearchBox />
        <MainTemp />
        <Forecast />
      </div>
    );
  }

}

export default App;
