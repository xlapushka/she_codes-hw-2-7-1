document.addEventListener("DOMContentLoaded", defaultCity());

// ==================== all current params =================

function displayCurrent(response) {
  // console.log(response);

  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  celsiusTemp = Math.round(response.data.main.temp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#current-country");
  countryElement.innerHTML = response.data.sys.country;

  // let precipitationElement = document.querySelector("#current-precipitation");
  // precipitationElement.innerHTML = response.data.name;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#current-wind");
  let windEl = response.data.wind.speed.toFixed(1);
  windElement.innerHTML = windEl;

  let weekDayElement = document.querySelector("#current-weekday-and-time");
  weekDayElement.innerHTML = formatDate(
    response.data.dt,
    response.data.timezone
  );

  let iconElement = document.querySelector("#current-icon");
  let curtIcon = currentIcon(response.data.weather[0].icon);
  iconElement.setAttribute("class", `${curtIcon}`);
}

// ==================== current day and time =================

function formatDate(dt, timezone) {
  let utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10);
  let utsMilliSeconds = utcSeconds * 1000;
  let date = new Date(utsMilliSeconds).toUTCString();
  return date;

  // let hours = date.getHours();
  // let doubleDigitsHours = String(hours).padStart(2, "0");
  // let minutes = date.getMinutes();
  // let doubleDigitsMinutes = String(minutes).padStart(2, "0");
  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // let day = days[date.getDay()];

  // console.log(`${day} ${doubleDigitsHours}:${doubleDigitsMinutes}`);
  // return `${day} ${doubleDigitsHours}:${doubleDigitsMinutes}`;
}

// ==================== main icon =================

function currentIcon(symbol) {
  switch (symbol) {
    case "01d":
      return "fa-solid fa-sun";
    case "02d":
      return "fa-solid fa-cloud-sun";
    case "03d":
      return "fa-solid fa-cloud";
    case "04d":
      return "fa-solid fa-cloud";
    case "09d":
      return "fa-cloud-showers-heavy";
    case "10d":
      return "fa-solid fa-cloud-sun-rain";
    case "11d":
      return "fa-solid fa-cloud-bolt";
    case "13d":
      return "fa-solid fa-snowflake";
    case "50d":
      return "fa-solid fa-smog";

    case "01n":
      return "fa-solid fa-moon";
    case "02n":
      return "fa-solid fa-cloud-moon";
    case "03n":
      return "fa-solid fa-cloud";
    case "04n":
      return "fa-solid fa-cloud";
    case "09n":
      return "fa-cloud-showers-heavy";
    case "10n":
      return "fa-solid fa-cloud-moon-rain";
    case "11n":
      return "fa-solid fa-cloud-bolt";
    case "13n":
      return "fa-solid fa-snowflake";
    case "50n":
      return "fa-solid fa-smog";
  }
}

// let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
// let latitude = 0.71;
// let longitude = 135.0;
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
// axios.get(apiUrl).then(displayCurrent);

// ==================== defult city =================

function defaultCity() {
  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let latitude = 50.4333;
  let longitude = 30.5167;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrent);
}

// ==================== change city by current-position =================

function positionByCity() {
  event.preventDefault();

  let city = document.querySelector("#current-city");
  let newCity = document.querySelector("#new-city-input");

  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrent);

  return (newCity.value = "");
}

function positionByCoord(position) {
  let localLatitude = position.coords.latitude;
  let localLongitude = position.coords.longitude;

  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${localLatitude}&lon=${localLongitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrent);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionByCoord);
}

// =============================================================

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", positionByCity);

let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", getCurrentPosition);

// ========================= celsius / fahrenheit temp ===================

function displayFahrenheitTemp(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);
