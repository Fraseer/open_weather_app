import axios from "axios";
import React, { Component } from "react";

export class App extends Component {
  state = {
    location: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const apiKey = "f60022513894d605a73019f85cab7c76";
      const ocApiKey = "a0e78a029fc64aac88ff24befed68ab5";
      const locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ocApiKey}`
      );

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude={,minutely,hourly,daily,alerts}&appid=${apiKey}`
      );
      const weatherInfo = {
        city: locationResponse.data.results[0].components.city,
        temp: weatherResponse.data.current.temp,
      };
      this.setState({ location: weatherInfo });
      // debugger;
    });
  }

  render() {
    const { weatherInfo } = this.state;
    return (
      <div data-cy="weather-display">
        <h1 id="header">The Weather App</h1>
          <p data-cy="temp">{this.state.location.temp}°C</p>
        <p data-cy="location">{this.state.location.city} </p>
        <p>
          {/* {this.state.location.temp} */}
        </p>
      </div>
    );
  }
}

export default App;
