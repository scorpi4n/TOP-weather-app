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
  descriptionDiv.classList.add("description");
  descriptionDiv.innerText = toTitleCase(forecastItem.weather[0].description);

  const temperatureDiv = document.createElement("div");
  temperatureDiv.classList.add("temperature");
  temperatureDiv.innerText = forecastItem.main.temp.toFixed() + "°";

  li.appendChild(datetimeDiv);
  li.appendChild(descriptionDiv);
  li.appendChild(temperatureDiv);

  return li;
}
