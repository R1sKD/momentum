import {name} from './greeting/greeting.js';
import {city} from './weather/weather.js';
import {settings, hideElemenet, language, changeLanguage, photoSource, setPhotoSource, photoTags} from './settings/settings.js';

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('settings', JSON.stringify(settings));
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  const settings = JSON.parse(localStorage.getItem('settings'));
  language.value = settings.language;
  changeLanguage.call(language, settings.language);
  let blocks = settings.blocks;
  for (let i = 0; i < blocks.length; i++) {
    let elem = document.querySelector('.' + blocks[i]);
    elem.checked = true;
    hideElemenet.apply(elem);
  }
  photoSource.value = settings.photoSource != '' ? settings.photoSource : 'github';
  photoTags.value = settings.photoTags;
  setPhotoSource();
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);