import playList from './playList.js';

const audioPlayer = document.querySelector('.player-controls');
const playBtn = audioPlayer.querySelector('.play');
const playBtnPrev = audioPlayer.querySelector('.play-prev');
const playBtnNext = audioPlayer.querySelector('.play-next');
const timeline = audioPlayer.querySelector('.timeline');
const volumeSlider = audioPlayer.querySelector(".volume-slider");
const soundBtn = audioPlayer.querySelector('.volume-button');
const audioName = audioPlayer.querySelector('.audioName');

const playListContainer = document.querySelector('.play-list');

playList.forEach(audio => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = audio.title;
  playListContainer.append(li);
});

const audio = new Audio(playList[0].src);
audioName.textContent = playList[0].title;

let defaultVolume = 0.75;
let isPlay = false;
let playNumPrev = 0;
let playNum = 0;

function playAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
  } else {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    audioName.textContent = playList[playNum].title;
    isPlay = true;
  }
  toggleBtn();
  selectActiveMusic();
}

function playPrev() {
  playNumPrev = playNum;
  playNum = playNum === 0 ? playList.length - 1 : --playNum;
  playAudio();
  playAudio();
}

function playNext() {
  playNumPrev = playNum;
  playNum = playNum === playList.length - 1 ? 0 : ++playNum;
  playAudio();
  playAudio();
}

function toggleBtn() {
  isPlay ? playBtn.classList.add('pause') : playBtn.classList.remove('pause');
}

function selectActiveMusic() {
  playListContainer.children[playNumPrev].classList.remove('item-active');
  playListContainer.children[playNum].classList.add('item-active');
}
selectActiveMusic();

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

playBtn.addEventListener('click', playAudio);
playBtnPrev.addEventListener('click', playPrev);
playBtnNext.addEventListener('click', playNext);

audio.addEventListener('ended', playNext);
audio.addEventListener('loadeddata', () => {
  audioPlayer.querySelector('.audioTime .length').textContent = getTimeCodeFromNum(audio.duration);
  audio.volume = defaultVolume;
});

timeline.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
});

setInterval(() => {
  const progressBar = audioPlayer.querySelector('.progress');
  progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
  audioPlayer.querySelector('.audioTime .current').textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  defaultVolume = newVolume;
  audioPlayer.querySelector('.volume-percentage').style.width = newVolume * 100 + '%';
});

soundBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    soundBtn.classList.add('mute');
    audioPlayer.querySelector('.volume-percentage').style.width = 0 + '%';
  } else {
    soundBtn.classList.remove('mute');
    audioPlayer.querySelector('.volume-percentage').style.width = defaultVolume * 100 + '%';
  }
});