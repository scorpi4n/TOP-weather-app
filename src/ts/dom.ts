import { CurrentWeatherRes, ForecastRes } from "../ts/weather";
import { toTitleCase } from "./utils";

export const weatherSection: HTMLElement = document.querySelector(
  "section[aria-labelledby=city]"
);
export const cityEl: HTMLElement = document.querySelector("#city");
export const lastUpdatedTimeEl: HTMLElement = document.querySelector(
  "#last-updated .data"
);
export const weatherDescriptionEl: HTMLElement =
  document.querySelector("#description");
export const temperatureEl: HTMLElement = document.querySelector("#temp .data");
export const feelsLikeEl: HTMLElement =
  document.querySelector("#feels-like .data");
export const humidityEl: HTMLElement =
  document.querySelector("#humidity .data");
export const windSpeedEl: HTMLElement =
  document.querySelector("#wind-speed .data");
export const cloudinessEl: HTMLElement =
  document.querySelector("#cloudiness .data");
export const sunriseEl: HTMLElement = document.querySelector("#sunrise .data");
export const sunsetEl: HTMLElement = document.querySelector("#sunset .data");

export function displayWeather(weatherData: CurrentWeatherRes) {
  cityEl.innerText = weatherData.name;
  lastUpdatedTimeEl.innerText = new Date(
    weatherData.dt * 1000
  ).toLocaleTimeString();
  weatherDescriptionEl.innerText = toTitleCase(
    weatherData.weather[0].description
  );
  temperatureEl.innerText = `${weatherData.main.temp}`;
  feelsLikeEl.innerText = `${weatherData.main.feels_like}`;
  humidityEl.innerText = `${weatherData.main.humidity}`;
  windSpeedEl.innerText = `Wind ${weatherData.wind.speed}`;
  cloudinessEl.innerText = `${weatherData.clouds.all}`;
  sunriseEl.innerText = new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString();
  sunsetEl.innerText = new Date(
    weatherData.sys.sunset * 1000
  ).toLocaleTimeString();
}

export function displayForecast(forecastData: ForecastRes) {
  for (const item of forecastData.list) {
    console.log(new Date(item.dt * 1000).toLocaleString());
  }
}
