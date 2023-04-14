import { startOfDay } from "date-fns";
import { API_KEY } from "../consts";

export async function getCurrentWeather(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });

  const response = (await res.json()) as CurrentWeatherRes;
  response.units = units;

  return response;
}

export async function getForecast(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });

  const response = (await res.json()) as ForecastRes;
  response.units = units;

  return response;
}

export function getForecastedLows(forecast: ForecastRes) {
  const map = new Map();

  forecast.list.forEach((item, i) => {
    const entry: ForecastResItem[] | undefined = map.get(
      startOfDay(new Date(item.dt * 1000)).toLocaleDateString()
    );

    if (entry != undefined) {
      entry.push(item);
    } else {
      map.set(
        startOfDay(new Date(forecast.list[i].dt * 1000)).toLocaleDateString(),
        [forecast.list[i]]
      );
    }
  });

  return Array.from(map)
    .flat()
    .filter((item) => item instanceof Array)
    .map((arr: ForecastResItem[]) =>
      arr.reduce((acc, current) =>
        current.main.temp_min < acc.main.temp_min ? current : acc
      )
    )
    .map((item) => item.main.temp_min);
}

export function getForecastedHighs(forecast: ForecastRes) {
  const map = new Map();

  forecast.list.forEach((item, i) => {
    const entry: ForecastResItem[] | undefined = map.get(
      startOfDay(new Date(item.dt * 1000)).toLocaleDateString()
    );

    if (entry != undefined) {
      entry.push(item);
    } else {
      map.set(
        startOfDay(new Date(forecast.list[i].dt * 1000)).toLocaleDateString(),
        [forecast.list[i]]
      );
    }
  });

  return Array.from(map)
    .flat()
    .filter((item) => item instanceof Array)
    .map((arr: ForecastResItem[]) =>
      arr.reduce((acc, current) =>
        current.main.temp_max > acc.main.temp_max ? current : acc
      )
    )
    .map((item) => item.main.temp_max);
}

export interface CurrentWeatherRes {
  units: string;
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

export interface ForecastResItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastRes {
  units: string;
  cod: number;
  message: number;
  cnt: number;
  list: ForecastResItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
