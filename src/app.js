let now = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let currentDay = document.querySelector("#day");
let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
currentDay.innerHTML = `${day} ${time}`;

function showWeather(response) {
  console.log(response);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
}

function submitSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-input").value;
  let apiKey = `e26555d3812486da4794499d94833f23`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", submitSearch);
