import { API_KEY } from "../consts";

export async function getCurrentWeather(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();

  return data;
}

export async function getForecast(
  lat: number,
  lon: number,
  units = "metric",
  apiKey: string = API_KEY
) {
  const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();

  return data;
}
