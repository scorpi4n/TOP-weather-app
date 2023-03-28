import { CurrentWeatherRes } from "../ts/weather";
import { toTitleCase } from "./utils";

export const weatherSection: HTMLElement = document.querySelector(
  "section[aria-labelledby=city]"
);
export const cityEl: HTMLElement = document.querySelector("#city");
export const lastUpdatedTimeEl: HTMLElement =
  document.querySelector("#last-updated");
export const weatherDescriptionEl: HTMLElement =
  document.querySelector("#description");
export const temperatureEl: HTMLElement = document.querySelector("#temp");
export const feelsLikeEl: HTMLElement = document.querySelector("#feels-like");
export const humidityEl: HTMLElement = document.querySelector("#humidity");
export const windSpeedEl: HTMLElement = document.querySelector("#wind-speed");
export const cloudinessEl: HTMLElement = document.querySelector("#cloudiness");
export const sunriseEl: HTMLElement = document.querySelector("#sunrise");
export const sunsetEl: HTMLElement = document.querySelector("#sunset");

export function displayWeather(weatherData: CurrentWeatherRes) {
  cityEl.innerText = weatherData.name;
  lastUpdatedTimeEl.innerText =
    "Last updated: " + new Date(weatherData.dt * 1000).toLocaleTimeString();
  weatherDescriptionEl.innerText = toTitleCase(
    weatherData.weather[0].description
  );
  temperatureEl.innerText = `Temp: ${weatherData.main.temp}`;
  feelsLikeEl.innerText = `Feels like ${weatherData.main.feels_like}`;
  humidityEl.innerText = `Humidity: ${weatherData.main.humidity}`;
  windSpeedEl.innerText = `Wind Speed: ${weatherData.wind.speed}`;
  cloudinessEl.innerText = `Cloudiness: ${weatherData.clouds.all}%`;
  sunriseEl.innerText = `Sunrise: ${new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString()}`;
  sunsetEl.innerText = `Sunset: ${new Date(
    weatherData.sys.sunset * 1000
  ).toLocaleTimeString()}`;
}
