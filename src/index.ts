import { getCoords } from "./ts/utils";
import { getCurrentWeather } from "./ts/weather";

getCoords("san antonio")
  .then(({ lat, lon }) => {
    return getCurrentWeather(lat, lon, "imperial");
  })
  .then((data) => {
    const { main } = data;

    console.log(
      `It is currently ${main.temp} and feels like ${main.feels_like}`
    );
  })
  .catch(console.error);
