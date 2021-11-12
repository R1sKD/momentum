import {showGreeting} from '../greeting/greeting.js';

export const time = document.querySelector('.time');
const date = document.querySelector('.date');

function getDate() {
  return new Date();
}

export let timerId;
export function showTime(language) {
  let lang = language;
  const currentTime = getDate().toLocaleTimeString();
  time.textContent = currentTime;
  showDate(lang);
  showGreeting(lang);
  timerId = setTimeout(showTime.bind(null, lang), 1000);
}
showTime('en');

export function showDate(lang) {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const currentDate = new Intl.DateTimeFormat(lang, options).format(getDate());
  date.textContent = currentDate;
}