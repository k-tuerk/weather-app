function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let AMPM = `AM`;
  if (hour > 12) {
    AMPM = `pm`;
    hour = hour - 12;
  } else {
    AMPM = `am`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}${AMPM}`;
}

// Changing City
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity").value;
  let apiKey = `a2d28a642d9c48b595a677fa32994307`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}
let form = document.querySelector(`form`);
form.addEventListener(`submit`, searchCity);

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="card-body">
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="images/icons/${forecast.weather[0].icon}.svg"
                  alt="weatherIcon"
                  class="weeklyIcon"
                />
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
              </div>
              <p class="card-text">${Math.round(
                forecast.main.temp_max
              )}&degC/${Math.round(forecast.main.temp_min)}&degC</p>
            </div>`;
  }
}

function showWeather(response) {
  let city = response.data.name;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let description = response.data.weather[0].description;
  let humidityData = response.data.main.humidity;
  let windData = response.data.wind.speed;

  celciusTemperature = Math.round(response.data.main.temp);

  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = city;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${celciusTemperature}`;
  let celciusChange = document.querySelector("h3#tempHighLow");
  celciusChange.innerHTML = `${maxTemp}&degC/${minTemp}&degC`;
  let weatherDescription = document.querySelector("h4#weatherDefintion");
  weatherDescription.innerHTML = `${description}`;
  let humidity = document.querySelector("h3#humidity");
  humidity.innerHTML = `Humidity: ${humidityData}%`;
  let wind = document.querySelector("h3#wind");
  wind.innerHTML = `Wind: ${windData}km/h`;
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector(".icon");
  icon.setAttribute(`src`, `images/icons/${response.data.weather[0].icon}.svg`);
}

// Change metric
function celciusLink(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = celciusTemperature;
  fClick.classList.remove(`active`);
  cClick.classList.add(`active`);
}
function farenheitLink(event) {
  event.preventDefault();
  let farenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = `${farenheitTemp}`;
  cClick.classList.remove(`active`);
  fClick.classList.add(`active`);
}
let celciusTemperature = null;

let cClick = document.querySelector("#Clink");
cClick.addEventListener("click", celciusLink);
let fClick = document.querySelector("#Flink");
fClick.addEventListener("click", farenheitLink);

// Change Weather Based on Location
function showPosition(position) {
  let apiKey = `a2d28a642d9c48b595a677fa32994307`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationClick = document.querySelector(".currentLocation");
locationClick.addEventListener("click", getCurrentLocation);

// searchCity("Toronto");
