import { format } from "date-fns";
import { CurrentWeatherRes, ForecastRes, ForecastResItem } from "../ts/weather";
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
export const hourlyForecastEl: HTMLElement =
  document.querySelector("#hourly-forecast");

export function displayWeather(weatherData: CurrentWeatherRes) {
  const { main, wind, clouds, dt, name, units } = weatherData;
  const { sunrise, sunset } = weatherData.sys;
  const { description } = weatherData.weather[0];

  cityEl.innerText = name;
  lastUpdatedTimeEl.innerText = new Date(dt * 1000).toLocaleTimeString();
  weatherDescriptionEl.innerText = toTitleCase(description);
  temperatureEl.innerText = `${main.temp.toFixed()}`;
  feelsLikeEl.innerText = `${main.feels_like.toFixed()}°`;
  humidityEl.innerText = `${main.humidity}`;
  windSpeedEl.innerText = `${wind.speed} ${units == "metric" ? "m/s" : "mph"}`;
  cloudinessEl.innerText = `${clouds.all}`;
  sunriseEl.innerText = format(new Date(sunrise * 1000), "p");
  sunsetEl.innerText = format(new Date(sunset * 1000), "p");
}

export function displayHourlyForecast(forecastData: ForecastRes) {
  forecastData.list.forEach((_, i) =>
    hourlyForecastEl.appendChild(forecastItem(forecastData.list[i]))
  );
}

export function forecastItem(forecastItem: ForecastResItem) {
  const li = document.createElement("li");

  const datetimeDiv = document.createElement("div");
  datetimeDiv.classList.add("datetime");
  datetimeDiv.innerText = format(new Date(forecastItem.dt * 1000), "p, E");

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerText = toTitleCase(forecastItem.weather[0].description);

  const temperatureDiv = document.createElement("div");
  temperatureDiv.innerText = forecastItem.main.temp.toFixed() + "°";

  li.appendChild(datetimeDiv);
  li.appendChild(descriptionDiv);
  li.appendChild(temperatureDiv);

  return li;
}
