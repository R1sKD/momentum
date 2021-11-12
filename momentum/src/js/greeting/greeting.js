import {greetingTranslation} from '../translateApp/translateApp.js';

const greet = document.querySelector('.greeting');
export const name = document.querySelector('.name');

export function getTimeOfDay() {
  const timeOfDays = ['night', 'morning', 'afternoon', 'evening'];
  const date = new Date().getHours();
  const timeOfDay = timeOfDays[Math.trunc(date / 6)];
  return timeOfDay;
}

export function showGreeting(lang) {
  const timeOfDay = getTimeOfDay();
  let idx;
  switch (timeOfDay) {
    case 'night':
      idx = 0;
      break;
    case 'morning':
      idx = 1;
      break;
    case 'afternoon':
      idx = 2;
      break;
    case 'evening':
      idx = 3;
      break;
  }
  const greeting = greetingTranslation[`${lang}`][idx];
  greet.textContent = greeting;
}

export function changeNamePlaceholder(lang) {
  name.placeholder = lang === 'en' ? '[Enter name]' : '[Введите имя]';
}