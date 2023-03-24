"use strict";

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

  let positionLat = response.data.coord.lat;
  let positionLon = response.data.coord.lon;
  getforecastByLatAndLog(positionLat, positionLon);
}

// ==================== week weather =================

function displayForecast(response) {
  // console.log(response.data);

  let forecastElement = document.querySelector("#week-weather");
  let forecastHTML = `<div class="day-row">`;
  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay, index) {
    let currentIcn = currentIcon(forecastDay.weather[0].icon);

    if (index < 7) {

      if (index === 0) {        
        forecastHTML += `
            <div class="weather-forecast">

                <p class="week-day active" id="today">Today</p>
                <i id="current-forecast-icon" class="${currentIcn}"></i>
                <p class="day-degree">
                  <span class="day-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}</span><sup>o</sup>
                  <span class="day-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}</span><sup>o</sup>
                </p>
            </div>`;
      } else {
        forecastHTML += `
            <div class="weather-forecast">

                <p class="week-day">${formatWeekDay(forecastDay.dt)}</p>
                <i id="current-forecast-icon" class="${currentIcn}"></i>
                <p class="day-degree">
                  <span class="day-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}</span><sup>o</sup>
                  <span class="day-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}</span><sup>o</sup>
                </p>
            </div>`;
      } 
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// ==================== day and time =================

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

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// ==================== icons =================

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

// ==================== default city =================

function defaultCity() {
  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let latitude = 50.4333;
  let longitude = 30.5167;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrent);
}

// ==================== change city by .. =================

function positionByCity() {
  event.preventDefault();

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

function getforecastByLatAndLog(positionLat, positionLon) {
  let apiKey = "ce144f0cf51fa43f03431f0488a36728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${positionLat}&lon=${positionLon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
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

// function accum(string) {

//   let st = string.toLowerCase().split("");
//   let arr = [];

//   for (let x = 0; x < st.length; x++) {

//     let s = st[x].toUpperCase();

//     while (s.length <= x) {
//       s = s + st[x];
//     }

//     arr.push(s);
//   }

//   return arr.join('-')
// };

// console.log(accum("aBCdEFGh"));
// console.log(accum("ZpglnRxqenU"));
// console.log(accum("NyffsGeyylB"));
// console.log(accum("MjtkuBovqrU"));
// console.log(accum("EvidjUnokmM"));
// console.log(accum("HbideVbxncC"));
