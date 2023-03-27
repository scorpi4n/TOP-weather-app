import { API_KEY } from "../consts";

export async function getCurrentWeather(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });

  return await res.json();
}

export async function getForecast(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });

  return await res.json();
}

export interface CurrentWeatherRes {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
