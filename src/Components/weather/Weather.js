import React, { useEffect, useState } from "react";
import "./weatherStyles.css";

function Weather() {
  const api = {
    key: "bfee40a57b03b378c6f6fc873967f983",
    url: "https://api.openweathermap.org/data/2.5/",
  };
  const [weather, setWeather] = useState({});

  const search = () => {
    fetch(`${api.url}weather?q=${"vancouver"}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        if (result != null) {
          setWeather({
            temperature: Math.round(result.main.temp),
            condition: result.weather[0].main,
            name: result.name,
            country: result.sys.country,
          });
        }
      });
  };

  let checkActivities = () => {
    if (weather.condition == "Clear") {
      return "Suggested : Parks";
    } else {
      return "Suggested: Heritage Buildings";
    }
    // return eventSuggestions;
  };

  const getTodaysDate = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    var day = days[d.getDay()];
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <main>
        <div>
          {console.log(weather.length)}
          <div className="weather-container">
            <div className="weather">
              <div className="temp">{weather.temperature}°C</div>
              <div className="condition">{weather.condition}</div>
              <div className="city">
                {weather.name}, {weather.country}
              </div>
              <br></br>
              <div className="date">{getTodaysDate(new Date())}</div>
              <br></br>
            </div>
            <div className="temp" id="tempActivities">
              {checkActivities()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Weather;

//
