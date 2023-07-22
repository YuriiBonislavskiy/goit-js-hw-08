const iframe = document.querySelector('iframe');

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player(iframe);

const throttled = throttle(() => {
  getCurrentTime();
}, 1000);

player.on('play', function () {
  setCurrentTime();
});

player.on('timeupdate', function () {
  throttled();
});

function getCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', String(seconds));
    // console.log(localStorage.getItem('videoplayer-current-time'));
  });
}

function setCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(currentTime).then(function (seconds) {
      // console.log(localStorage.getItem('videoplayer-current-time'));
    });
  }
}

player.unload().then(function () {
  setCurrentTime();
});
