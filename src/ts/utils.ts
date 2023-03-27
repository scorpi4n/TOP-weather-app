import { API_KEY } from "../consts";

export async function getCoords(location: string) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

  const res = await fetch(url, { mode: "cors" });
  const { lat, lon } = (await res.json()).at(0);

  return { lat, lon };
}

export function toTitleCase(string: string) {
  return string
    .split(" ")
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
