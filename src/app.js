function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weekly-weather-forecast");
  let days = ["Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
    <div class ="weather-forcast-day">
      ${day} </div>
      <div class="weekly-weather-icon">
        <img
          src="http://openweathermap.org/img/wn/04n@2x.png"
          alt="weather icon"
          width="36"
        />
      </div>
      <div class="weekly-weather-temp-range">
        <span class="weekly-weather-max-temp"> 30° </span>
        <span class="weekly-weather-min-temp"> 27° </span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `e26555d3812486da4794499d94833f23`;
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#day");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function handlePosition(position) {
  debugger;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `e26555d3812486da4794499d94833f23`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-input").value;
  searchCity(input);
}

function searchCity(city) {
  let apiKey = `e26555d3812486da4794499d94833f23`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function currentLocationSearch() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let farenTemp = Math.round((celciusTemp * 9) / 5) + 32;
  temperatureElement.innerHTML = farenTemp;
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let farenheitLink = document.querySelector("#faren-temp");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celciusLink = document.querySelector("#celcius-temp");
celciusLink.addEventListener("click", displayCelciusTemp);

let celciusTemp = null;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocationSearch);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", submitSearch);

searchCity("Berlin");
