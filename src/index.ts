import "./styles/style.scss";
import { displayWeatherAndForecast, form, handleSubmit } from "./ts/dom";

form.addEventListener("submit", handleSubmit);

displayWeatherAndForecast();
