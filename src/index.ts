import "./styles/style.scss";
import { displayWeather } from "./ts/dom";
import { getCoords } from "./ts/utils";
import { getCurrentWeather } from "./ts/weather";

getCoords("san antonio")
  .then(({ lat, lon }) => {
    return getCurrentWeather(lat, lon, "imperial");
  })
  .then(displayWeather)
  .catch(console.error);
