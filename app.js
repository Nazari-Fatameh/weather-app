const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "cb46a9ade925f55d0cf29d3b694d384f";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const renderCurrentWeather = (data) => {
  const weatherJsx = `
  <h1>${data.name},${data.sys.country}</h1>
  <div  id="main"><img alt="weather icon"  src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }.png"/>
    <span>${data.weather[0].main}</span>
  <p>${Math.round(data.main.temp)}  ℃  </p></div>

  <div id="info">
  <p>Humidity:<span>${data.main.humidity}%</span></p>
  <p>Wind Speed:<span>${data.wind.speed}m/s</span></p>
  </div>`;

  weatherContainer.innerHTML = weatherJsx;
};
const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};
const renderForecastWeather = (data) => {
  data = data.list.filter((obj) => obj.dt_txt.endsWith("18:00:00"));
  data.forEach((i) => {
    const forecastJsx = `
  <div><img alt="weather icon"  src="https://openweathermap.org/img/wn/${
    i.weather[0].icon
  }.png"/>
  <h3>${getWeekDay(i.dt)}</h3>
  <p>${Math.round(i.main.temp)}℃</p>
  <span>${i.weather[0].main}</span>
  </div>`;
    forecastContainer.innerHTML += forecastJsx;
  });
};
const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Please enter  city  name");
  }

  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByName(cityName);
  renderForecastWeather(forecastData);
};
const positionCallback = (position) => {
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("Your Browser not supported");
  }
};
const getForecastWeatherByName = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
