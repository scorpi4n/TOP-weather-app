import "./styles/style.scss";
import { displayForecast, displayWeather } from "./ts/dom";
import { getCoords } from "./ts/utils";
import { getCurrentWeather, getForecast } from "./ts/weather";

getCoords("san antonio")
  .then(({ lat, lon }) => getCurrentWeather(lat, lon, "imperial"))
  .then(displayWeather)
  .catch(console.error);

getCoords("san antonio")
  .then(({ lat, lon }) => getForecast(lat, lon, "imperial"))
  .then(displayForecast)
  .catch(console.error);
