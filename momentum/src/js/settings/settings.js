import {showTime} from '../date/date.js';
import {timerId} from '../date/date.js';
import {showQuote} from '../quote/quote.js';
import {getWeather} from '../weather/weather.js';
import {changeNamePlaceholder} from '../greeting/greeting.js';
import {changeCityPlaceholder} from '../weather/weather.js';
import {setApiBg, setGithubBg} from '../sliderImage/sliderImage.js';

export const settings = {
  language: 'en',
  photoSource: '',
  photoTags: '',
  blocks: []
};

const btnSettings = document.querySelector('.settings-btn');
const settingsPopup = document.querySelector('.settings');
export const language = settingsPopup.querySelector('.settings__language');
export const photoSource = settingsPopup.querySelector('.settings__photoSource');
const hiddenElem = settingsPopup.querySelector('.settings__item--hideelem');
const time = settingsPopup.querySelector('.settings__time');
const date = settingsPopup.querySelector('.settings__date');
const greeting = settingsPopup.querySelector('.settings__greeting');
const quote = settingsPopup.querySelector('.settings__quote');
const weather = settingsPopup.querySelector('.settings__weather');
const audio = settingsPopup.querySelector('.settings__audio');
export const photoTags = settingsPopup.querySelector('.settings__item--tags input');

let isOpen = false;

function openSettings() {
  if (isOpen) {
    settingsPopup.classList.remove('open');
    isOpen = false;
  } else {
    settingsPopup.classList.add('open');
    isOpen = true;
  }
}

export function changeLanguage() {
  settings.language = this.value;
  let language = this.value;
  clearInterval(timerId);
  showTime(language);
  changeNamePlaceholder(language);
  changeCityPlaceholder(language);
  showQuote(language);
  getWeather(language);
  changeSettingsLanguage(language);
}

function changeSettingsLanguage(lang) {
  if (lang === 'en') {
    language.previousElementSibling.textContent = 'Language';
    language.options[0].textContent = 'English';
    language.options[1].textContent = 'Russian';
    photoSource.previousElementSibling.textContent = 'Photo source:';
    photoTags.placeholder = 'write photo tags';
    hiddenElem.textContent = 'Hide elements:';
    time.previousSibling.textContent = 'Time';
    date.previousSibling.textContent = 'Date';
    greeting.previousSibling.textContent = 'Greeting';
    quote.previousSibling.textContent = 'Quote';
    weather.previousSibling.textContent = 'Weather';
    audio.previousSibling.textContent = 'Audio';
  } else if (lang === 'ru') {
    language.previousElementSibling.textContent = 'Язык';
    language.options[0].textContent = 'Английский';
    language.options[1].textContent = 'Русский';
    photoSource.previousElementSibling.textContent = 'Источник фото:';
    photoTags.placeholder = 'Напишите теги для фото';
    hiddenElem.textContent = 'Скрыть элементы:';
    time.previousSibling.textContent = 'Время';
    date.previousSibling.textContent = 'Дата';
    greeting.previousSibling.textContent = 'Приветствие';
    quote.previousSibling.textContent = 'Цитата';
    weather.previousSibling.textContent = 'Погода';
    audio.previousSibling.textContent = 'Аудио';
  }
}

export function hideElemenet() {
  let index = this.className.lastIndexOf('_');
  let name = this.className.slice(++index);
  if (name === 'greeting') {
    name = 'greeting-container';
  }
  if (name === 'audio') {
    name = 'player';
  }
  if (name === 'quote') {
    name = 'quote-container';
    document.querySelector('.change-quote').classList.toggle('hidden');
  }
  let element = document.querySelector(`.${name}`);
  element.classList.toggle('hidden');
}

function setSettings() {
  let checkboxes = settingsPopup.querySelectorAll('input');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let name = checkboxes[i].className;
      settings.blocks.push(name);
    }
  }
}

export function setPhotoSource() {
  let source = photoSource.value;
  let tags = photoTags.value;
  settings.photoSource = source;
  settings.photoTags = tags;
  if (source === 'github') {
    photoTags.parentElement.classList.add('hide');
    setGithubBg();
  } else {
    photoTags.parentElement.classList.remove('hide');
    setApiBg(source, photoTags.value);
  }
}

btnSettings.addEventListener('click', openSettings);
language.addEventListener('change', changeLanguage);
time.addEventListener('change', hideElemenet);
date.addEventListener('change', hideElemenet);
greeting.addEventListener('change', hideElemenet);
quote.addEventListener('change', hideElemenet);
weather.addEventListener('change', hideElemenet);
audio.addEventListener('change', hideElemenet);
photoSource.addEventListener('change', setPhotoSource);
photoTags.addEventListener('change', setPhotoSource);

window.addEventListener('beforeunload', setSettings);