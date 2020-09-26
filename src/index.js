//Getting todays date
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
let months = [
  `Janurary`,
  `Februrary`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let todayDate = document.querySelector(`h4#todayDate`);
let AMPM = `AM`;
if (hour > 12) {
  AMPM = `PM`;
} else {
  AMPM = `AM`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
todayDate.innerHTML = `${day}, ${month} ${date} ${hour}:${minute} ${AMPM}`;

// Changing City
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity").value;
  let apiKey = `a2d28a642d9c48b595a677fa32994307`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}
let form = document.querySelector(`form`);
form.addEventListener(`submit`, searchCity);

function showWeather(response) {
  let city = response.data.name;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = city;
  let currentTemp = document.querySelector("h2");
  currentTemp = `${temp}&degC`;
  let celciusChange = document.querySelector("h3#tempHighLow");
  celciusChange.innerHTML = `${maxTemp}&degC/${minTemp}&degC`;
  let weatherDescription = document.querySelector("h4#weatherDefintion");
  weatherDescription = `${description}`;
  let humidity = document.querySelector("h3#humidity");
  humidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = document.querySelector("h3#humidity");
  wind.innerHTML = `Wind: ${wind}km/h`;
}

// Change metric
// function celciusLink(event) {
//   event.preventDefault();
//   let celciusChange = document.querySelector("h3#tempOptions");
//   let maxTemp = Math.round(response.data.main.temp_max);
//   let minTemp = Math.round(response.data.main.temp_min);
//   celciusChange.innerHTML = `${maxTemp}&degC/${minTemp}&degC`;
//   console.log(response.data.main.temp_max);
// }
// function ferenheitLink(event) {
//   event.preventDefault();
//   let ferenheitChange = document.querySelector("h3#tempOptions");
//   let maxTemp = Math.round(response.data.main.temp_max);
//   let minTemp = Math.round(response.data.main.temp_min);
//   ferenheitChange.innerHTML = `${maxTemp}&degF/${minTemp}&degF`;
//   console.log(response.data.main.temp_max);
// }

// let cClick = document.querySelector("#Clink");
// cClick.addEventListener("click", celciusLink);
// let fClick = document.querySelector("#Flink");
// fClick.addEventListener("click", ferenheitLink);

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

// function showLocationTemp(event) {
//   let city = response.data.name;
//   let cityDisplay = document.querySelector("h1");
//   let maxTemp = Math.round(response.data.main.temp_max);
//   let minTemp = Math.round(response.data.main.temp_min);
//   console.log(response.data.main.temp);
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
//   let tempChange = document.querySelector("h3#tempOptions");
//   tempChange.innerHTML = `${maxTemp}&degF/${minTemp}&degF`;
// }
