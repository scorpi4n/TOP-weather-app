import { getCoords } from "./ts/utils";
import { getCurrentWeather } from "./ts/weather";

getCoords("san antonio")
  .then(({ lat, lon }) => {
    return getCurrentWeather(lat, lon, "imperial");
  })
  .then((data) => {
    const { main } = data;

    console.log(`last updated: ${new Date().toLocaleTimeString()}`);
    console.log(`Temperature: ${main.temp}`);
    console.log(`Feels like: ${main.feels_like}`);
    console.log(`Humidity: ${main.humidity}`);
  })
  .catch(console.error);
