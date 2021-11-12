import {weatherInfoTranslation} from '../translateApp/translateApp.js';

const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const weatherDescriptionContainer = document.querySelector('.description-container');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
export const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function showError(lang) {
  weatherError.textContent = lang === 'en' ? 'City not found' : 'Город не найден';
  weatherDescriptionContainer.style.display = 'none';
  weatherIcon.style.display = 'none';
  wind.style.display = 'none';
  humidity.style.display = 'none';
}

function hideError() {
  weatherError.textContent = '';
  weatherDescriptionContainer.style.display = 'block';
  weatherIcon.style.display = 'block';
  wind.style.display = 'block';
  humidity.style.display = 'block';
}

let weatherLang;
export async function getWeather(lang) {
  weatherLang = lang;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=7a73451a8444ee4e5138ed821773deab&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.message) {
    showError(weatherLang);
    return;
  } else {
    hideError();
  }
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `${weatherInfoTranslation[`${lang}`].wind} ${Math.round(data.wind.speed)} ${lang === 'en' ? 'm/s' : 'м/с'}`;
  humidity.textContent = `${weatherInfoTranslation[`${lang}`].humidity} ${Math.round(data.main.humidity)} %`;
}

getWeather('en');

export function changeCityPlaceholder(lang) {
  city.placeholder = lang === 'en' ? '[Enter city]' : '[Введите город]';
}

city.addEventListener('change', () => getWeather(weatherLang));