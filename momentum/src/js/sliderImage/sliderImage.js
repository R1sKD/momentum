import {getTimeOfDay} from '../greeting/greeting.js';
import {photoTags} from '../settings/settings.js';

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const sourcePhoto = document.querySelector('.settings__photoSource');

let randomNum;
function getRandomNum() {
    randomNum = Math.round(Math.random() * (20 - 1) + 1);
  return randomNum;
}
getRandomNum();

function getRandomBigNum() {
  return Math.round(Math.random() * 100);
}


export async function setApiBg(api, tags) {
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = await getLinkToImage(api, timeOfDay, tags);
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  }
}
setGithubBg();

function getSliderNext() {
  randomNum = randomNum === 20 ? 1 : ++randomNum;
  if (sourcePhoto.value !== 'github') {
    setApiBg(sourcePhoto.value, photoTags.value)
  } else {
    setGithubBg();
  }
}

function getSliderPrev() {
  randomNum = randomNum === 1 ? 20 : --randomNum;
  if (sourcePhoto.value !== 'github') {
    setApiBg(sourcePhoto.value, photoTags.value)
  } else {
    setGithubBg();
  }
}

async function getLinkToImage(api, timeOfDay, tag) {
  let tags = tag ? tag.split(' ').join(',') + ',' + timeOfDay : timeOfDay;
  if (api === 'flickr') {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=32c6e3283e5533e4277b8411ab5835bc&tags=${tags}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data.photos.photo[getRandomBigNum(100)].url_l;
  } else if (api === 'Unsplash API') {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=cLlSZd1EjPLoNOROx3oxj-k_3CYvio5IIyuCMjIjqLA`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
  }
}

export function setGithubBg() {
  const timeOfDay = getTimeOfDay();
  let bgNum = randomNum;
  if (bgNum > 0 && bgNum < 10) {
    bgNum = `${bgNum}`.padStart(2, '0');
  }
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/r1skd/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  }
}

slideNext.addEventListener('click', getSliderNext);
slidePrev.addEventListener('click', getSliderPrev);