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

function displayCurrent(response) {
  console.log(response);

  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#current-country");
  countryElement.innerHTML = response.data.sys.country;

  // let precipitationElement = document.querySelector("#current-precipitation");
  // precipitationElement.innerHTML = response.data.name;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#current-wind");
  let windEl = ((response.data.wind.speed * 1000) / 3600).toFixed(1);
  windElement.innerHTML = windEl;

  let weekDayElement = document.querySelector("#current-weekday-and-time");
  weekDayElement.innerHTML = formatDate(response.data.dt, response.data.timezone);
}

let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
let latitude = 2.85;
let longitude = 34.63;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrent);
